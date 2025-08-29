import { useLoaderData } from "react-router";
import type { TaskDetailsProps } from "../../pages/TaskDetails.tsx";
import { Group, Stack, Text } from "@mantine/core";
import { NameFromEmployee } from "../../../../components/NameFromEmployee.tsx";
import { formatDistanceToNow } from "date-fns";

export const TaskAudit = () => {
  const { task } = useLoaderData() as TaskDetailsProps;
  return (
    <Stack>
      <Text fw={"bold"} size={"lg"}>
        Created By
      </Text>
      <Group>
        <NameFromEmployee {...task.createdBy} />{" "}
        <Text c={"dimmed"} size={"xs"}>
          {formatDistanceToNow(task.createdAt, {
            addSuffix: true,
          })}
        </Text>
      </Group>
      <Text fw={"bold"} size={"md"}>
        Updated By
      </Text>
      <Group>
        <NameFromEmployee {...task.updatedBy} />
        <Text c={"dimmed"} size={"xs"}>
          {formatDistanceToNow(task.updatedAt, {
            addSuffix: true,
          })}
        </Text>
      </Group>
    </Stack>
  );
};
