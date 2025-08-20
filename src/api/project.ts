import { apiHandler } from "./axios.ts";
import type { ProjectListProps } from "../features/project/pages/ProjectList.tsx";

export const projectListLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") ?? "1";
  const size = url.searchParams.get("size") ?? "7";
  const sortBy = url.searchParams.get("sortBy") ?? "createdAt";
  const direction = url.searchParams.get("direction") ?? "asc";
  const query = url.searchParams.get("query") ?? "";
  return await apiHandler<ProjectListProps>("/authenticated/projects/page?query=" + query, {
    body: {
      page: Number(page) - 1,
      size,
      sortBy,
      direction,
    },
  });
};
