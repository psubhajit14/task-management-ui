import type { ReactNode } from "react";
import { Anchor, Group } from "@mantine/core";
import { NavLink } from "react-router";

export interface NavbarItemProps {
  label: string;
  href: string;
  Icon: ReactNode;
  EndIcon?: ReactNode;
  onClick?: () => void;
}

export const NavbarItem = ({ label, href, Icon, EndIcon, onClick }: NavbarItemProps) => {
  return (
    <Group justify="space-between" px={24} onClick={onClick}>
      <Anchor key={label} component={NavLink} to={href} underline={"never"} fw={"bold"}>
        <Group gap={24}>
          {Icon}
          <span>{label}</span>
        </Group>
      </Anchor>
      {EndIcon}
    </Group>
  );
};
