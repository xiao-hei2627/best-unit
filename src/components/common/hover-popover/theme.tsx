import { Theme } from "@/types";
import { getInitParams } from "@/utils/business";

export const hoverPopoverThemes = {
  white: {
    popover: {
      background: "#fff",
      color: "#222",
      boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
      border: "none",
    },
    arrow: {
      top: "#fff",
      bottom: "#fff",
      left: "#fff",
      right: "#fff",
    },
  },
  dark: {
    popover: {
      background: "#23262F",
      color: "#fff",
      boxShadow: "0 4px 16px rgba(0,0,0,0.32)",
      border: "1px solid #444C5C",
    },
    arrow: {
      top: "#23262F",
      bottom: "#23262F",
      left: "#23262F",
      right: "#23262F",
    },
  },
};

export function getHoverPopoverTheme() {
  const theme = getInitParams<Theme>("theme");
  const whiteTheme = theme === Theme.WHITE;
  return whiteTheme ? hoverPopoverThemes.white : hoverPopoverThemes.dark;
}
