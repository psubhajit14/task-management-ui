import { Burger, Group } from "@mantine/core";
import { ProfileAvatar } from "../ProfileAvatar.tsx";
import { Logo } from "../Logo.tsx";

export const MobileHeader = ({
  opened = false,
  toggle = () => {},
}: {
  opened: boolean;
  toggle: () => void;
}) => {
  return (
    <>
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      <Group justify="space-between" style={{ flex: 1 }} hiddenFrom="sm">
        <Group gap={0}>
          <Logo size={"xxs"} />
          <h1>Boardly</h1>
        </Group>
        <ProfileAvatar />
      </Group>
    </>
  );
};
