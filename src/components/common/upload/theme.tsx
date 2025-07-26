import { Theme } from "@/types";
import { getInitParams } from "@/utils/business";

export const uploadThemes = {
  white: {
    container: {
      border: "1px dashed #E5E6EB",
      borderRadius: 8,
      background: "#FCFCFD",
      padding: 24,
      textAlign: "center",
      cursor: "pointer",
      minHeight: 120,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#999",
      fontSize: 15,
    },
    fileItem: {
      display: "flex",
      alignItems: "center",
      background: "#F7F8FA",
      borderRadius: 8,
      padding: "12px 16px",
      marginBottom: 8,
      fontSize: 15,
      color: "#222",
      justifyContent: "space-between",
    },
    removeBtn: {
      background: "#FF4D4F",
      color: "#fff",
      border: "none",
      borderRadius: 6,
      padding: "4px 14px",
      fontSize: 15,
      marginLeft: 16,
      cursor: "pointer",
    },
  },
  dark: {
    container: {
      border: "1.5px dashed #444C5C",
      borderRadius: 8,
      background: "#181A20",
      padding: 24,
      textAlign: "center",
      cursor: "pointer",
      minHeight: 120,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#999",
      fontSize: 15,
    },
    fileItem: {
      display: "flex",
      alignItems: "center",
      background: "#23262F",
      borderRadius: 8,
      padding: "12px 16px",
      marginBottom: 8,
      fontSize: 15,
      color: "#fff",
      justifyContent: "space-between",
    },
    removeBtn: {
      background: "#FF4D4F",
      color: "#fff",
      border: "none",
      borderRadius: 6,
      padding: "4px 14px",
      fontSize: 15,
      marginLeft: 16,
      cursor: "pointer",
    },
  },
};

export function getUploadTheme() {
  const theme = getInitParams<Theme>("theme");
  const whiteTheme = theme === Theme.WHITE;
  return whiteTheme ? uploadThemes.white : uploadThemes.dark;
}
