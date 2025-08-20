import { apiHandler } from "./axios.ts";
import type { ProfilePageProps } from "../features/profile/pages/ProfilePage.tsx";

export const profileLoader = async () => {
  return await apiHandler<ProfilePageProps>("/auth/my-profile", {
    method: "GET",
  });
};
