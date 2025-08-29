import {
  type ComboboxItem,
  type ComboboxLikeRenderOptionInput,
  MultiSelect as MSInput,
  type MultiSelectProps,
  Text,
} from "@mantine/core";
import { useRef } from "react";
import type { EmployeeResponse } from "../types.ts";

export const MultiSelectInput = ({
  required = false,
  label = "",
  type = "text",
  placeholder,
  ...props
}: MultiSelectProps) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <MSInput
      renderOption={(option: ComboboxLikeRenderOptionInput<ComboboxItem>) => {
        const employee = option.option as EmployeeResponse & ComboboxItem;
        return <Text>{employee.employeeId}</Text>;
      }}
      ref={ref}
      ta={"start"}
      pos={"relative"}
      required={required}
      type={type}
      label={label}
      placeholder={placeholder}
      size="md"
      radius="md"
      {...props}
    />
  );
};
