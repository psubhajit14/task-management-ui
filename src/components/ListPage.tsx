import { type SortableField, SortButton } from "./SortButton.tsx";
import {
  Anchor,
  Button,
  Code,
  Group,
  Pagination,
  Stack,
  Table,
  type TableData,
  Text,
} from "@mantine/core";
import { NavLink, useLoaderData, useNavigate, useSearchParams } from "react-router";
import type { Page, QueryParamProps } from "../constants.ts";
import { useState } from "react";
import { useDebouncedCallback } from "@mantine/hooks";
import { TextInput } from "./TextInput.tsx";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { ActionButton } from "./ActionButton.tsx";

export const ListPage = <T,>({
  title,
  fields,
  generateTableData,
}: {
  title: string;
  fields: SortableField[];
  generateTableData: (args: {
    content: T[];
    value: string;
    setValue: (val: string) => void;
  }) => TableData;
}) => {
  const { content, empty, numberOfElements, totalElements, totalPages, size, pageable } =
    useLoaderData() as Page<T>;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("query") ?? "";
  const footerMsg = empty
    ? "No result found"
    : `Showing ${size * pageable.pageNumber + 1} to ${size * pageable.pageNumber + numberOfElements} out
                    of ${totalElements} items`;
  const [selected, setSelected] = useState<string>("");
  const tableData: TableData = generateTableData({
    content: content,
    value: selected,
    setValue: setSelected,
  });
  const handlePageChange = useDebouncedCallback(
    ({ page = 1, sortBy, direction, query }: QueryParamProps) => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("page", page.toString());
      if (sortBy != undefined) newParams.set("sortBy", sortBy);
      if (direction != undefined) newParams.set("direction", direction);
      if (query != undefined) newParams.set("query", query);
      setSearchParams(newParams);
      setSelected("");
    },
    700,
  );
  return (
    <Stack gap={2} my={16}>
      {/*List header with action button*/}
      <Group justify={"space-between"} gap={0}>
        <h2>{title}s</h2>
        <Group display={selected ? "none" : "flex"}>
          <TextInput
            name={"search"}
            label={"Search..."}
            defaultValue={query}
            onChange={(e) => handlePageChange({ query: e.target.value })}
          />

          <SortButton onItemClick={handlePageChange} fields={fields} />
          <Anchor component={NavLink} to={"add"}>
            <Button variant="contained" c="primary">
              <IconPlus /> Add {title}
            </Button>
          </Anchor>
        </Group>
        <Group display={selected ? "flex" : "none"}>
          <ActionButton
            Icon={IconEdit}
            label={"Edit"}
            onClick={() => navigate(`edit/${selected}`)}
            c={"var(--mantine-color-blue-8"}
          />
          <ActionButton
            Icon={IconTrash}
            label={"Delete"}
            onClick={() => {}}
            c={"var(--mantine-color-red-8)"}
          />
        </Group>
      </Group>
      {/*Table content*/}
      <Table.ScrollContainer minWidth={1000} maxHeight={600} mih={500}>
        <Table stickyHeader data={tableData} withTableBorder highlightOnHover captionSide={"top"} />
      </Table.ScrollContainer>
      {/*Footer*/}
      <Group justify={"space-between"}>
        <Text c={"dimmed"}>{footerMsg}</Text>
        <Text>
          Select any row by clicking on the at the left checkbox to <Code>Edit</Code> or{" "}
          <Code>Delete</Code>
        </Text>
        <Pagination
          total={totalPages}
          value={pageable.pageNumber + 1}
          onChange={(value) => handlePageChange({ page: value })}
          mt="sm"
        />
      </Group>
    </Stack>
  );
};
