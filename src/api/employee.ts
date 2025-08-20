import { apiHandler } from "./axios.ts";
import type { EmployeeListProps } from "../features/super-admin/pages/EmployeeList.tsx";

export const employeeListLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") ?? "1";
  const size = url.searchParams.get("size") ?? "7";
  const sortBy = url.searchParams.get("sortBy") ?? "createdAt";
  const direction = url.searchParams.get("direction") ?? "asc";
  const query = url.searchParams.get("query") ?? "";
  return await apiHandler<EmployeeListProps>(
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
};
