import { type ActionFunctionArgs } from "react-router";
import { apiHandler } from "./axios.ts";
import { notify } from "../components/Notification.tsx";

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  if (formData.get("remember") == "on") {
    localStorage.setItem("email", formData.get("email") as string);
    localStorage.setItem("password", formData.get("password") as string);
    localStorage.setItem("remember", formData.get("remember") as string);
  } else {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("remember");
  }
  formData.delete("remember");
  return await apiHandler("/generate-token", {
    body: formData,
    successTitle: "Login Successful",
    errorTitle: "Login Failed",
  });
};

export const loginLoader = async () => {
  return {
    email: localStorage.getItem("email") || "",
    password: localStorage.getItem("password") || "",
  };
};

export const registerAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  if (formData.get("password") != formData.get("confirmPassword")) {
    return {
      errors: {
        confirmPassword: "Passwords do not match",
      },
    };
  }
  if (formData.get("tnc") != "on") {
    notify({
      title: "Please accept TnC",
      message: "Please read and accept our Terms and Conditions before registering in Boardly",
      variant: "warning",
    });
    return {
      errors: {
        tnc: true,
      },
    };
  }
  return await apiHandler("/auth/user-register", {
    body: formData,
    successTitle: "Registration Successful",
    errorTitle: "Registration Failed",
  });
};
