import { useLoaderData, useSubmit } from "react-router";
import { Stack, Text } from "@mantine/core";
import type { TaskDetailsProps } from "../../pages/TaskDetails.tsx";
import { SelectInput } from "../../../../components/SelectInput.tsx";
import { useDebouncedCallback } from "@mantine/hooks";

export const TaskStatus = () => {
  const { task, statuses } = useLoaderData() as TaskDetailsProps;
  const submit = useSubmit();
  const handleChangeStatus = useDebouncedCallback(
    (value: string) =>
      submit(
        {
          key: "status",
          value: value,
        },
        { method: "POST" },
      ),
    0,
  );
  return (
    <Stack>
      <Text size={"md"} fw={"bold"}>
        Task Status
      </Text>
      <SelectInput
        required
        name="value"
        defaultValue={task.status}
        data={statuses}
        onChange={(value) => handleChangeStatus(value as string)}
      />
    </Stack>
  );
};
