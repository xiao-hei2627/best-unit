import { useState, useRef } from "preact/hooks";
import type { FunctionalComponent, JSX } from "preact";

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

  const handleMouseEnter = () => {
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

  // 弹层定位样式
  let popoverStyle: any = {
    position: "absolute",
    zIndex: 10,
    background: "#fff",
    color: "#222",
    borderRadius: 6,
    fontSize: 15,
    minWidth: popoverMinWidth,
    width: popoverWidth,
    padding: "8px 14px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
    pointerEvents: "auto",
    textAlign: "center",
    border: "none",
    animation: "fadeInUp 0.3s",
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
      borderTop: "8px solid #fff",
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
      borderBottom: "8px solid #fff",
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
      borderLeft: "8px solid #fff",
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
      borderRight: "8px solid #fff",
    };
  }

  return (
    <div
      ref={ref}
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div style={popoverStyle}>
          {popover}
          <div style={arrowStyle} />
        </div>
      )}
    </div>
  );
};

export default HoverPopover;
