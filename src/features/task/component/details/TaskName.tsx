import { Form, useActionData, useLoaderData } from "react-router";
import { Button, Group, Text } from "@mantine/core";
import type { TaskDetailsProps } from "../../pages/TaskDetails.tsx";
import { IconCancel, IconCheck, IconPencil } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { TextInput } from "../../../../components/TextInput.tsx";

export const TaskName = () => {
  const { task, errors } = useLoaderData() as TaskDetailsProps;
  const [editable, setEditable] = useState<boolean>(false);
  const { success } = useActionData() ?? {};
  useEffect(() => {
    if (success) {
      setEditable(false);
    }
  }, [task.taskName, success]);
  if (!editable)
    return (
      <Group>
        <Text fw={"bold"} size={"xl"}>
          {task.taskName}
        </Text>
        <IconPencil
          color={"var(--mantine-color-blue-5)"}
          onClick={() => setEditable(!editable)}
          cursor={"pointer"}
        />
      </Group>
    );
  return (
    <Form action={""} method={"POST"}>
      <input hidden name={"key"} value={"taskName"} />
      <Group>
        <TextInput
          required
          label={"Task Name"}
          name={"value"}
          defaultValue={task.taskName}
          error={errors && errors.taskName}
        />
        <Button variant={"subtle"} type={"submit"}>
          <IconCheck color={"var(--mantine-color-green-5)"} cursor={"pointer"} />
        </Button>
        <IconCancel
          color={"var(--mantine-color-red-5)"}
          onClick={() => setEditable(!editable)}
          cursor={"pointer"}
        />
      </Group>
    </Form>
  );
};
