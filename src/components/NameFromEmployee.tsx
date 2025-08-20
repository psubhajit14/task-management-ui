import { type EmployeeResponse, profileImg } from "../constants.ts";
import { Avatar, Group, Text } from "@mantine/core";

export const NameFromEmployee = (employee: EmployeeResponse) => {
  return (
    <Group>
      <Avatar src={profileImg} />
      <Text>{employee.email}</Text>
    </Group>
  );
};
