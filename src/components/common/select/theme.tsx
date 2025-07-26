import { Theme } from "@/types";
import { getInitParams } from "@/utils/business";

export const selectThemes = {
  white: {
    trigger: {
      background: "#fff",
      color: "#222",
      border: "1px solid #d9d9d9",
    },
    triggerDisabled: {
      background: "#f5f5f5",
      color: "#bfbfbf",
      border: "1px solid #f0f0f0",
    },
    triggerError: {
      background: "#fff",
      color: "#222",
      border: "1px solid #ff4d4f",
    },
    dropdown: {
      background: "#fff",
      border: "1px solid #d9d9d9",
      color: "#222",
    },
    option: (active: boolean, optDisabled: boolean, hovered: boolean) => ({
      color: optDisabled ? "#bfbfbf" : active ? "#1890ff" : "#222",
      background: active
        ? "#e6f7ff"
        : hovered && !optDisabled
        ? "#f5f5f5"
        : optDisabled
        ? "#f5f5f5"
        : "#fff",
    }),
    placeholder: { color: "#bfbfbf" },
    scrollbarThumb: "#e5e5e5",
    scrollbarTrack: "#f5f5f5",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  dark: {
    trigger: {
      background: "#23262F",
      color: "#fff",
      border: "1px solid #23262F",
    },
    triggerDisabled: {
      background: "#23262F",
      color: "#666",
      border: "1px solid #23262F",
    },
    triggerError: {
      background: "#23262F",
      color: "#fff",
      border: "1px solid #ff4d4f",
    },
    dropdown: {
      background: "#23262F",
      border: "1px solid #23262F",
      color: "#fff",
    },
    option: (active: boolean, optDisabled: boolean, hovered: boolean) => ({
      color: optDisabled ? "#666" : active ? "#00E8C6" : "#fff",
      background: active
        ? "#23262F"
        : hovered && !optDisabled
        ? "#333843"
        : optDisabled
        ? "#23262F"
        : "#23262F",
    }),
    placeholder: { color: "#666" },
    scrollbarThumb: "#444C5C",
    scrollbarTrack: "#23262F",
    boxShadow: "0 2px 8px rgba(0,0,0,0.32)",
  },
};

export function getSelectTheme() {
  const theme = getInitParams<Theme>("theme");
  const whiteTheme = theme === Theme.WHITE;
  return whiteTheme ? selectThemes.white : selectThemes.dark;
}
