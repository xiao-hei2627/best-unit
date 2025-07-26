import { Theme } from "@/types";
import { getInitParams } from "@/utils/business";

export const rechargeThemes = {
  white: {
    tabBtn: (active: boolean, left: boolean) => ({
      flex: 1,
      background: active ? "#fff" : "#F7F8FA",
      color: active ? "#1890ff" : "#222",
      border: "none",
      borderRadius: left ? "8px 0 0 8px" : "0 8px 8px 0",
      fontWeight: active ? 600 : 400,
      fontSize: 16,
      height: 48,
      boxShadow: active ? "0 2px 8px 0 rgba(20,20,20,0.04)" : "none",
      outline: "none",
      cursor: "pointer",
      borderRight: left ? "1px solid #F0F1F3" : undefined,
      borderLeft: !left ? "1px solid #F0F1F3" : undefined,
      transition: "all 0.2s",
    }),
  },
  dark: {
    tabBtn: (active: boolean, left: boolean) => ({
      flex: 1,
      background: active ? "#23262F" : "#181A20",
      color: active ? "#00E8C6" : "#fff",
      border: "none",
      borderRadius: left ? "8px 0 0 8px" : "0 8px 8px 0",
      fontWeight: active ? 600 : 400,
      fontSize: 16,
      height: 48,
      boxShadow: active ? "0 2px 8px 0 rgba(20,20,20,0.10)" : "none",
      outline: "none",
      cursor: "pointer",
      borderRight: left ? "1px solid #23262F" : undefined,
      borderLeft: !left ? "1px solid #23262F" : undefined,
      transition: "all 0.2s",
    }),
  },
};

export function getRechargeTheme() {
  const theme = getInitParams<Theme>("theme");
  const whiteTheme = theme === Theme.WHITE;
  return whiteTheme ? rechargeThemes.white : rechargeThemes.dark;
}
