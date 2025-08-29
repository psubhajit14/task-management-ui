import type { Params } from "react-router";
import { apiHandler, type APIResult } from "./axios.ts";
import type { CommentResponse, Page } from "../types.ts";

// export const commentListLoader = async ({
//   request,
//   params,
// }: {
//   request: Request;
//   params: Params<string>;
// }) => {
//   const url = new URL(request.url);
//   const page = url.searchParams.get("page") ?? "0";
//   const taskId = params.taskId;
//   if (!taskId) {
//     throw new Response("Task ID missing", {
//       status: 400,
//     });
//   }
//   return await apiHandler<Page<CommentResponse> & APIResult>(
//     `/authenticated/comments/page/${taskId}/${page}`,
//     { method: "GET" },
//   );
// };
export const loadMoreComment = async (taskId: string, page: number, sortBy: string) => {
  if (!taskId) {
    throw new Response("Task ID missing", {
      status: 400,
    });
  }
  return await apiHandler<Page<CommentResponse> & APIResult>(
    `/authenticated/comments/page/${taskId}?page=${page}&direction=${sortBy}`,
    { method: "GET" },
  );
};
export const commentCreateOrUpdateOrDeleteAction = async ({
  request,
  params,
}: {
  request: Request;
  params: Params<string>;
}) => {
  const formData = await request.formData();
  console.log(formData);
  const intent = formData.get("intent");
  const taskId = params.taskId;
  const commentId = formData.get("commentId");
  switch (intent) {
    case "create":
      return await apiHandler<CommentResponse & APIResult>(`/authenticated/comments/${taskId}`, {
        body: formData,
      });
    case "update":
      return await apiHandler<CommentResponse & APIResult>(
        `/authenticated/comments/${taskId}/${commentId}`,
        {
          body: formData,
          method: "PUT",
        },
      );
    case "delete":
      return await apiHandler<APIResult>(`/authenticated/comments/${taskId}/${commentId}`, {
        method: "DELETE",
      });
  }
};
