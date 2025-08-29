import { useLoaderData, useSubmit } from "react-router";
import { Stack, Text } from "@mantine/core";
import type { TaskDetailsProps } from "../../pages/TaskDetails.tsx";
import { SelectInput } from "../../../../components/SelectInput.tsx";
import { useDebouncedCallback } from "@mantine/hooks";

export const TaskPriority = () => {
  const { task, priorities } = useLoaderData() as TaskDetailsProps;
  const submit = useSubmit();
  const handleChangePriority = useDebouncedCallback(
    (value: string) =>
      submit(
        {
          key: "priority",
          value: value,
        },
        { method: "POST" },
      ),
    0,
  );
  return (
    <Stack>
      <Text size={"lg"} fw={"bold"}>
        Task Priority
      </Text>
      <SelectInput
        required
        name="value"
        defaultValue={task.priority}
        data={priorities}
        onChange={(value) => handleChangePriority(value as string)}
      />
    </Stack>
  );
};
