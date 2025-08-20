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
import { projectListLoader } from "./api/project.ts";
import {
  roleCreateAction,
  roleDetailsLoader,
  roleListLoader,
  roleUpdateAction,
} from "./api/role.ts";
import { employeeListLoader } from "./api/employee.ts";

export const routes = createBrowserRouter([
  {
    path: ROUTES.INDEX,
    Component: LandingPage,
    children: [
      {
        path: ROUTES.AUTH,
        Component: AuthLayout,
        children: [
          { path: ROUTES.LOGIN, Component: Login, action: loginAction, loader: loginLoader },
          { path: ROUTES.REGISTER, Component: Register, action: registerAction },
        ],
      },
      // {
      //   path: ROUTES.ADMIN,
      //   Component: AdminLayout,
      //   children: [
      //     // { path: ROUTES.ROLES, Component: RoleListPage, loader: roleListLoader },
      //     // { path: ROUTES.ROLES_ADD, Component: RoleDetailsPage },
      //     // { path: ROUTES.ROLES_EDIT, Component: RoleDetailsPage },
      //     // { path: ROUTES.EMPLOYEES, Component: EmployeeListPage },
      //   ],
      // },
      {
        path: ROUTES.USERS,
        Component: UserLayout,
        children: [
          { path: ROUTES.ROLES, Component: RoleListPage, loader: roleListLoader },
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
          { path: ROUTES.EMPLOYEES, Component: EmployeeListPage, loader: employeeListLoader },
          { path: ROUTES.PROJECTS, Component: ProjectListPage, loader: projectListLoader },
          { path: ROUTES.PROJECTS_ADD, Component: ProjectDetailsPage },
          { path: ROUTES.PROJECTS_EDIT, Component: ProjectDetailsPage },
          { path: ROUTES.TASKS, Component: TaskListPage },
          { path: ROUTES.TASKS_ADD, Component: TaskDetailsPage },
          { path: ROUTES.TASKS_EDIT, Component: TaskDetailsPage },
          { path: ROUTES.MY_PROFILE, Component: ProfilePage, loader: profileLoader },
          { path: ROUTES.FORBIDDEN, Component: Forbidden },
        ],
      },

      { path: ROUTES.NOT_FOUND, Component: NotFound },
    ],
  },
]);
