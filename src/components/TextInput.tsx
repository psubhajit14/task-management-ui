import { TextInput as TInput, type TextInputProps } from "@mantine/core";

export const TextInput = ({
  required = false,
  label = "",
  type = "text",
  ref,
  ...props
}: TextInputProps & { ref?: React.Ref<HTMLInputElement> | undefined }) => {
  return (
    <TInput
      ref={ref}
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
