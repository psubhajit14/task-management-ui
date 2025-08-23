import type { EmployeeResponse, Page, SelectOptionResponse } from "../../../constants.ts";
import type { APIResult } from "../../../api/axios.ts";
import { Anchor, type TableData, Text } from "@mantine/core";
import { ListPage } from "../../../components/ListPage.tsx";
import type { SortableField } from "../../../components/SortButton.tsx";
import { NavLink, useLoaderData, useSubmit } from "react-router";
import { NameFromEmployee } from "../../../components/NameFromEmployee.tsx";
import { useCallback } from "react";
import { SelectInput } from "../../../components/SelectInput.tsx";

export type EmployeeListProps = Page<EmployeeResponse> & {
  roles: SelectOptionResponse;
} & APIResult;

export const EmployeeListPage = () => {
  const { roles = [] } = useLoaderData() as EmployeeListProps;
  const submit = useSubmit();
  const updateRole = useCallback(
    (employeeId: string, roleId: string) => {
      submit(
        {
          roleId,
          employeeId,
        },
        {
          encType: "application/json",
          method: "PATCH",
        },
      );
    },
    [submit],
  );
  const generateTableData = ({ content }: { content: EmployeeResponse[] }): TableData => ({
    caption: "List of Employees in the Application",
    head: ["", "Email-ID", "Badge", "Firstname", "Lastname", "Role"],
    body: [
      ...content.map((employee: EmployeeResponse) => [
        "",
        <Anchor component={NavLink} to={`edit/${employee.employeeId}`} underline={"never"}>
          <Text c={"var(--mantine-color-blue-5)"}>{employee.email}</Text>
        </Anchor>,
        <NameFromEmployee {...employee} />,
        employee.firstName,
        employee.lastName,
        <SelectInput
          value={employee.role.roleId}
          data={roles}
          onChange={(value) => {
            if (value != null) updateRole(employee.employeeId, value);
          }}
        />,
      ]),
    ],
  });
  const fields: SortableField[] = [
    {
      label: "Firstname",
      type: "string",
      field: "firstname",
    },
    {
      label: "Lastname",
      type: "string",
      field: "lastname",
    },
  ];
  return (
    <ListPage
      editEnabled={false}
      deleteEnabled={false}
      addEnabled={false}
      title={"Employee"}
      fields={fields}
      generateTableData={generateTableData}
    />
  );
};
