import { Outlet, useLoaderData, useNavigation, useParams } from "react-router";
import { Anchor, Box, Breadcrumbs, Grid, Group, LoadingOverlay, Stack } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import type { ProjectResponse, SelectOptionResponse, TaskDetailsResponse } from "../../../types.ts";
import type { APIResult } from "../../../api/axios.ts";
import { TaskName } from "../component/details/TaskName.tsx";
import { TaskDescription } from "../component/details/TaskDescription.tsx";
import { TaskPriority } from "../component/details/TaskPriority.tsx";
import { TaskStatus } from "../component/details/TaskStatus.tsx";
import { TaskType } from "../component/details/TaskType.tsx";
import { getIconByType } from "../../../components/IconsOnTaskTypeStatusPriority.tsx";
import { useMemo } from "react";
import { TaskAssignedToWithManager } from "../component/details/TaskAssignedToWithManager.tsx";
import { TaskAudit } from "../component/details/TaskAudit.tsx";
import { TaskStartNEndDate } from "../component/details/TaskStartNEndDate.tsx";

export type TaskDetailsProps = {
  projectDetails: ProjectResponse;
  task: TaskDetailsResponse;
  types: SelectOptionResponse;
  statuses: SelectOptionResponse;
  priorities: SelectOptionResponse;
} & APIResult;
export const TaskDetailsPage = () => {
  const params = useParams() as {
    projectId: string;
  };
  const { projectDetails, task } = useLoaderData() as TaskDetailsProps;
  const { state } = useNavigation();
  const items = useMemo(
    () =>
      [
        { title: "Projects", href: "../../../" },
        {
          title: projectDetails.name,
          href: `../../../../projects/edit/${params.projectId}`,
        },
        { title: "Tasks", href: ".." },
        {
          title: (
            <Group gap={4}>
              {getIconByType(task.type)}
              {task.taskName}
            </Group>
          ),
          href: "",
          active: true,
        },
      ].map((item, index) => (
        <Anchor
          href={item.href}
          key={index}
          c={!item.active ? "var(--mantine-color-blue-6)" : ""}
          fw={item.active ? "bold" : "normal"}
          underline={"never"}
        >
          {item.title}
        </Anchor>
      )),
    [params.projectId, projectDetails.name, task.taskName, task.type],
  );
  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={state == "loading"}
        zIndex={10}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "blue", type: "bars" }}
      />
      <Stack gap={8} my={16}>
        <Breadcrumbs separator={<IconChevronRight size={16} />} style={{ alignItems: "center" }}>
          {items}
        </Breadcrumbs>
        <Grid dir={"row"} my={32}>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack>
              <TaskName />
              <TaskDescription />
              <Outlet />
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 1 }}></Grid.Col>
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Stack align={"stretch"}>
              <TaskPriority />
              <TaskStatus />
              <TaskType />
              <TaskStartNEndDate />
              <TaskAssignedToWithManager />
              <TaskAudit />
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Box>
  );
};
