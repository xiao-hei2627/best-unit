import type { ComponentChildren } from "preact";
import { getBalance } from "../../../../api";

interface ButtonProps {
  onClick?: () => void;
  color?: string;
  children: ComponentChildren;
  merchantId?: string;
  bizType?: string;
  token?: string;
}

export function ThemedButton({
  onClick,
  color,
  children,
  merchantId,
  bizType,
  token,
}: ButtonProps) {
  // 组件加载时直接调用
  if (merchantId && bizType) {
    getBalance({ merchant_id: merchantId, biz_type: bizType, token }).then(
      (res) => console.log(res)
    );
  }
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
