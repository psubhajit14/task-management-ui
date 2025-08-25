import { createRoot } from "react-dom/client";
// core styles are required for all packages
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/dates/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import "./main.css";
import { Notifications } from "@mantine/notifications";
import { RouterProvider } from "react-router";
import { routes } from "./routes.ts";
// other css files are required only if
// you are using components from the corresponding package
// import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
// ...

const theme = createTheme({
  /** Put your mantine theme override here *
   *
   */
});

createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme}>
    <Notifications />
    <RouterProvider router={routes} />
  </MantineProvider>,
);
