import type { RoleDetailResponse, SelectOptionResponse } from "../../../constants.ts";
import type { APIResult } from "../../../api/axios.ts";
import { useLoaderData, useLocation, useSubmit } from "react-router";
import { Anchor, Breadcrumbs, Checkbox, Fieldset, Group, Stack, Table, Text } from "@mantine/core";
import { IconChevronRight, IconCircleCheck, IconCircleX, IconEdit } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import { ActionButton } from "../../../components/ActionButton.tsx";
import { TextInput } from "../../../components/TextInput.tsx";

export type RoleDetailsProps = RoleDetailResponse & {
  options: SelectOptionResponse;
} & APIResult;
/**
 * Splits a string by "_" into two parts:
 *  - everything before the last "_"
 *  - the last part after "_"
 *
 * Example:
 *   "ASSIGN_ROLE_EMPLOYEES" → ["ASSIGN_ROLE", "EMPLOYEES"]
 *   "VIEW_ROLES"            → ["VIEW", "ROLES"]
 */
function buildTableForMantine(items: SelectOptionResponse) {
  const tableMap: Record<string, Record<string, string | null>> = {};
  const columnsSet = new Set<string>();

  // Build map of rows and columns
  items.forEach(({ label, value }) => {
    const parts = label.split("_");
    const col = parts.pop()!; // last part = column
    const row = parts.join("_"); // rest = row key
    columnsSet.add(col);

    if (!tableMap[row]) tableMap[row] = {};
    tableMap[row][col] = value;
  });

  const columns = Array.from(columnsSet);

  // Build rows array for Mantine Table
  const rows = Object.entries(tableMap).map(([rowKey, cols]) => {
    const row: Record<string, string | null> = {
      Action: rowKey,
    }; // first cell = row key
    columns.forEach((col) => {
      row[col] = cols[col] || null; // fill missing with null
    });
    return row;
  });

  return {
    columns: ["Action", ...columns],
    rows,
  };
}

export const RoleDetailsPage = () => {
  const { name = "", permissions = [], options } = useLoaderData() as RoleDetailsProps;
  const location = useLocation();
  const isAdd = location.pathname.includes("/add");
  const [editable, setEditable] = useState(isAdd);
  const submit = useSubmit();
  const [nameLocal, setNameLocal] = useState<string>(name);
  const [updatedPermissions, setUpdatedPermissions] = useState(permissions);
  const saveChanges = useCallback(() => {
    submit(
      {
        name: nameLocal,
        permissions: updatedPermissions,
      },
      {
        encType: "application/json",
        method: isAdd ? "POST" : "PUT",
      },
    );
  }, [isAdd, nameLocal, submit, updatedPermissions]);
  const items = [
    { title: "Roles", href: isAdd ? "." : ".." },
    {
      title: isAdd ? "Create Role" : name,
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

  const { columns, rows } = buildTableForMantine(options);

  return (
    <Stack gap={2} my={16}>
      <Breadcrumbs separator={<IconChevronRight size={16} />} style={{ alignItems: "center" }}>
        {items}
      </Breadcrumbs>
      <Group align={"center"} py={4}>
        {editable ? (
          <TextInput
            my={16}
            label={"Role Name"}
            onChange={(e) => {
              setNameLocal(e.target.value);
            }}
            value={nameLocal}
          />
        ) : (
          <h2>{name}</h2>
        )}
        {!editable ? (
          <ActionButton
            Icon={IconEdit}
            label={"Edit Role"}
            onClick={() => {
              setNameLocal(name);
              setEditable(true);
            }}
            c={"var(--mantine-color-blue-6)"}
          />
        ) : (
          <>
            <ActionButton
              Icon={IconCircleCheck}
              label={"Save Changes"}
              disabled={nameLocal == ""}
              onClick={() => {
                saveChanges();
                setEditable(false);
              }}
              c={"var(--mantine-color-green-6)"}
            />
            <ActionButton
              Icon={IconCircleX}
              label={"Cancel"}
              disabled={isAdd}
              onClick={() => {
                setUpdatedPermissions(permissions);
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
            Assign Permissions
          </Text>
        }
        disabled={!editable}
      >
        <Table.ScrollContainer minWidth={"100%"} h={"100%"}>
          <Table highlightOnHover captionSide={"bottom"} horizontalSpacing={"xl"}>
            <Table.Caption my={16} hidden={isAdd}>
              Please click on the <IconEdit color={"var(--mantine-color-blue-6)"} /> icon to update
              the permissions
            </Table.Caption>
            <Table.Thead>
              <Table.Tr>
                {columns.map((col) => (
                  <Table.Th key={col}>{col}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rows.map((row, idx) => (
                <Table.Tr key={idx}>
                  {columns.map((col) =>
                    col == "Action" ? (
                      <Table.Th key={col}>{row[col] ?? "-"}</Table.Th>
                    ) : row[col] != undefined ? (
                      <Table.Td key={row[col]}>
                        <Checkbox
                          checked={updatedPermissions.includes(row[col])}
                          onChange={(e) => {
                            let updatedPermissionsLocal = [...updatedPermissions];
                            if (!e.target.checked) {
                              updatedPermissionsLocal = [
                                ...updatedPermissions.filter(
                                  (permission) => permission !== row[col],
                                ),
                              ];
                            } else {
                              updatedPermissionsLocal.push(row[col] || "");
                            }
                            setUpdatedPermissions(updatedPermissionsLocal);
                          }}
                        />
                      </Table.Td>
                    ) : (
                      <Table.Td key={`-${idx + col}`}>-</Table.Td>
                    ),
                  )}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Fieldset>
    </Stack>
  );
};
