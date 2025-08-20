import { Anchor, Button, Checkbox, Stack, Text, Title } from "@mantine/core";
import { Form, NavLink, useActionData, useNavigate, useNavigation } from "react-router";
import { TextInput } from "../../../components/TextInput.tsx";
import { PasswordInput } from "../../../components/PasswordInput.tsx";
import { useEffect } from "react";
import { ROUTES } from "../../../constants.ts";

const landingPage = "/" + ROUTES.USERS + "/" + ROUTES.MY_PROFILE;
export const Register = () => {
  const navigate = useNavigate();
  const { errors, success: isLoggedIn } = useActionData() ?? {};
  const { state } = useNavigation();
  useEffect(() => {
    if (isLoggedIn) navigate(landingPage);
  }, [isLoggedIn, navigate]);
  return (
    <>
      <Title order={1}>Get Started with Boardly!</Title>
      <Text c={"dimmed"} mb={48}>
        Create your account to manage tasks effortlessly and boost your productivity.
      </Text>
      <Form action={"/auth/register"} method={"POST"}>
        <Stack>
          <TextInput
            required
            label="First Name"
            name={"firstname"}
            error={errors && errors.firstname}
          />
          <TextInput
            required
            label="Last Name"
            name={"lastname"}
            error={errors && errors.lastname}
          />
          <TextInput
            required
            label="Email address"
            type={"email"}
            name={"email"}
            error={errors && errors.email}
          />
          <PasswordInput
            required
            label="Password"
            name={"password"}
            error={errors && errors.password}
          />
          <PasswordInput
            required
            label="Confirm Password"
            name={"confirmPassword"}
            error={errors && errors.confirmPassword}
          />
          <TextInput
            required
            label="Profile Picture URL"
            name={"profilePictureURL"}
            error={errors && errors.profilePictureURL}
          />
          <Checkbox
            ta={"start"}
            label={<TnC />}
            size="md"
            name={"tnc"}
            error={errors && errors.tnc}
          />
          <Button
            fullWidth
            mt="sm"
            size="md"
            radius="md"
            type={"submit"}
            variant={"light"}
            loaderProps={{ type: "dots" }}
            loading={state == "submitting"}
          >
            Sign Up
          </Button>
        </Stack>
      </Form>
      <Text ta="center">
        Already have an account?{" "}
        <Anchor component={NavLink} to={"/auth/login"} fw={500}>
          Login
        </Anchor>
      </Text>
    </>
  );
};
const TnC = () => {
  return (
    <span>
      Please Accept the{" "}
      <Anchor component={NavLink} to={"/"}>
        terms and conditions
      </Anchor>{" "}
      to register in this portal.
    </span>
  );
};
