import {
  type ComboboxItem,
  type ComboboxLikeRenderOptionInput,
  Select as SInput,
  type SelectProps,
  Text,
} from "@mantine/core";
import type { EmployeeResponse } from "../types.ts";

const EmployeeRenderOptions = (option: ComboboxLikeRenderOptionInput<ComboboxItem>) => {
  const employee = option.option as EmployeeResponse & ComboboxItem;
  return <Text>{employee.employeeId}</Text>;
};
export const SelectInput = ({
  required = false,
  label = "",
  type = "text",
  variant,
  data,
  ...props
}: SelectProps & { variant?: "employee" | "priority" | "taskType" | "status" }) => {
  let renderOption;
  switch (variant) {
    case "employee":
      renderOption = EmployeeRenderOptions;
      break;
  }
  let options;
  switch (variant) {
    case "employee":
      options =
        (data as unknown as EmployeeResponse[]).map((employee: EmployeeResponse) => ({
          label: employee.firstName + " " + employee.lastName,
          value: employee.employeeId,
          ...employee,
        })) ?? [];
      break;
    default:
      options = data;
      break;
  }
  return (
    <SInput
      renderOption={renderOption}
      ta={"start"}
      pos={"relative"}
      required={required}
      type={type}
      label={label}
      placeholder={" "}
      size="md"
      radius="md"
      data={variant != undefined ? options : data}
      {...props}
    />
  );
};
