import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export const ThemeSwitch = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const isDark = computedColorScheme !== "light";
  return (
    <ActionIcon
      onClick={() => setColorScheme(!isDark ? "dark" : "light")}
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      <IconSun width={22} height={22} display={isDark ? "none" : "block"} stroke={1.5} />
      <IconMoon width={22} height={22} display={isDark ? "block" : "none"} stroke={1.5} />
    </ActionIcon>
  );
};
