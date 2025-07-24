import type { ComponentChildren } from "preact";
import { Theme } from "../../../../types";

interface ButtonProps {
  onClick?: () => void;
  color?: string;
  children: ComponentChildren;
}

export function ThemedButton({ onClick, color, children }: ButtonProps) {
  // 优先theme，其次whiteTheme，默认白色
  const fundUnitParams = JSON.parse(
    sessionStorage.getItem("fund_unit_params") || "{}"
  );
  const whiteTheme = fundUnitParams.theme === Theme.WHITE;
  const style = whiteTheme
    ? {
        background: color || "#1890ff",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        padding: "8px 16px",
        cursor: "pointer",
        fontSize: 16,
        fontWeight: 600,
      }
    : {
        background: color || "#00E8C6",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        padding: "8px 16px",
        cursor: "pointer",
        fontSize: 16,
        fontWeight: 600,
      };
  return (
    <button style={style} onClick={onClick} type="button">
      {children}
    </button>
  );
}
