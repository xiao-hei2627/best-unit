import { Theme } from "@/types";
import { getInitParams } from "@/utils/business";

export const buttonThemes = {
  white: {
    background: "#1890ff",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 600,
  },
  dark: {
    background: "#00E8C6",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 600,
  },
};

export function getButtonTheme(color?: string) {
  const theme = getInitParams<Theme>("theme");
  const whiteTheme = theme === Theme.WHITE;
  return whiteTheme
    ? {
        ...buttonThemes.white,
        background: color || buttonThemes.white.background,
      }
    : {
        ...buttonThemes.dark,
        background: color || buttonThemes.dark.background,
      };
}
