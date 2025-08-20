import { Await, useLoaderData } from "react-router";
import type { APIResult } from "../../../api/axios.ts";
import { Suspense } from "react";
import { Avatar, Box, Grid } from "@mantine/core";
import { profileImg } from "../../../constants.ts";
import { IconPencil } from "@tabler/icons-react";

export type ProfilePageProps = {
  empId: string;
  firstname: string;
  lastname: string;
  email: string;
  profileImage: string;
  role: string;
  permissions: string[];
} & APIResult;

export const ProfilePage = () => {
  const data = useLoaderData();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={data}>
        <Grid h={"100vh"} align={"stretch"}>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <Avatar src={profileImg} alt="avatar" size={400} m={"auto"} />
            <Box pos={"absolute"}>
              <IconPencil />
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 8 }}></Grid.Col>
        </Grid>
      </Await>
    </Suspense>
  );
};
