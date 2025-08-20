import type { Page, RoleResponse } from "../../../constants.ts";
import type { APIResult } from "../../../api/axios.ts";
import { Anchor, Checkbox, Group, type TableData, Text } from "@mantine/core";
import { ListPage } from "../../../components/ListPage.tsx";
import type { SortableField } from "../../../components/SortButton.tsx";
import { NavLink } from "react-router";

export type RoleListProps = Page<RoleResponse> & APIResult;

export const RoleListPage = () => {
  const generateTableData = ({
    content,
    value,
    setValue,
  }: {
    content: RoleResponse[];
    value: string;
    setValue: (val: string) => void;
  }): TableData => ({
    caption: "List of Roles in the Application",
    head: ["name"],
    body: [
      ...content.map((role: RoleResponse) => [
        <Group>
          <Checkbox
            checked={value == role.roleId}
            onChange={(e) => {
              setValue(e.target.checked ? role.roleId : "");
            }}
          />
          <Anchor component={NavLink} to={`edit/${role.roleId}`} underline={"never"}>
            <Text c={"var(--mantine-color-blue-5)"}>{role.name}</Text>
          </Anchor>
        </Group>,
      ]),
    ],
  });
  const fields: SortableField[] = [
    {
      label: "Name",
      type: "string",
      field: "name",
    },
  ];
  return <ListPage title={"Role"} fields={fields} generateTableData={generateTableData} />;
};
