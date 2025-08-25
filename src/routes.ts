import { createBrowserRouter } from "react-router";
import { AuthLayout } from "./layout/AuthLayout";
import { Login, Register } from "@auth";
import { Forbidden, NotFound } from "@error";
import { EmployeeListPage, RoleDetailsPage, RoleListPage } from "@super-admin";
import { UserLayout } from "./layout/UserLayout.tsx";
import { ProjectDetailsPage, ProjectListPage } from "@project";
import { TaskDetailsPage, TaskListPage } from "@task*";
import { LandingPage } from "@landing";
import { ProfilePage } from "@profile";
import { ROUTES } from "./constants.ts";
import { loginAction, loginLoader, registerAction } from "./api/auth.ts";
import { profileLoader } from "./api/profile.ts";
import {
  projectCreateAction,
  projectDetailsLoader,
  projectListLoader,
  projectUpdateAction,
} from "./api/project.ts";
import {
  roleCreateAction,
  roleDetailsLoader,
  roleListLoader,
  roleUpdateAction,
} from "./api/role.ts";
import { employeeListLoader, updateRoleAction } from "./api/employee.ts";
import {
  taskCreateOrUpdateAction,
  taskDetailsLoader,
  taskListLoader,
  taskUpdateAction,
} from "./api/task.ts";
import { CommentList } from "./features/task/component/details/component/CommentList.tsx";
import { commentListLoader } from "./api/comment.ts";

export const routes = createBrowserRouter([
  {
    path: ROUTES.INDEX,
    Component: LandingPage,
    children: [
      {
        path: ROUTES.AUTH,
        Component: AuthLayout,
        children: [
          {
            path: ROUTES.LOGIN,
            Component: Login,
            action: loginAction,
            loader: loginLoader,
          },
          {
            path: ROUTES.REGISTER,
            Component: Register,
            action: registerAction,
          },
        ],
      },
      {
        path: ROUTES.USERS,
        Component: UserLayout,
        children: [
          {
            path: ROUTES.ROLES,
            Component: RoleListPage,
            loader: roleListLoader,
          },
          {
            path: ROUTES.ROLES_ADD,
            Component: RoleDetailsPage,
            loader: roleDetailsLoader,
            action: roleCreateAction,
          },
          {
            path: ROUTES.ROLES_EDIT,
            Component: RoleDetailsPage,
            loader: roleDetailsLoader,
            action: roleUpdateAction,
          },
          {
            path: ROUTES.EMPLOYEES,
            Component: EmployeeListPage,
            loader: employeeListLoader,
            action: updateRoleAction,
          },
          {
            path: ROUTES.PROJECTS,
            Component: ProjectListPage,
            loader: projectListLoader,
          },
          {
            path: ROUTES.PROJECTS_ADD,
            Component: ProjectDetailsPage,
            loader: projectDetailsLoader,
            action: projectCreateAction,
          },
          {
            path: ROUTES.PROJECTS_EDIT,
            Component: ProjectDetailsPage,
            loader: projectDetailsLoader,
            action: projectUpdateAction,
          },
          {
            path: ROUTES.TASKS,
            Component: TaskListPage,
            loader: taskListLoader,
            action: taskCreateOrUpdateAction,
          },
          // { path: ROUTES.TASKS_ADD, Component: TaskDetailsPage },
          {
            path: ROUTES.TASKS_EDIT,
            Component: TaskDetailsPage,
            loader: taskDetailsLoader,
            action: taskUpdateAction,
            children: [
              {
                path: "",
                Component: CommentList,
                loader: commentListLoader,
              },
            ],
          },
          {
            path: ROUTES.MY_PROFILE,
            Component: ProfilePage,
            loader: profileLoader,
          },
          {
            path: ROUTES.FORBIDDEN,
            Component: Forbidden,
          },
        ],
      },

      {
        path: ROUTES.NOT_FOUND,
        Component: NotFound,
      },
    ],
  },
]);
