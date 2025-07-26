import { Theme } from "@/types";
import { getInitParams } from "@/utils/business";

export const onlineRechargeFormThemes = {
  white: {
    label: {
      marginBottom: 8,
      fontSize: 14,
      color: "#222",
      textAlign: "left",
      display: "block",
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: 6,
      boxSizing: "border-box",
      border: "1px solid #E5E6EB",
      background: "#fff",
      color: "#222",
      fontSize: 15,
      outline: "none",
      marginBottom: 0,
    },
    inputError: {
      border: "1px solid #ff4d4f",
    },
    selectError: {
      border: "1px solid #ff4d4f",
    },
    error: {
      color: "#ff4d4f",
      fontSize: 13,
      marginTop: 4,
      textAlign: "left",
    },
    buttonCancel: {
      background: "#fff",
      color: "#222",
      border: "1px solid #E5E6EB",
      borderRadius: 6,
      padding: "8px 24px",
      fontSize: 15,
      cursor: "pointer",
    },
    buttonSubmit: {
      background: "#1890ff",
      color: "#fff",
      border: "none",
      borderRadius: 6,
      padding: "8px 24px",
      fontSize: 15,
      cursor: "pointer",
      fontWeight: 600,
    },
    feeTip: {
      marginBottom: 24,
      padding: "12px 16px",
      background: "#f6ffed",
      border: "1px solid #b7eb8f",
      borderRadius: 6,
      fontSize: 14,
      color: "#52c41a",
    },
  },
  dark: {
    label: {
      marginBottom: 8,
      fontSize: 14,
      color: "#fff",
      textAlign: "left",
      display: "block",
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: 6,
      boxSizing: "border-box",
      border: "1px solid #23262F",
      background: "#23262F",
      color: "#fff",
      fontSize: 15,
      outline: "none",
      marginBottom: 0,
    },
    inputError: {
      border: "1px solid #ff4d4f",
    },
    selectError: {
      border: "1px solid #ff4d4f",
    },
    error: {
      color: "#ff4d4f",
      fontSize: 13,
      marginTop: 4,
      textAlign: "left",
    },
    buttonCancel: {
      background: "#23262F",
      color: "#fff",
      border: "none",
      borderRadius: 6,
      padding: "8px 24px",
      fontSize: 15,
      cursor: "pointer",
    },
    buttonSubmit: {
      background: "#00E8C6",
      color: "#fff",
      border: "none",
      borderRadius: 6,
      padding: "8px 24px",
      fontSize: 15,
      cursor: "pointer",
      fontWeight: 600,
    },
    feeTip: {
      marginBottom: 24,
      padding: "12px 16px",
      background: "#1a1a1a",
      border: "1px solid #333",
      borderRadius: 6,
      fontSize: 14,
      color: "#52c41a",
    },
  },
};

export function getOnlineRechargeFormTheme() {
  const theme = getInitParams<Theme>("theme");
  const whiteTheme = theme === Theme.WHITE;
  return whiteTheme
    ? onlineRechargeFormThemes.white
    : onlineRechargeFormThemes.dark;
}
