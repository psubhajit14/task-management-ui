import { apiHandler, type APIResult } from "./axios.ts";
import type { RoleListProps } from "../features/super-admin/pages/RoleList.tsx";
import { type Params, redirect } from "react-router";
import type { RoleDetailResponse, SelectOptionResponse } from "../constants.ts";

export const roleListLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") ?? "1";
  const size = url.searchParams.get("size") ?? "7";
  const sortBy = url.searchParams.get("sortBy") ?? "createdAt";
  const direction = url.searchParams.get("direction") ?? "asc";
  const query = url.searchParams.get("query") ?? "";
  return await apiHandler<RoleListProps>("/authenticated/admin/get-roles/page?query=" + query, {
    body: {
      page: Number(page) - 1,
      size,
      sortBy,
      direction,
    },
  });
};

export const roleDetailsLoader = async ({
  request,
  params,
}: {
  request: Request;
  params: Params<string>; // ✅ matches react-router
}) => {
  let roleDetails = {};
  if (request.url.includes("/edit")) {
    const roleId = params.roleId; // string | undefined

    if (!roleId) {
      throw new Response("Role ID missing", {
        status: 400,
      });
    }

    roleDetails = await apiHandler<RoleDetailResponse & APIResult>(
      `/authenticated/admin/get-role/${roleId}`,
      {
        method: "GET",
      },
    );
  }

  const permissions = await apiHandler<SelectOptionResponse & APIResult>(
    `/authenticated/admin/get-permissions`,
    {
      method: "GET",
    },
  );
  return { ...roleDetails, options: permissions };
};

export const roleUpdateAction = async ({
  request,
  params,
}: {
  request: Request;
  params: Params<string>; // ✅ matches react-router
}) => {
  const roleId = params.roleId; // string | undefined

  if (!roleId) {
    throw new Response("Role ID missing", {
      status: 400,
    });
  }
  const body = await request.json();
  await apiHandler<RoleDetailResponse & APIResult>(`/authenticated/admin/update-role/${roleId}`, {
    method: "PUT",
    body: body,
  });
};
export const roleCreateAction = async ({ request }: { request: Request }) => {
  const body = await request.json();
  const res = await apiHandler<RoleDetailResponse & APIResult>(`/authenticated/admin/add-role`, {
    body: body,
    successTitle: `Role: ${body.name} Successfully created`,
  });
  if (res.success) return redirect("../roles");
  return res;
};
