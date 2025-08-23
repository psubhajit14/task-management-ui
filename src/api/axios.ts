import Cookies from "js-cookie";
import { REQUEST_METHODS, ROUTES, TOKEN } from "../constants";
import { notify } from "../components/Notification.tsx";
import { redirect } from "react-router";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const loginRoute = "/" + ROUTES.AUTH + "/" + ROUTES.LOGIN;

export type APIResult = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
  timestamp?: string;
};

type APIHandlerOptions = {
  method?: string;
  body?: FormData | object;
  headers?: Record<string, string>;
  successTitle?: string;
  errorTitle?: string;
};

export const apiHandler = async <T extends APIResult>(
  url: string,
  {
    method = REQUEST_METHODS.POST,
    body,
    headers = {},
    successTitle,
    errorTitle,
  }: APIHandlerOptions = {},
): Promise<APIResult | T> => {
  const token = Cookies.get(TOKEN.ACCESS_TOKEN);

  if (!token && !["/generate-token", "/auth/user-register"].includes(url)) {
    clearAuth();
  }
  // Detect if FormData or JSON
  const isFormData = body instanceof FormData;
  body = isFormData ? Object.fromEntries((body as FormData).entries()) : body;
  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const fetchOptions: RequestInit = {
    method,
    headers: finalHeaders,
    credentials: "include",
    body: JSON.stringify(body),
  };
  let res = await fetch(`${API_BASE}${url}`, fetchOptions);
  // Forbidden
  if (res.status == 403) {
    notify({
      title: errorTitle || "Error",
      message: "You don't have access for these page. Please contact Administrator for permissions",
      variant: "danger",
    });
    throw redirect("/users/forbidden");
  }
  // 🔄 Refresh token logic
  if (res.status === 401) {
    const refreshRes = await fetch(`${API_BASE}/refresh-token`, {
      method: REQUEST_METHODS.POST,
      credentials: "include",
    });

    if (refreshRes.ok) {
      const refreshData = await refreshRes.json();
      if (refreshData?.accessToken) {
        Cookies.set(TOKEN.ACCESS_TOKEN, refreshData?.[TOKEN.ACCESS_TOKEN]);
      }

      const retryHeaders = {
        ...finalHeaders,
        ...(refreshData?.accessToken
          ? {
              Authorization: `Bearer ${refreshData.accessToken}`,
            }
          : {}),
      };

      res = await fetch(`${API_BASE}${url}`, {
        ...fetchOptions,
        headers: retryHeaders,
      });
    } else {
      clearAuth();
      return {};
    }
  }
  const result: T = await res.json();
  // Server error
  if (!res.ok) {
    notify({
      title: errorTitle || "Error",
      message: result.message || "Something went wrong",
      variant: "danger",
    });
    result.success = false;
    return result;
  }

  if (successTitle) {
    notify({
      title: successTitle || "Success",
      message: result.message || "Request successful",
      variant: "success",
    });
  }
  result.success = true;
  return result;
};

export function clearAuth() {
  Cookies.remove(TOKEN.ACCESS_TOKEN);
  window.location.href = loginRoute;
}
