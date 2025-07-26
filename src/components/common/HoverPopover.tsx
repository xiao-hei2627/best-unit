import { useState, useRef } from "preact/hooks";
import type { FunctionalComponent, JSX } from "preact";
import { Theme } from "@/types";

export type PopoverPosition = "top" | "bottom" | "leftTop" | "rightTop";
interface HoverPopoverProps {
  popover: JSX.Element;
  children: JSX.Element;
  popoverWidth?: number;
  popoverMinWidth?: number;
  offsetY?: number; // 弹层与目标元素的垂直间距
  offsetX?: number; // 弹层与目标元素的水平间距
  popoverPosition?: "top" | "bottom" | "leftTop" | "rightTop";
}

/**
 * 通用 HoverPopover 组件，支持上下、左上、右上浮层、箭头、位置自适应
 */
const HoverPopover: FunctionalComponent<HoverPopoverProps> = ({
  popover,
  children,
  popoverWidth = 300,
  popoverMinWidth = 200,
  offsetY = 16,
  offsetX = 16,
  popoverPosition = "top",
}) => {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState<
    "top" | "bottom" | "leftTop" | "rightTop"
  >(popoverPosition);
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (popoverPosition === "top" || popoverPosition === "bottom") {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (popoverPosition === "top" && rect.top < 100) {
          setPosition("bottom");
        } else if (
          popoverPosition === "bottom" &&
          window.innerHeight - rect.bottom < 100
        ) {
          setPosition("top");
        } else {
          setPosition(popoverPosition);
        }
      } else {
        setPosition(popoverPosition);
      }
    } else {
      setPosition(popoverPosition);
    }
    setShow(true);
  };

  const handleMouseLeave = () => {
    // 延迟关闭，防止鼠标快速移动到弹窗内容时闪烁
    timerRef.current = window.setTimeout(() => {
      setShow(false);
    }, 120);
  };

  const popoverTheme = {
    white: {
      popover: {
        background: "#fff",
        color: "#222",
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        border: "none",
      },
      arrow: {
        top: "#fff",
        bottom: "#fff",
        left: "#fff",
        right: "#fff",
      },
    },
    dark: {
      popover: {
        background: "#23262F",
        color: "#fff",
        boxShadow: "0 4px 16px rgba(0,0,0,0.32)",
        border: "1px solid #444C5C",
      },
      arrow: {
        top: "#23262F",
        bottom: "#23262F",
        left: "#23262F",
        right: "#23262F",
      },
    },
  };

  // 弹层定位样式
  const fundUnitParams = JSON.parse(
    sessionStorage.getItem("fund_unit_params") || "{}"
  );
  const whiteTheme = fundUnitParams.theme === Theme.WHITE;
  const theme = popoverTheme[whiteTheme ? "white" : "dark"];

  let popoverStyle: any = {
    position: "absolute",
    zIndex: 999,
    borderRadius: 6,
    fontSize: 15,
    minWidth: popoverMinWidth,
    width: popoverWidth,
    padding: "8px 14px",
    pointerEvents: "auto",
    textAlign: "center",
    animation: "fadeInUp 0.3s",
    ...theme.popover,
  };
  let arrowStyle: any = {
    position: "absolute",
    zIndex: 11,
    width: 0,
    height: 0,
  };
  if (position === "top") {
    popoverStyle = {
      ...popoverStyle,
      left: "50%",
      top: -48,
      transform: "translateX(-50%)",
    };
    arrowStyle = {
      ...arrowStyle,
      left: "50%",
      bottom: -8,
      transform: "translateX(-50%)",
      borderLeft: "8px solid transparent",
      borderRight: "8px solid transparent",
      borderTop: `8px solid ${theme.arrow.top}`,
    };
  } else if (position === "bottom") {
    popoverStyle = {
      ...popoverStyle,
      left: "50%",
      top: "100%",
      marginTop: offsetY,
      transform: "translateX(-50%)",
    };
    arrowStyle = {
      ...arrowStyle,
      left: "50%",
      top: -8,
      transform: "translateX(-50%)",
      borderLeft: "8px solid transparent",
      borderRight: "8px solid transparent",
      borderBottom: `8px solid ${theme.arrow.bottom}`,
    };
  } else if (position === "leftTop") {
    popoverStyle = {
      ...popoverStyle,
      right: "100%",
      top: 0,
      marginRight: offsetX,
      transform: "none",
    };
    arrowStyle = {
      ...arrowStyle,
      right: -8,
      top: 12,
      borderTop: "8px solid transparent",
      borderBottom: "8px solid transparent",
      borderLeft: `8px solid ${theme.arrow.left}`,
    };
  } else if (position === "rightTop") {
    popoverStyle = {
      ...popoverStyle,
      left: "100%",
      top: 0,
      marginLeft: offsetX,
      transform: "translateY(0)", // 右上角对齐
    };
    arrowStyle = {
      ...arrowStyle,
      left: -8,
      top: 12,
      borderTop: "8px solid transparent",
      borderBottom: "8px solid transparent",
      borderRight: `8px solid ${theme.arrow.right}`,
    };
  }

  return (
    <div
      ref={ref}
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {show && (
        <div
          style={popoverStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {popover}
          <div style={arrowStyle} />
        </div>
      )}
    </div>
  );
};

export default HoverPopover;
