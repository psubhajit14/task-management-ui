import { Outlet } from "react-router";
import { Box, Center, Grid, Stack } from "@mantine/core";
import { Logo } from "../components/Logo.tsx";

export function AuthLayout() {
  return (
    <Grid h={"100vh"} w={"100vw"}>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }} h={"100vh"}>
        <Stack flex={2} p={64} justify={"center"} ta={"center"}>
          <Center>
            <Logo />
          </Center>
          <Outlet />
        </Stack>
      </Grid.Col>
      <Grid.Col span={{ base: 6, lg: 8 }} visibleFrom="md">
        <Box h={"100vh"} w={"100%"} bg={"blue"}></Box>
      </Grid.Col>
    </Grid>
  );
}
