import { useEffect, useState } from "react";
import { Form, useActionData, useLoaderData, useNavigate } from "react-router";
import { Anchor, Breadcrumbs, Divider, Fieldset, Group, Stack, Text } from "@mantine/core";
import type { ProjectResponse, SelectOptionResponse } from "../../../types.ts";
import type { APIResult } from "../../../api/axios.ts";
import { IconChevronRight, IconCircleCheck, IconCircleX, IconEdit } from "@tabler/icons-react";
import { TextInput } from "../../../components/TextInput.tsx";
import { ActionButton } from "../../../components/ActionButton.tsx";
import { SelectInput } from "../../../components/SelectInput.tsx";
import { MultiSelectInput } from "../../../components/MultiSelectInput.tsx";
import { formatDistanceToNow } from "date-fns";
import { NameFromEmployee } from "../../../components/NameFromEmployee.tsx";

export type ProjectDetailsProps = ProjectResponse & {
  employeeOptions: SelectOptionResponse;
} & APIResult;
export const ProjectDetailsPage = () => {
  const {
    name = "",
    details,
    manager,
    createdAt,
    createdBy,
    updatedAt,
    employees = [],
  } = useLoaderData() as ProjectDetailsProps;
  const navigate = useNavigate();
  const { errors, success, projectId } = (useActionData() as ProjectDetailsProps) ?? {};
  const isAdd = location.pathname.includes("/add");
  useEffect(() => {
    if (success) {
      if (isAdd) navigate(`../projects/edit/${projectId}`);
      setEditable(false);
    }
  }, [success, navigate, projectId, isAdd]);
  const [editable, setEditable] = useState(isAdd);
  const items = [
    {
      title: "Projects",
      href: isAdd ? "." : "..",
    },
    {
      title: isAdd ? "Create Project" : name,
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
  ));

  return (
    <Stack gap={2} my={16}>
      <Breadcrumbs separator={<IconChevronRight size={16} />} style={{ alignItems: "center" }}>
        {items}
      </Breadcrumbs>
      <Form action={""} method={"POST"}>
        <Group align={"center"} py={4}>
          {editable ? (
            <TextInput required my={16} label={"Project Name"} defaultValue={name} name="name" />
          ) : (
            <h2>{name}</h2>
          )}
          {!editable ? (
            <ActionButton
              Icon={IconEdit}
              label={"Edit Project"}
              onClick={() => {
                setEditable(true);
              }}
              c={"var(--mantine-color-blue-6)"}
            />
          ) : (
            <>
              <ActionButton
                Icon={IconCircleCheck}
                label={"Save Changes"}
                type={"submit"}
                c={"var(--mantine-color-green-6)"}
              />
              <ActionButton
                Icon={IconCircleX}
                label={"Cancel"}
                disabled={isAdd}
                onClick={() => {
                  setEditable(false);
                }}
                c={"var(--mantine-color-red-6)"}
              />
            </>
          )}
        </Group>
        <Fieldset
          legend={
            <Text c={"var(--mantine-color-blue-6)"} fw={"bold"}>
              Project Details
            </Text>
          }
          disabled={!editable}
        >
          <Stack gap={16}>
            <TextInput
              required
              type={"text"}
              label={"Details"}
              defaultValue={details}
              error={errors && errors.details}
              name="details"
            />
            <SelectInput
              required
              label={"Manager"}
              error={errors && errors.manager}
              data={employees.map((employee) => ({
                label: employee.email,
                value: employee.employeeId,
                ...employee,
              }))}
              variant={"employee"}
              defaultValue={manager && manager.employeeId}
              name="managerId"
            />
            <MultiSelectInput
              label={"Assigned To"}
              placeholder={
                "Please select the employees to assign to the project, current user and Manager assigned by Default"
              }
              name="employeeIds"
              error={errors && errors.employeeIds}
              data={employees.map((employee) => ({
                label: employee.email,
                value: employee.employeeId,
                ...employee,
              }))}
              defaultValue={employees.map((employee) => employee.employeeId)}
            />
          </Stack>
        </Fieldset>
      </Form>
      <Divider mt={16} />
      {createdBy && (
        <Stack gap={8} my={16}>
          <Text size={"xs"}>
            <Group gap={8}>
              Created by:{" "}
              <NameFromEmployee {...createdBy} fullNameOnly withImage={false} fw={"bold"} />
              on{" "}
              {formatDistanceToNow(createdAt, {
                addSuffix: true,
              })}
            </Group>
          </Text>
          <Text size={"xs"}>
            <Group gap={8}>
              Last Updated by:{" "}
              <NameFromEmployee {...createdBy} fullNameOnly withImage={false} fw={"bold"} /> on{" "}
              {formatDistanceToNow(updatedAt, {
                addSuffix: true,
              })}
            </Group>
          </Text>
        </Stack>
      )}
    </Stack>
  );
};
