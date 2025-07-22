import type { ComponentChildren } from "preact";

interface ButtonProps {
  onClick?: () => void;
  color?: string;
  children: ComponentChildren;
}

export function ThemedButton({ onClick, color, children }: ButtonProps) {
  // 组件加载时直接调用
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
