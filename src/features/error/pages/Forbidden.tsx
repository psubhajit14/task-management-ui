import { Box, Button, Group, Text, Title } from "@mantine/core";
import { NavLink, useNavigate } from "react-router";

export const Forbidden = () => {
  const navigate = useNavigate();
  return (
    <Box ta={"center"} p={"10%"} mx={"auto"} h={"100vh"} w={"100vw"}>
      <Title order={1} size="8rem" fw={900} c={"red"}>
        403
      </Title>
      <Text size="lg" mt="md" c="dimmed" w={500} m={"auto"} fw={"bold"}>
        Oops! You are not authorized to access the page. please check the URL and try again. Or
        contact the ADMIN to get access.
      </Text>
      <Group justify="center" mt="8rem">
        <Button
          component={NavLink}
          to=""
          onClick={() => {
            navigate(-1);
          }}
          variant="filled"
          size="md"
          color="red"
        >
          Go back
        </Button>
      </Group>
    </Box>
  );
};
