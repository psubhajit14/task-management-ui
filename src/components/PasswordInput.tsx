import { PasswordInput as PInput, type PasswordInputProps } from "@mantine/core";

export const PasswordInput = ({ required, label, ...props }: PasswordInputProps) => {
  return (
    <PInput
      {...props}
      ta={"start"}
      required={required}
      label={label}
      placeholder={" "}
      size="md"
      radius="md"
    />
  );
};
