import { Avatar, Popover, Stack } from "@mantine/core";
import { IconId, IconLogout } from "@tabler/icons-react";
import { profileImg } from "../constants.ts";
import { NavbarItem, type NavbarItemProps } from "./NavbarItem.tsx";
import { clearAuth } from "../api/axios.ts";

const links: NavbarItemProps[] = [
  {
    label: "My Profile",
    href: "/my-profile",
    Icon: <IconId />,
  },
  {
    label: "Logout",
    href: "/auth/login",
    Icon: <IconLogout />,
  },
];
export const ProfileAvatar = () => {
  return (
    <Popover width={214} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Avatar src={profileImg} />
      </Popover.Target>
      <Popover.Dropdown>
        <Stack>
          {links.map(({ label, href, Icon }) => (
            <NavbarItem label={label} href={href} Icon={Icon} onClick={clearAuth} />
          ))}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};
