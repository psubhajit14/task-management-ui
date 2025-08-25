import { apiHandler, type APIResult } from "./axios.ts";
import type { Params } from "react-router";
import type { TaskListProps } from "../features/task/pages/TaskList.tsx";
import type { ProjectDetailsProps } from "../features/project/pages/ProjectDetails.tsx";
import type { SelectOptionResponse, TaskDetailsResponse, TaskResponse } from "../types.ts";

export const taskUpdateAction = async ({
  request,
  params,
}: {
  request: Request;
  params: Params<string>;
}) => {
  const formData = await request.formData();
  const projectId = params.projectId;
  if (!projectId) {
    throw new Response("Project ID missing", {
      status: 400,
    });
  }
  const taskId = params.taskId;
  if (!taskId) {
    throw new Response("Task ID missing", {
      status: 400,
    });
  }
  return await updateTask(formData, params.projectId || "", taskId);
};

export const taskDetailsLoader = async ({
  params,
}: {
  request: Request;
  params: Params<string>;
}) => {
  const projectId = params.projectId; // string | undefined
  const projectDetails = await getProjectDetails(projectId);
  const taskId = params.taskId;
  if (!taskId) {
    throw new Response("Task ID missing", {
      status: 400,
    });
  }
  const task = await apiHandler<TaskDetailsResponse & APIResult>(
    `/authenticated/tasks/${projectId}/${taskId}`,
    { method: "GET" },
  );
  const { types, statuses, priorities } = await getTaskCategories();

  return { types, statuses, priorities, task, projectDetails };
};

const getProjectDetails = async (projectId: string | undefined) => {
  if (!projectId) {
    throw new Response("Project ID missing", {
      status: 400,
    });
  }

  return await apiHandler<ProjectDetailsProps>(`/authenticated/projects/${projectId}`, {
    method: "GET",
  });
};
const getTaskCategories = async () => {
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
  return { types, statuses, priorities };
};
export const taskListLoader = async ({
  request,
  params,
}: {
  request: Request;
  params: Params<string>;
}) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") ?? "";
  const projectId = params.projectId; // string | undefined

  const projectDetails = await getProjectDetails(projectId);
  const body = request.body ? await request.json() : { employeeIds: [] };
  const tasks = await apiHandler<TaskListProps>(
    `/authenticated/tasks/${projectId}/list?query=${query}`,
    {
      body: body,
    },
  );
  const { types, statuses, priorities } = await getTaskCategories();
  return {
    tasks,
    projectDetails,
    types,
    statuses,
    priorities,
  };
};

const createNewTask = async (formData: FormData, projectId: string) => {
  // Convert FormData to plain object
  const data: Record<string, string | number | Date | null | FormDataEntryValue> =
    Object.fromEntries(formData);
  if (data.assignedTo == "") {
    data.assignedTo = null;
  }
  data.startDate = new Date(data.startDate as string);
  data.endDate = new Date(data.endDate as string);
  return await apiHandler<TaskResponse & APIResult>(`/authenticated/tasks/${projectId}`, {
    body: data,
  });
};

const updateTask = async (formData: FormData, projectId: string, taskId: string) => {
  return await apiHandler<TaskResponse & APIResult>(`/authenticated/tasks/${projectId}/${taskId}`, {
    body: {
      key: formData.get("key"),
      value: formData.get("value") == "null" ? null : formData.get("value"),
    },
    method: "PATCH",
  });
};

export const taskCreateOrUpdateAction = async ({
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
  if (formData.get("intent") == "create") {
    return await createNewTask(formData, projectId);
  } else {
    return await updateTask(formData, projectId, formData.get("taskId") as string);
  }
};
