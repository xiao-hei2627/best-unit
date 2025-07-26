import { Theme } from "@/types";
import { getInitParams } from "@/utils/business";

export const modalThemes = {
  white: {
    mask: "rgba(0, 0, 0, 0.45)",
    modalBg: "#fff",
    modalColor: "#222",
    modalBoxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
    closeBtn: {
      position: "absolute",
      top: "16px",
      right: "16px",
      background: "none",
      border: "none",
      fontSize: "24px",
      cursor: "pointer",
      color: "#999",
      padding: "0",
      width: "24px",
      height: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "24px",
      color: "#222",
    },
    tabBtn: (active: boolean, isFirst: boolean) => ({
      flex: 1,
      padding: "12px 16px",
      background: active ? "#1890ff" : "transparent",
      color: active ? "#fff" : "#666",
      border: "1px solid #d9d9d9",
      borderRight: isFirst ? "none" : "1px solid #d9d9d9",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: active ? "600" : "400",
      borderRadius: isFirst ? "6px 0 0 6px" : "0 6px 6px 0",
    }),
  },
  dark: {
    mask: "rgba(0, 0, 0, 0.65)",
    modalBg: "#23262F",
    modalColor: "#F5F6FA",
    modalBoxShadow: "0 6px 16px rgba(0,0,0,0.32)",
    closeBtn: {
      position: "absolute",
      top: "16px",
      right: "16px",
      background: "none",
      border: "none",
      fontSize: "24px",
      cursor: "pointer",
      color: "#B5B8BE",
      padding: "0",
      width: "24px",
      height: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "24px",
      color: "#F5F6FA",
    },
    tabBtn: (active: boolean, isFirst: boolean) => ({
      flex: 1,
      padding: "12px 16px",
      background: active ? "#00E8C6" : "transparent",
      color: active ? "#fff" : "#B5B8BE",
      border: "1px solid #444C5C",
      borderRight: isFirst ? "none" : "1px solid #444C5C",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: active ? "600" : "400",
      borderRadius: isFirst ? "6px 0 0 6px" : "0 6px 6px 0",
    }),
  },
};

export function getModalTheme() {
  const theme = getInitParams<Theme>("theme");
  const whiteTheme = theme === Theme.WHITE;
  return whiteTheme ? modalThemes.white : modalThemes.dark;
}
