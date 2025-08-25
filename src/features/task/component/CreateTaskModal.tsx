import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { ActionButton } from "../../../components/ActionButton.tsx";
import { Button, Modal, Stack, Text } from "@mantine/core";
import { Form, useActionData, useLoaderData } from "react-router";
import { TextInput } from "../../../components/TextInput.tsx";
import { SelectInput } from "../../../components/SelectInput.tsx";
import type { TaskListProps } from "../pages/TaskList.tsx";
import { useEffect } from "react";

export const CreateTaskModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { errors, success } = useActionData() ?? {};
  const { types, priorities, statuses, projectDetails } = useLoaderData() as TaskListProps;
  useEffect(() => {
    if (success) {
      close();
    }
  }, [success, close]);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        title={
          <Text fw={"bold"} size={"xl"}>
            Create New Task
          </Text>
        }
        centered
      >
        <Form action={""} method="POST">
          <input type="hidden" name="intent" value="create" />
          <Stack gap={16} mt={16}>
            <TextInput
              required
              label={"Task Name"}
              name="taskName"
              error={errors && errors.taskName}
            />
            <TextInput
              required
              label={"Task Description"}
              name="taskDescription"
              error={errors && errors.taskDescription}
            />
            <SelectInput
              required
              label={"Priority"}
              name="priority"
              defaultValue={"P0"}
              data={priorities}
            />
            <SelectInput
              required
              disabled
              label={"Statuses"}
              name="statuses"
              defaultValue={"TODO"}
              data={statuses}
            />
            <SelectInput required label={"Type"} name="type" defaultValue={"TASK"} data={types} />
            <SelectInput
              required
              label={"Assigned To"}
              name="assignedTo"
              defaultValue={""}
              data={[
                {
                  label: "Unassigned",
                  value: "",
                },
                ...projectDetails.employees.map((emp) => ({
                  label: emp.firstName + " " + emp.lastName,
                  value: emp.employeeId,
                })),
              ]}
            />
            <Button fullWidth type={"submit"}>
              Create
            </Button>
            <Button fullWidth variant={"outline"} type={"reset"}>
              Reset
            </Button>
          </Stack>
        </Form>
      </Modal>
      <ActionButton
        Icon={IconPlus}
        label="Add Task"
        variant="primary"
        fullWidth
        onClick={open}
        c={"white"}
      />
    </>
  );
};
