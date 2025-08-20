import { Anchor, Group } from "@mantine/core";
import { IconClearAll, IconListDetails, IconManualGearbox, IconUsers } from "@tabler/icons-react";
import { ThemeSwitch } from "../ThemeSwitch.tsx";
import { ProfileAvatar } from "../ProfileAvatar.tsx";
import type { NavbarItemProps } from "../NavbarItem.tsx";
import { NavLink } from "react-router";

const hrefs: NavbarItemProps[] = [
  { Icon: <IconListDetails />, label: "Projects", href: "projects" },
  { Icon: <IconClearAll />, label: "Board", href: "board" },
  { Icon: <IconManualGearbox />, label: "Roles", href: "roles" },
  { Icon: <IconUsers />, label: "Employees", href: "employees" },
];
export const DesktopNavbar = () => {
  return (
    <Group>
      {hrefs.map((href) => (
        <Anchor
          key={href.label}
          component={NavLink}
          to={href.href}
          underline={"never"}
          fw={"bold"}
          px={18}
        >
          <span>{href.label}</span>
        </Anchor>
      ))}
      <ThemeSwitch />
      <ProfileAvatar />
    </Group>
  );
};
