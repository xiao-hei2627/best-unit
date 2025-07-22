import type { ComponentChildren } from "preact";
import { getBalance } from "../../../../api";

interface ButtonProps {
  onClick?: () => void;
  color?: string;
  children: ComponentChildren;
}

export function ThemedButton({ onClick, color, children }: ButtonProps) {
  // 组件加载时直接调用
  getBalance().then((res) => console.log(res));
  return (
    <button
      style={{
        background: color || "#1890ff",
        color: "#fff",
        border: "none",
        borderRadius: 4,
        padding: "8px 16px",
        cursor: "pointer",
        fontSize: 16,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
