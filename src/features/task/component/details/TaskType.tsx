import { useLoaderData, useSubmit } from "react-router";
import { Stack, Text } from "@mantine/core";
import type { TaskDetailsProps } from "../../pages/TaskDetails.tsx";
import { SelectInput } from "../../../../components/SelectInput.tsx";
import { useDebouncedCallback } from "@mantine/hooks";

export const TaskType = () => {
  const { task, types } = useLoaderData() as TaskDetailsProps;
  const submit = useSubmit();
  const handleChangeType = useDebouncedCallback(
    (value: string) =>
      submit(
        {
          key: "type",
          value: value,
        },
        { method: "POST" },
      ),
    0,
  );
  return (
    <Stack>
      <Text size={"md"} fw={"bold"}>
        Task Type
      </Text>
      <SelectInput
        required
        name="value"
        defaultValue={task.type}
        data={types}
        onChange={(value) => handleChangeType(value as string)}
      />
    </Stack>
  );
};
