import { Theme } from "@/types";
import { getInitParams } from "@/utils/business";

export const statisticalBalanceThemes = {
  white: {
    popoverTitle: {
      fontSize: 16,
      fontWeight: 600,
      color: "#222",
      marginBottom: 16,
      textAlign: "center",
    },
    detailRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 0",
      borderBottom: "1px solid #e5e7eb",
      fontSize: 15,
    },
    detailLabel: {
      display: "flex",
      alignItems: "center",
      color: "#6b7280",
      fontWeight: 500,
    },
    detailDot: (color: string) => ({
      display: "inline-block",
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: color,
      marginRight: 8,
    }),
    detailValue: (color: string) => ({
      color,
      fontWeight: 600,
      fontSize: 15,
    }),
    main: {
      fontSize: 24,
      fontWeight: 800,
      color: "#111827",
      display: "inline-block",
    },
    currency: {
      fontSize: 18,
      color: "#6b7280",
      marginLeft: 8,
      fontWeight: 600,
    },
  },
  dark: {
    popoverTitle: {
      fontSize: 16,
      fontWeight: 600,
      color: "#fff",
      marginBottom: 16,
      textAlign: "center",
    },
    detailRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 0",
      borderBottom: "1px solid #23262F",
      fontSize: 15,
    },
    detailLabel: {
      display: "flex",
      alignItems: "center",
      color: "#B5B8BE",
      fontWeight: 500,
    },
    detailDot: (color: string) => ({
      display: "inline-block",
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: color,
      marginRight: 8,
    }),
    detailValue: (color: string) => ({
      color,
      fontWeight: 600,
      fontSize: 15,
    }),
    main: {
      fontSize: 24,
      fontWeight: 800,
      color: "#fff",
      display: "inline-block",
    },
    currency: {
      fontSize: 18,
      color: "#B5B8BE",
      marginLeft: 8,
      fontWeight: 600,
    },
  },
};

export function getStatisticalBalanceTheme() {
  const theme = getInitParams<Theme>("theme");
  const whiteTheme = theme === Theme.WHITE;
  return whiteTheme
    ? statisticalBalanceThemes.white
    : statisticalBalanceThemes.dark;
}
