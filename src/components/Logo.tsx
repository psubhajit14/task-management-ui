import { useMantineColorScheme, useMantineTheme } from "@mantine/core";

export const Logo = ({ size = "md" }: { size: "xxs" | "xs" | "sm" | "md" }) => {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const blue = theme.colors.blue[6]; // #228be6 approx
  const cardFill = colorScheme === "dark" ? "#071126" : "#fff";
  const cardStroke = colorScheme === "dark" ? "#fff" : "rgba(11,37,64,0.06)";
  const lightBlue = "#E9F5FF";
  let multiplier = 1.0;
  switch (size) {
    case "xxs":
      multiplier = 0.35;
      break;
    case "xs":
      multiplier = 0.5;
      break;
    case "sm":
      multiplier = 0.75;
      break;
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 150"
      width={200 * multiplier}
      height={150 * multiplier}
      aria-labelledby="title desc"
    >
      <g transform="translate(36 24)" aria-hidden="true">
        <rect y="28" width="96" height="64" rx="8" fill={blue} />
        <rect
          x="8"
          y="14"
          width="96"
          height="64"
          rx="8"
          fill={cardFill}
          stroke={cardStroke}
          strokeWidth="2"
        />
        <rect
          x="16"
          width="96"
          height="64"
          rx="8"
          fill={cardFill}
          stroke={cardStroke}
          strokeWidth="2"
        />
        <rect x="28" y="14" width="48" height="6" rx="3" fill={lightBlue} />
        <rect x="28" y="28" width="28" height="6" rx="3" fill={lightBlue} />
        <circle cx="92" cy="8" r="12" fill={blue} />
        <path
          d="m87 7.5 3.5 3.8 7.5-7"
          stroke="#fff"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
