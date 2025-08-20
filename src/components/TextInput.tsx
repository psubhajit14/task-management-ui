import { TextInput as TInput, type TextInputProps } from "@mantine/core";

export const TextInput = ({
  required = false,
  label = "",
  type = "text",
  ...props
}: TextInputProps) => {
  return (
    <TInput
      {...props}
      ta={"start"}
      pos={"relative"}
      required={required}
      type={type}
      label={label}
      placeholder={" "}
      size="md"
      radius="md"
    />
  );
};
