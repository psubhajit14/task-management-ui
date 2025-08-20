import { Stack } from "@mantine/core";
import {
  IconClearAll,
  IconListDetails,
  IconLogout,
  IconManualGearbox,
  IconUsers,
} from "@tabler/icons-react";
import { ThemeSwitch } from "../ThemeSwitch.tsx";
import { NavbarItem, type NavbarItemProps } from "../NavbarItem.tsx";

const hrefs: NavbarItemProps[] = [
  { Icon: <IconListDetails />, label: "Projects", href: "projects" },
  { Icon: <IconClearAll />, label: "Board", href: "board" },
  { Icon: <IconManualGearbox />, label: "Roles", href: "roles" },
  { Icon: <IconUsers />, label: "Employees", href: "employees" },
];
const logoutLink: NavbarItemProps = {
  Icon: <IconLogout />,
  label: "Logout",
  href: "/logout",
  EndIcon: <ThemeSwitch />,
};

export const MobileNavbar = ({ toggle }: { toggle: () => void }) => {
  return (
    <Stack justify={"space-between"} h={"100vh"} pt={20}>
      <Stack gap={36}>
        {hrefs.map(({ label, href, Icon }) => (
          <NavbarItem key={href} label={label} href={href} Icon={Icon} onClick={toggle} />
        ))}
      </Stack>
      <Stack gap={36}>
        <NavbarItem
          onClick={toggle}
          label={logoutLink.label}
          href={logoutLink.href}
          Icon={logoutLink.Icon}
          EndIcon={logoutLink.EndIcon}
        />
      </Stack>
    </Stack>
  );
};
