import { Anchor, Avatar, Checkbox, type TableData, Text } from "@mantine/core";
import { NavLink } from "react-router";
import { type Page, type ProjectResponse } from "../../../types.ts";
import type { APIResult } from "../../../api/axios.ts";
import { formatDistanceToNow } from "date-fns";
import { type SortableField } from "../../../components/SortButton.tsx";
import { ListPage } from "../../../components/ListPage.tsx";
import { NameFromEmployee } from "../../../components/NameFromEmployee.tsx";
import { profileImg } from "../../../constants.ts";

export type ProjectListProps = Page<ProjectResponse> & APIResult;

export const ProjectListPage = () => {
  const generateTableData = ({
    content,
    value,
    setValue,
  }: {
    content: ProjectResponse[];
    value: string;
    setValue: (val: string) => void;
  }): TableData => ({
    caption: "These are the Projects you are part of.",
    head: ["", "Name", "Details", "Manager", "Employees", "Created At"],
    body: content.map((project: ProjectResponse) => {
      return [
        <Checkbox
          checked={value == project.projectId}
          onChange={(e) => {
            setValue(e.target.checked ? project.projectId : "");
          }}
        />,
        <Anchor component={NavLink} to={`${project.projectId}/tasks`} underline={"never"}>
          <Text c={"var(--mantine-color-blue-5)"}>{project.name}</Text>
        </Anchor>,
        project.details,
        <NameFromEmployee {...project.manager} withImage fullNameOnly />,
        <Avatar.Group>
          {project.employees.map(() => (
            <Avatar src={profileImg} />
          ))}
        </Avatar.Group>,
        formatDistanceToNow(project.createdAt, {
          addSuffix: true,
        }),
      ];
    }),
  });

  const projectSortableFields: SortableField[] = [
    {
      field: "name",
      label: "Name",
      type: "string",
    },
    {
      field: "createdAt",
      label: "Created At",
      type: "date",
    },
  ];

  return (
    <ListPage
      title={"Project"}
      fields={projectSortableFields}
      generateTableData={generateTableData}
    />
  );
};
