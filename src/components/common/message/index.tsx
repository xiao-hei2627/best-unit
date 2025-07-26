import type { FunctionalComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import { getMessageTheme } from "./theme";

export type MessageType = "success" | "error" | "warning" | "info";

interface MessageProps {
  type: MessageType;
  content: string;
  duration?: number;
  onClose?: () => void;
  closable?: boolean;
}

const MessageItem: FunctionalComponent<MessageProps> = ({
  type,
  content,
  duration = 3000,
  onClose,
  closable = false,
}) => {
  const [visible, setVisible] = useState(true);
  const theme = getMessageTheme();

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => onClose?.(), 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "error":
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="8" fill="#ff4d4f" />
            <path
              d="M10.5 5.5l-5 5m0-5l5 5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        );
      case "success":
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="8" fill="#52c41a" />
            <path
              d="M5 8.5l2.2 2.2 3.8-3.4"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        );
      case "warning":
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="8" fill="#faad14" />
            <path
              d="M8 4.5v5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="8" cy="12.5" r="1" fill="white" />
          </svg>
        );
      case "info":
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="8" fill="#1677ff" />
            <rect
              x="7.25"
              y="7"
              width="1.5"
              height="6"
              rx="0.75"
              fill="white"
            />
            <rect
              x="7.25"
              y="5"
              width="1.5"
              height="1.5"
              rx="0.75"
              fill="white"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        zIndex: 9999,
        background: theme.background,
        border: `1px solid ${theme.border}`,
        borderRadius: "12px",
        padding: "8px 16px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        boxShadow: theme.boxShadow,
        minWidth: content.length < 20 ? "auto" : "300px",
        maxWidth: "500px",
        opacity: visible ? 1 : 0,
        color: theme.color,
        transform: visible
          ? "translateX(-50%) translateY(0)"
          : "translateX(-50%) translateY(-20px)",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ flexShrink: 0 }}>{getIcon()}</div>
      <div
        style={{
          color: theme.color,
          fontSize: "14px",
          lineHeight: "1.5",
          flex: 1,
        }}
      >
        {content}
      </div>
      {closable && (
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(() => onClose?.(), 300);
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            color: theme.closeColor,
            fontSize: "12px",
            flexShrink: 0,
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};

// 支持对象参数
interface MessageOptions {
  content: string;
  duration?: number;
  closable?: boolean;
}

type MessageArg = string | MessageOptions;

// 简单的消息管理器
class MessageManager {
  private parseArg(arg: MessageArg): MessageOptions {
    if (typeof arg === "string") {
      return { content: arg };
    }
    return arg;
  }

  show(type: MessageType, arg: MessageArg) {
    const { content, duration, closable } = this.parseArg(arg);
    // 创建消息元素
    const theme = getMessageTheme();
    const messageDiv = document.createElement("div");
    messageDiv.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      background: ${theme.background};
      border: 1px solid ${theme.border};
      border-radius: 12px;
      padding: 8px 16px;
      box-shadow: ${theme.boxShadow};
      min-width: ${content.length < 20 ? "auto" : "300px"};
      max-width: 500px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: ${theme.color};
    `;

    // 添加图标
    if (type === "error") {
      const iconSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      iconSvg.setAttribute("width", "16");
      iconSvg.setAttribute("height", "16");
      iconSvg.setAttribute("viewBox", "0 0 16 16");
      iconSvg.innerHTML = `
        <circle cx="8" cy="8" r="8" fill="#ff4d4f"/>
        <path d="M10.5 5.5l-5 5m0-5l5 5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      `;
      messageDiv.appendChild(iconSvg);
    }
    if (type === "success") {
      const iconSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      iconSvg.setAttribute("width", "16");
      iconSvg.setAttribute("height", "16");
      iconSvg.setAttribute("viewBox", "0 0 16 16");
      iconSvg.innerHTML = `
        <circle cx="8" cy="8" r="8" fill="#52c41a"/>
        <path d="M5 8.5l2.2 2.2 3.8-3.4" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      `;
      messageDiv.appendChild(iconSvg);
    }
    if (type === "warning") {
      const iconSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      iconSvg.setAttribute("width", "16");
      iconSvg.setAttribute("height", "16");
      iconSvg.setAttribute("viewBox", "0 0 16 16");
      iconSvg.innerHTML = `
        <circle cx="8" cy="8" r="8" fill="#faad14"/>
        <path d="M8 4.5v5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="8" cy="12.5" r="1" fill="white"/>
      `;
      messageDiv.appendChild(iconSvg);
    }
    if (type === "info") {
      const iconSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      iconSvg.setAttribute("width", "16");
      iconSvg.setAttribute("height", "16");
      iconSvg.setAttribute("viewBox", "0 0 16 16");
      iconSvg.innerHTML = `
        <circle cx="8" cy="8" r="8" fill="#1677ff"/>
        <rect x="7.25" y="7" width="1.5" height="6" rx="0.75" fill="white"/>
        <rect x="7.25" y="5" width="1.5" height="1.5" rx="0.75" fill="white"/>
      `;
      messageDiv.appendChild(iconSvg);
    }

    // 添加文本
    const textDiv = document.createElement("div");
    textDiv.textContent = content;
    textDiv.style.flex = "1";
    textDiv.style.color = theme.color;
    messageDiv.appendChild(textDiv);

    // 添加关闭按钮（如果启用）
    if (closable) {
      const closeBtn = document.createElement("button");
      closeBtn.textContent = "✕";
      closeBtn.style.cssText = `
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        color: ${theme.closeColor};
        font-size: 12px;
      `;
      closeBtn.onclick = () => {
        document.body.removeChild(messageDiv);
      };
      messageDiv.appendChild(closeBtn);
    }

    // 添加到页面
    document.body.appendChild(messageDiv);

    // 自动关闭
    if (duration !== 0) {
      setTimeout(() => {
        if (document.body.contains(messageDiv)) {
          document.body.removeChild(messageDiv);
        }
      }, duration || 3000);
    }
  }

  success(arg: MessageArg) {
    this.show("success", arg);
  }

  error(arg: MessageArg) {
    this.show("error", arg);
  }

  warning(arg: MessageArg) {
    this.show("warning", arg);
  }

  info(arg: MessageArg) {
    this.show("info", arg);
  }
}

export const message = new MessageManager();
export default MessageItem;
