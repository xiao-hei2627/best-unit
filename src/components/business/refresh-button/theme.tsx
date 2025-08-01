import { Theme } from "@/types";
import { getInitParams } from "@/utils/business";

export const refreshButtonThemes = {
  white: {
    background: "#1890ff",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
    transition: "all 0.2s ease",
  },
  dark: {
    background: "#00E8C6",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
    transition: "all 0.2s ease",
  },
};

export function getRefreshButtonTheme(color?: string) {
  const theme = getInitParams<Theme>("theme");
  const whiteTheme = theme === Theme.WHITE;

  return whiteTheme
    ? {
        ...refreshButtonThemes.white,
        background: color || refreshButtonThemes.white.background,
      }
    : {
        ...refreshButtonThemes.dark,
        background: color || refreshButtonThemes.dark.background,
      };
}

export function getRefreshButtonSizeStyles(size: "small" | "medium" | "large") {
  switch (size) {
    case "small":
      return {
        fontSize: "12px",
        gap: "2px",
      };
    case "large":
      return {
        fontSize: "18px",
        gap: "6px",
      };
    default:
      return {
        fontSize: "14px",
        gap: "4px",
      };
  }
}
