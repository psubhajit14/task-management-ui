import { apiHandler, type APIResult } from "./axios.ts";
import type { EmployeeResponse, Page, SelectOptionResponse } from "../types.ts";

export const employeeListLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") ?? "1";
  const size = url.searchParams.get("size") ?? "7";
  const sortBy = url.searchParams.get("sortBy") ?? "createdAt";
  const direction = url.searchParams.get("direction") ?? "asc";
  const query = url.searchParams.get("query") ?? "";
  const employees = await apiHandler<Page<EmployeeResponse> & APIResult>(
    "/authenticated/admin/get-employees/page?query=" + query,
    {
      body: {
        page: Number(page) - 1,
        size,
        sortBy,
        direction,
      },
    },
  );
  const roles = await apiHandler<SelectOptionResponse & APIResult>(
    `/authenticated/admin/get-roles`,
    {
      method: "GET",
    },
  );
  return { ...employees, roles: roles };
};

export const updateRoleAction = async ({ request }: { request: Request }) => {
  const { employeeId, roleId } = await request.json();
  await apiHandler(`/authenticated/admin/update-role/${employeeId}/${roleId}`, {
    method: request.method,
    successTitle: "Role Updated Successfully",
  });
};
