import { MultiSelect as MSInput, type MultiSelectProps } from "@mantine/core";
import { useRef } from "react";

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
