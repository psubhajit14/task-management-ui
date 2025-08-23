import {
  profileImg,
  type ProjectResponse,
  type SelectOptionResponse,
  type TaskResponse,
} from "../../../constants.ts";
import type { APIResult } from "../../../api/axios.ts";
import {
  Anchor,
  Avatar,
  AvatarGroup,
  Breadcrumbs,
  Button,
  Grid,
  GridCol,
  Group,
  Stack,
} from "@mantine/core";
import { useLoaderData, useParams } from "react-router";
import { IconCancel, IconChevronRight } from "@tabler/icons-react";
import { TextInput } from "../../../components/TextInput.tsx";
import { SelectInput } from "../../../components/SelectInput.tsx";
import { ActionButton } from "../../../components/ActionButton.tsx";
import { KanbanBoard } from "../component/DragNDrop.tsx";
import { CreateTaskModal } from "../component/CreateTaskModal.tsx";

export type TaskListProps = {
  projectDetails: ProjectResponse;
  tasks: TaskResponse[];
  types: SelectOptionResponse;
  statuses: SelectOptionResponse;
  priorities: SelectOptionResponse;
} & APIResult;
export const TaskListPage = () => {
  const params = useParams() as {
    projectId: string;
  };
  const { projectDetails, types, priorities } = useLoaderData() as TaskListProps;
  const items = [
    { title: "Projects", href: ".." },
    {
      title: projectDetails.name,
      href: `../../projects/edit/${params.projectId}`,
    },
    { title: "Tasks", href: "", active: true },
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
  ));
  return (
    <Stack gap={8} my={16}>
      <Breadcrumbs separator={<IconChevronRight size={16} />} style={{ alignItems: "center" }}>
        {items}
      </Breadcrumbs>

      <h2>Tasks</h2>
      <Grid justify={"space-between"} dir={"row"} align={"center"} w={"100%"} grow>
        <GridCol span={{ base: 12, md: 2 }}>
          <TextInput label={"Search..."} w={"100%"} />
        </GridCol>
        <GridCol span={{ base: 12, md: 7 }}>
          <Group>
            <AvatarGroup>
              {projectDetails.employees.map(() => (
                <Avatar src={profileImg} />
              ))}
              <Avatar>+3</Avatar>
            </AvatarGroup>
            <Button variant={"subtle"} onClick={() => {}} c={"var(--mantine-color-bright)"}>
              Only My Tasks
            </Button>
            <SelectInput
              variant={"default"}
              label="Type"
              w={100}
              defaultValue={""}
              data={[{ label: "All", value: "" }, ...types]}
            />
            <SelectInput
              variant={"default"}
              label="Priority"
              w={100}
              defaultValue={""}
              data={[{ label: "All", value: "" }, ...priorities]}
            />
          </Group>
        </GridCol>

        <GridCol span={{ base: 12, md: 4, lg: 3 }} w={"100%"}>
          <Grid dir={"row"} justify={"space-between"}>
            <GridCol span={6}>
              <ActionButton
                fullWidth
                Icon={IconCancel}
                label={"Clear Filters"}
                onClick={() => {}}
                c={"var(--mantine-color-bright)"}
              />
            </GridCol>
            <GridCol span={6}>
              <CreateTaskModal />
            </GridCol>
          </Grid>
        </GridCol>
      </Grid>
      <KanbanBoard />
    </Stack>
  );
};
