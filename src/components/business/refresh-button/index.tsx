import { t } from "@/local";
import register from "preact-custom-element";
import { getRefreshButtonTheme, getRefreshButtonSizeStyles } from "./theme";
import { refreshBalance } from "@/utils/business";

interface RefreshButtonProps {
  color?: string;
  size?: "small" | "medium" | "large";
  showText?: boolean;
}

function RefreshButton({
  color,
  size = "medium",
  showText = true,
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
    <button
      style={buttonStyle}
      onClick={() => refreshBalance()}
      type="button"
      title={t("刷新余额")}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = "0.8";
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "1";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <svg
        width={size === "small" ? "12" : size === "large" ? "20" : "16"}
        height={size === "small" ? "12" : size === "large" ? "20" : "16"}
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
        onMouseEnter={(e) => {
          e.currentTarget.style.animationPlayState = "running";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.animationPlayState = "paused";
        }}
      >
        <path d="M21 2v6h-6"></path>
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
        <path d="M3 22v-6h6"></path>
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
      </svg>
      {showText && <span>{t("刷新")}</span>}
    </button>
  );
}

register(RefreshButton, "best-refresh-button");

export default RefreshButton;
