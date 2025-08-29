import { useLoaderData, useSubmit } from "react-router";
import type { TaskDetailsProps } from "../../pages/TaskDetails.tsx";
import { useDebouncedCallback } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
import { Stack, Text } from "@mantine/core";

export const TaskStartNEndDate = () => {
  const { task } = useLoaderData() as TaskDetailsProps;
  const submit = useSubmit();
  const handleChangeDate = useDebouncedCallback(
    (value: string, key: "startDate" | "endDate") =>
      submit(
        {
          key,
          value,
        },
        { method: "POST" },
      ),
    0,
  );
  return (
    <Stack>
      <Text size={"lg"} fw={"bold"}>
        Start Date and End Date
      </Text>
      <DatePickerInput
        type={"range"}
        defaultValue={[task.startDate, task.endDate]}
        onChange={(value) => {
          if (value[0] !== null && value[1] !== null) {
            handleChangeDate(value[0] as string, "startDate");
            handleChangeDate(value[1] as string, "endDate");
          }
        }}
      />
    </Stack>
  );
};
