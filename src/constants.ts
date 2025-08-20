export const TOKEN = {
  ACCESS_TOKEN: "access",
  REFRESH_TOKEN: "refresh",
};
export const REQUEST_METHODS = {
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  GET: "GET",
};
export const ROUTES = {
  INDEX: "/",
  AUTH: "auth",
  LOGIN: "login",
  REGISTER: "register",
  ADMIN: "admin",
  ROLES: "roles",
  ROLES_ADD: "roles/add",
  ROLES_EDIT: "roles/edit/:roleId",
  EMPLOYEES: "employees",
  USERS: "users",
  PROJECTS: "projects",
  PROJECTS_ADD: "projects/add",
  PROJECTS_EDIT: "projects/edit/:id",
  TASKS: "projects/:projectId/tasks",
  TASKS_ADD: "projects/:projectId/tasks/add",
  TASKS_EDIT: "projects/:projectId/tasks/edit/:id",
  MY_PROFILE: "my-profile",
  FORBIDDEN: "forbidden",
  NOT_FOUND: "*",
};
export const profileImg =
  "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
export const API_PATH = {};
export type QueryParamProps = {
  page?: number;
  sortBy?: string;
  direction?: "asc" | "desc";
  query?: string;
};

export interface EmployeeResponse {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  role: RoleResponse;
}

export interface ProjectResponse {
  projectId: string;
  name: string;
  details: string;
  createdAt: Date; // ISO Date string
  updatedAt: Date; // ISO Date string
  manager: EmployeeResponse;
  createdBy: EmployeeResponse;
  updatedBy: EmployeeResponse;
  employees: EmployeeResponse[];
}

export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface Pageable {
  offset: number;
  sort: Sort;
  unpaged: boolean;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
}
export interface RoleResponse {
  name: string;
  roleId: string;
}
export interface RoleDetailResponse extends RoleResponse {
  permissions: string[];
}
export type SelectOptionResponse = { label: string; value: string }[];

/**
 * ✅ Generic pagination wrapper
 */
export interface Page<T> {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: T[]; // 🔥 generic type
  number: number;
  sort: Sort;
  pageable: Pageable;
  numberOfElements: number;
  empty: boolean;
}
