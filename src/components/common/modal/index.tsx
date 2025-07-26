import type { ComponentChildren } from "preact";
import { useState } from "preact/hooks";
import { getModalTheme } from "./theme";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ComponentChildren;
  width?: number | string;
  maxWidth?: number | string;
  showClose?: boolean;
  maskClosable?: boolean;
}

export function Modal({
  visible,
  onClose,
  title,
  children,
  width = 400,
  maxWidth = 400,
  showClose = true,
  maskClosable = true,
}: ModalProps) {
  const [maskMouseDown, setMaskMouseDown] = useState(false);
  const theme = getModalTheme();

  // 只有mousedown和mouseup都在mask上才关闭弹窗
  const handleMaskMouseDown = (e: any) => {
    if (e.target === e.currentTarget) {
      setMaskMouseDown(true);
    } else {
      setMaskMouseDown(false);
    }
  };

  const handleMaskMouseUp = (e: any) => {
    if (e.target === e.currentTarget && maskMouseDown && maskClosable) {
      onClose();
    }
    setMaskMouseDown(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: theme.mask,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onMouseDown={handleMaskMouseDown}
      onMouseUp={handleMaskMouseUp}
    >
      <div
        style={{
          background: theme.modalBg,
          padding: 32,
          borderRadius: 12,
          minWidth: width,
          maxWidth: maxWidth,
          color: theme.modalColor,
          boxShadow: theme.modalBoxShadow,
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        {showClose && (
          <button
            type="button"
            onClick={onClose}
            style={theme.closeBtn}
            aria-label="关闭"
          >
            ×
          </button>
        )}

        {/* 标题 */}
        {title && <div style={theme.title}>{title}</div>}

        {/* 内容 */}
        {children}
      </div>
    </div>
  );
}
