import { Logo } from "../Logo.tsx";
import { DesktopNavbar } from "../navbar/DesktopNavbar.tsx";
import { Group } from "@mantine/core";

export const DesktopHeader = () => {
  return (
    <Group justify="space-between" style={{ flex: 1 }} visibleFrom={"sm"}>
      <Group>
        <Logo size={"xxs"} />
        <h1>Boardly</h1>
      </Group>
      <DesktopNavbar />
    </Group>
  );
};
