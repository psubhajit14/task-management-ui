import { Anchor, Button, Checkbox, Stack, Text, Title } from "@mantine/core";
import {
  Form,
  NavLink,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router";
import { TextInput } from "../../../components/TextInput.tsx";
import { PasswordInput } from "../../../components/PasswordInput.tsx";
import { ROUTES } from "../../../constants.ts";
import { useEffect } from "react";

const landingPage = "/" + ROUTES.USERS + "/" + ROUTES.MY_PROFILE;
export const Login = () => {
  const navigate = useNavigate();
  const { errors, success: isLoggedIn } = useActionData() ?? {};
  const { email, password } = useLoaderData();
  const { state } = useNavigation();
  useEffect(() => {
    if (isLoggedIn) navigate(landingPage);
  }, [isLoggedIn, navigate]);
  return (
    <>
      <Title order={1}>Login to Boardly</Title>
      <Text c={"dimmed"} mb={48}>
        Use your credentials to access your tasks and projects
      </Text>
      <Form method={"POST"}>
        <Stack>
          <TextInput
            required
            type={"email"}
            label={"Email"}
            name={"email"}
            defaultValue={email}
            error={errors && errors.email}
          />
          <PasswordInput
            required
            label={"Password"}
            name={"password"}
            defaultValue={password}
            error={errors && errors.password}
          />
          <Checkbox ta={"start"} label="Keep me logged in" name={"remember"} size="md" />
          <Button
            fullWidth
            mt="xl"
            size="md"
            radius="md"
            type={"submit"}
            loaderProps={{ type: "dots" }}
            loading={state == "submitting"}
          >
            Login
          </Button>
        </Stack>
      </Form>
      <Text ta="center">
        Don&apos;t have an account?{" "}
        <Anchor component={NavLink} to={"/auth/register"} fw={500}>
          Register
        </Anchor>
      </Text>
    </>
  );
};
