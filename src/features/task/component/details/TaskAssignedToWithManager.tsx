import { useLoaderData, useSubmit } from "react-router";
import { Stack, Text } from "@mantine/core";
import type { TaskDetailsProps } from "../../pages/TaskDetails.tsx";
import { SelectInput } from "../../../../components/SelectInput.tsx";
import { useDebouncedCallback } from "@mantine/hooks";
import { NameFromEmployee } from "../../../../components/NameFromEmployee.tsx";

export const TaskAssignedToWithManager = () => {
  const { task, projectDetails } = useLoaderData() as TaskDetailsProps;
  const submit = useSubmit();
  const handleChangeAssignedTo = useDebouncedCallback(
    (value: string) =>
      submit(
        {
          key: "assignedTo",
          value: value == "Unassigned" ? null : value,
        },
        { method: "POST" },
      ),
    0,
  );
  return (
    <Stack>
      <Text size={"md"} fw={"bold"}>
        Assigned to
      </Text>
      <SelectInput
        required
        name="value"
        defaultValue={task.assignedTo ? task.assignedTo.employeeId : "null"}
        data={[
          { label: "Unassigned", value: "null" },
          ...projectDetails.employees.map((emp) => ({ label: emp.email, value: emp.employeeId })),
        ]}
        onChange={(value) => handleChangeAssignedTo(value as string)}
      />
      <Text size={"md"} fw={"bold"}>
        Managed by
      </Text>
      <Text size={"md"} fw={"bold"}>
        <NameFromEmployee {...projectDetails.manager} />
      </Text>
    </Stack>
  );
};
