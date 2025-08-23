import { Select as SInput, type SelectProps } from "@mantine/core";

export const SelectInput = ({
  required = false,
  label = "",
  type = "text",
  ...props
}: SelectProps) => {
  return (
    <SInput
      ta={"start"}
      pos={"relative"}
      required={required}
      type={type}
      label={label}
      placeholder={" "}
      size="md"
      radius="md"
      {...props}
    />
  );
};
