import type { Params } from "react-router";
import { apiHandler, type APIResult } from "./axios.ts";
import type { CommentResponse, Page } from "../types.ts";

export const commentListLoader = async ({
  request,
  params,
}: {
  request: Request;
  params: Params<string>;
}) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") ?? "1";
  const taskId = params.taskId;
  if (!taskId) {
    throw new Response("Task ID missing", {
      status: 400,
    });
  }
  return await apiHandler<Page<CommentResponse> & APIResult>(
    `/authenticated/comments/page/${taskId}/${page}`,
    { method: "GET" },
  );
};
