import type { FunctionalComponent } from "preact";
import { useState, useEffect } from "preact/hooks";

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
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    return "#fff"; // 统一使用白色背景
  };

  const getBorderColor = () => {
    return "#d9d9d9"; // 统一使用灰色边框
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        zIndex: 9999,
        background: getBackgroundColor(),
        border: `1px solid ${getBorderColor()}`,
        borderRadius: "12px", // 更圆润的圆角
        padding: "8px 16px", // 减小上下padding
        display: "flex",
        alignItems: "center",
        gap: "8px",
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)", // 增强阴影效果
        minWidth: content.length < 20 ? "auto" : "300px", // 短消息自适应宽度
        maxWidth: "500px",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(-50%) translateY(0)"
          : "translateX(-50%) translateY(-20px)",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ flexShrink: 0 }}>{getIcon()}</div>
      <div
        style={{
          color: "#222",
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
            color: "#999",
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
    const messageDiv = document.createElement("div");
    messageDiv.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      background: #fff;
      border: 1px solid #fff;
      border-radius: 12px;
      padding: 8px 16px;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
      min-width: ${content.length < 20 ? "auto" : "300px"};
      max-width: 500px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #222;
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

    // 添加文本
    const textDiv = document.createElement("div");
    textDiv.textContent = content;
    textDiv.style.flex = "1";
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
        color: #999;
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
