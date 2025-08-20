import type { EmployeeResponse, Page } from "../../../constants.ts";
import type { APIResult } from "../../../api/axios.ts";
import { Anchor, Checkbox, Select, type TableData, Text } from "@mantine/core";
import { ListPage } from "../../../components/ListPage.tsx";
import type { SortableField } from "../../../components/SortButton.tsx";
import { NavLink } from "react-router";
import { NameFromEmployee } from "../../../components/NameFromEmployee.tsx";

export type EmployeeListProps = Page<EmployeeResponse> & APIResult;

export const EmployeeListPage = () => {
  const generateTableData = ({
    content,
    value,
    setValue,
  }: {
    content: EmployeeResponse[];
    value: string;
    setValue: (val: string) => void;
  }): TableData => ({
    caption: "List of Employees in the Application",
    head: ["", "Email-ID", "Badge", "Firstname", "Lastname", "Role"],
    body: [
      ...content.map((employee: EmployeeResponse) => [
        <Checkbox
          checked={value == employee.employeeId}
          onChange={(e) => {
            setValue(e.target.checked ? employee.employeeId : "");
          }}
        />,
        <Anchor component={NavLink} to={`edit/${employee.employeeId}`} underline={"never"}>
          <Text c={"var(--mantine-color-blue-5)"}>{employee.email}</Text>
        </Anchor>,
        <NameFromEmployee {...employee} />,
        employee.firstName,
        employee.lastName,
        <Select
          value={employee.role.roleId}
          data={[{ label: employee.role.name, value: employee.role.roleId }]}
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
  return <ListPage title={"Employee"} fields={fields} generateTableData={generateTableData} />;
};
