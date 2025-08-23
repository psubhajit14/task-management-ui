import { apiHandler } from "./axios.ts";
import type { ProjectListProps } from "../features/project/pages/ProjectList.tsx";
import type { ProjectDetailsProps } from "../features/project/pages/ProjectDetails.tsx";
import type { Params } from "react-router";

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

export const projectDetailsLoader = async ({
  params,
  request,
}: {
  request: Request;
  params: Params<string>;
}) => {
  let projectDetails = {};
  if (request.url.includes("/edit")) {
    const projectId = params.projectId; // string | undefined

    if (!projectId) {
      throw new Response("Project ID missing", {
        status: 400,
      });
    }
    projectDetails = await apiHandler<ProjectDetailsProps>(`/authenticated/projects/${projectId}`, {
      method: "GET",
    });
  }
  const employeeOptions = await apiHandler<ProjectDetailsProps>(
    "/authenticated/admin/get-employees",
    {
      method: "GET",
    },
  );
  return {
    ...projectDetails,
    employeeOptions,
  };
};

export const projectCreateAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  // Convert FormData to plain object
  const data: Record<string, any> = Object.fromEntries(formData);

  // Fix employeeIds → array
  if (data.employeeIds) {
    data.employeeIds = data.employeeIds.split(",").map((id: string) => id.trim());
  }
  return await apiHandler<ProjectDetailsProps>("/authenticated/projects", {
    body: data,
    successTitle: "Project created successfully",
  });
};

export const projectUpdateAction = async ({
  request,
  params,
}: {
  request: Request;
  params: Params<string>;
}) => {
  if (request.url.includes("/edit")) {
    const projectId = params.projectId; // string | undefined

    if (!projectId) {
      throw new Response("Project ID missing", {
        status: 400,
      });
    }
    const formData = await request.formData();
    // Convert FormData to plain object
    const data: Record<string, any> = Object.fromEntries(formData);

    // Fix employeeIds → array
    if (data.employeeIds) {
      data.employeeIds = data.employeeIds.split(",").map((id: string) => id.trim());
    }
    await apiHandler<ProjectDetailsProps>(`/authenticated/projects/${projectId}`, {
      method: "PATCH",
      body: data,
      successTitle: "Project updated successfully",
    });
    return { success: true };
  }
};
