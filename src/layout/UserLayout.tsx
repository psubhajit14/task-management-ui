import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Outlet } from "react-router";
import { AppShell, Group, useComputedColorScheme } from "@mantine/core";
import { MobileNavbar } from "../components/navbar/MobileNavbar.tsx";
import { MobileHeader } from "../components/header/MobileHeader.tsx";
import { DesktopHeader } from "../components/header/DesktopHeader.tsx";
import { DebugLogger } from "../components/DebugLogger.tsx";

export const UserLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isDark = useComputedColorScheme();
  console.log(isDark);
  return (
    <AppShell
      header={{ height: 90 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: {
          desktop: true,
          mobile: !opened,
        },
      }}
      padding="md"
    >
      <AppShell.Header
        zIndex={99}
        {...(isDark == "light" && {
          bg: "linear-gradient(to left, #ffffff, #f0f0ff)",
        })}
      >
        <Group h="100%" px="md">
          {/*Mobile header*/}
          <MobileHeader opened={opened} toggle={toggle} />
          {/*Desktop header*/}
          <DesktopHeader />
        </Group>
      </AppShell.Header>
      {/*Mobile navbar if screen size sm*/}
      <AppShell.Navbar py="md" px={4}>
        <MobileNavbar toggle={toggle} />
      </AppShell.Navbar>
      {/*Actual Content of the URL*/}
      <AppShell.Main px={isMobile ? 24 : 36} w={"100vw"}>
        <DebugLogger />
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
