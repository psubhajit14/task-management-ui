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
  createdAt: Date;
  updatedAt: Date;
  manager: EmployeeResponse;
  createdBy: EmployeeResponse;
  updatedBy: EmployeeResponse;
  employees: EmployeeResponse[];
}

export interface TaskResponse {
  taskId: string;
  taskName: string;
  priority: string;
  status: string;
  type: string;
  assignedTo: EmployeeResponse;
}
export type TaskDetailsResponse = {
  taskDescription: string;
  managedBy: EmployeeResponse;
  startDate: Date;
  endDate: Date;
  createdBy: EmployeeResponse;
  updatedBy: EmployeeResponse;
  createdAt: string;
  updatedAt: string;
} & TaskResponse;
export type CommentResponse = {
  commentId: string;
  content: string;
  createdBy: EmployeeResponse;
  updatedBy: EmployeeResponse;
  createdAt: Date;
  updatedAt: Date;
};

export interface RoleResponse {
  name: string;
  roleId: string;
}
export interface RoleDetailResponse extends RoleResponse {
  permissions: string[];
}
export type SelectOptionResponse = {
  label: string;
  value: string;
}[];

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
