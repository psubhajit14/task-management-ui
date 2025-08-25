import {
  IconBook,
  IconBookmark,
  IconBrandPagekit,
  IconBug,
  IconCircleChevronsUp,
  IconCircleMinus,
  IconPlaystationCircle,
} from "@tabler/icons-react";

export const getIconByType = (type: string) => {
  switch (type) {
    case "STORY":
      return <IconBookmark color={"var(--mantine-color-green-5)"} />;
    case "TASK":
      return <IconBook color={"var(--mantine-color-blue-5)"} />;
    case "BUG":
      return <IconBug color={"var(--mantine-color-red-5)"} />;
    case "ENHANCEMENT":
      return <IconBrandPagekit color={"var(--mantine-color-yellow-5)"} />;
  }
};

// -------------------- Task Component -------------------- //
export const getIconByPriority = (priority: string) => {
  switch (priority) {
    case "P3":
      return <IconCircleMinus color={"var(--mantine-color-gray-5)"} />;
    case "P2":
      return <IconCircleChevronsUp color={"var(--mantine-color-orange-5)"} />;
    case "P1":
      return <IconCircleChevronsUp color={"var(--mantine-color-red-4)"} />;
    case "P0":
      return <IconPlaystationCircle color={"var(--mantine-color-red-5)"} />;
  }
};
