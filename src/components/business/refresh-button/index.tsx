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
  const theme = getRefreshButtonTheme(color);
  const sizeStyles = getRefreshButtonSizeStyles(size);

  const buttonStyle = {
    ...theme,
    ...sizeStyles,
    display: "flex",
    alignItems: "center",
  };

  return (
    <Button onClick={() => refreshBalance()} color={color}>
      <div style={buttonStyle}>
        <svg
          width={size === "small" ? "14" : size === "large" ? "24" : "18"}
          height={size === "small" ? "14" : size === "large" ? "24" : "18"}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            animation: "spin 1s linear infinite",
            animationPlayState: "paused",
          }}
          onMouseEnter={(e: any) => {
            e.currentTarget.style.animationPlayState = "running";
          }}
          onMouseLeave={(e: any) => {
            e.currentTarget.style.animationPlayState = "paused";
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
  );
}

register(RefreshButton, "best-refresh-button");

export default RefreshButton;
