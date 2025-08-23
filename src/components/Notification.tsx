import { showNotification } from "@mantine/notifications";
import type { ReactNode } from "react";
import { IconCheck, IconInfoTriangleFilled, IconX } from "@tabler/icons-react";

export interface NotifyProps {
  message: string | ReactNode;
  title: string;
  variant?: "success" | "warning" | "danger" | "info";
}

export const notify = ({ title, message, variant = "info" }: NotifyProps) => {
  let color: string;
  let icon: ReactNode | null;
  switch (variant) {
    case "success":
      color = "green";
      icon = <IconCheck fill={color} />;
      break;
    case "warning":
      color = "yellow";
      icon = <IconInfoTriangleFilled fill={color} />;
      break;
    case "danger":
      color = "red";
      icon = <IconX fill={color} />;
      break;
    default:
      color = "blue";
      icon = null;
  }
  showNotification({
    style: {
      top: 20,
      maxWidth: 1000,
      minWidth: 400,
      marginInline: "auto",
      zIndex: 99,
    },
    withBorder: true,
    title,
    message,
    color,
    icon,
  });
};
