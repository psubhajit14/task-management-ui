import { RouterProvider } from "react-router";
import { routes } from "./routes.ts";

export const App = () => {
  return <RouterProvider router={routes} />;
};
