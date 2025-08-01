import { useState } from "preact/hooks";
import register from "preact-custom-element";
import { getRefreshButtonTheme, getRefreshButtonSizeStyles } from "./theme";
import { refreshBalance } from "@/utils/business";
import { Button } from "@/components/common/button";

interface RefreshButtonProps {
  color?: string;
  size?: "small" | "medium" | "large";
  children?: any; // slot 内容
}

function RefreshButton({
  color,
  size = "medium",
  children,
}: RefreshButtonProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const theme = getRefreshButtonTheme(color);
  const sizeStyles = getRefreshButtonSizeStyles(size);

  const buttonStyle = {
    ...theme,
    ...sizeStyles,
    display: "flex",
    alignItems: "center",
  };

  // 内联 CSS 动画定义
  const spinAnimation = `
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    
    .refresh-icon {
      transform-origin: center;
      will-change: transform;
    }
    
    /* 隐藏 fallback content */
    :host {
      display: inline-block;
    }
  `;

  const handleClick = async () => {
    setIsSpinning(true);
    try {
      // 触发刷新事件
      refreshBalance();
      // 确保动画至少显示一段时间，给用户视觉反馈
      await new Promise((resolve) => setTimeout(resolve, 300));
    } finally {
      setIsSpinning(false);
    }
  };

  return (
    <>
      {/* 注入 CSS 动画 */}
      <style>{spinAnimation}</style>

      <Button onClick={handleClick} color={color}>
        <div style={buttonStyle}>
          <svg
            className="refresh-icon"
            width={size === "small" ? "14" : size === "large" ? "24" : "18"}
            height={size === "small" ? "14" : size === "large" ? "24" : "18"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              animation: isSpinning ? "spin 0.6s linear infinite" : "none",
              transition: "all 0.2s ease",
            }}
          >
            <path d="M21 2v6h-6"></path>
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
            <path d="M3 22v-6h6"></path>
            <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
          </svg>
          {children && <span>{children}</span>}
        </div>
      </Button>
    </>
  );
}

register(RefreshButton, "best-refresh-button", [], { shadow: true });

export default RefreshButton;
