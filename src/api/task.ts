import { apiHandler, type APIResult } from "./axios.ts";
import type { Params } from "react-router";
import type { TaskListProps } from "../features/task/pages/TaskList.tsx";
import type { ProjectDetailsProps } from "../features/project/pages/ProjectDetails.tsx";
import type { SelectOptionResponse } from "../constants.ts";

export const taskListLoader = async ({
  request,
  params,
}: {
  request: Request;
  params: Params<string>;
}) => {
  const projectId = params.projectId; // string | undefined

  if (!projectId) {
    throw new Response("Project ID missing", {
      status: 400,
    });
  }
  const projectDetails = await apiHandler<ProjectDetailsProps>(
    `/authenticated/projects/${projectId}`,
    {
      method: "GET",
    },
  );
  const body = request.body ? await request.json() : { employeeIds: [] };
  const tasks = await apiHandler<TaskListProps>(`/authenticated/tasks/${projectId}/list`, {
    body: body,
  });
  const types = await apiHandler<SelectOptionResponse & APIResult>(`/authenticated/tasks/types`, {
    method: "GET",
  });
  const statuses = await apiHandler<SelectOptionResponse & APIResult>(
    `/authenticated/tasks/statuses`,
    {
      method: "GET",
    },
  );
  const priorities = await apiHandler<SelectOptionResponse & APIResult>(
    `/authenticated/tasks/priorities`,
    {
      method: "GET",
    },
  );
  return {
    tasks,
    projectDetails,
    types,
    statuses,
    priorities,
  };
};

export const taskCreateAction = async ({
  request,
  params,
}: {
  request: Request;
  params: Params<string>;
}) => {
  const projectId = params.projectId;
  if (!projectId) {
    throw new Response("Project ID missing", { status: 400 });
  }
  const formData = await request.formData();
  // Convert FormData to plain object
  const data: Record<string, any> = Object.fromEntries(formData);
  if (data.assignedTo == "") {
    data.assignedTo = null;
  }
  data.startDate = new Date(data.startDate);
  data.endDate = new Date(data.endDate);
  return await apiHandler<ProjectDetailsProps>(`/authenticated/tasks/${projectId}`, {
    body: data,
    successTitle: "Task created successfully",
  });
};
