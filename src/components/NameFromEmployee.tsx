import { type EmployeeResponse, profileImg } from "../constants.ts";
import { Avatar, Group, Text, type TextProps } from "@mantine/core";

export const NameFromEmployee = ({
  email,
  firstName,
  lastName,
  withImage = true,
  fullNameOnly = false,
  role,
  employeeId,
  ...props
}: EmployeeResponse & {
  withImage?: boolean;
  fullNameOnly?: boolean;
} & TextProps) => {
  return (
    <Group role={role.name}>
      {withImage && <Avatar src={profileImg} />}
      {fullNameOnly ? (
        <Text {...props} key={employeeId}>
          {firstName + " " + lastName}
        </Text>
      ) : (
        <Text {...props}>{email}</Text>
      )}
    </Group>
  );
};
