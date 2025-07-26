import { Theme } from "@/types";
import { getInitParams } from "@/utils/business";

export const messageThemes = {
  white: {
    background: "#fff",
    border: "#d9d9d9",
    color: "#222",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
    closeColor: "#999",
  },
  dark: {
    background: "#23262F",
    border: "#444C5C",
    color: "#F5F6FA",
    boxShadow: "0 6px 16px rgba(0,0,0,0.32)",
    closeColor: "#B5B8BE",
  },
};

export function getMessageTheme() {
  const theme = getInitParams<Theme>("theme");
  const whiteTheme = theme === Theme.WHITE;
  return whiteTheme ? messageThemes.white : messageThemes.dark;
}
