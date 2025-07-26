import type { FunctionalComponent, JSX } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";
import { Theme } from "@/types";
import { t } from "@/local";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  value?: string;
  onChange?: (value: string) => void;
  options: Option[];
  placeholder?: string;
  style?: any;
  error?: boolean;
  disabled?: boolean;
  dropdownStyle?: any;
  className?: string;
  dropdownClassName?: string;
  children?: JSX.Element;
}

export const Select: FunctionalComponent<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  style,
  error,
  disabled,
  dropdownStyle,
  className,
  dropdownClassName,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 主题切换
  const fundUnitParams = JSON.parse(
    sessionStorage.getItem("fund_unit_params") || "{}"
  );
  const whiteTheme = fundUnitParams.theme === Theme.WHITE;
  // hover灰色 #f5f5f5，选中蓝色 #e6f7ff
  const selectTheme = whiteTheme
    ? {
        trigger: {
          background: disabled ? "#f5f5f5" : "#fff",
          color: disabled ? "#bfbfbf" : value ? "#222" : "#bfbfbf",
          border: error
            ? "1px solid #ff4d4f"
            : disabled
            ? "1px solid #f0f0f0"
            : "1px solid #d9d9d9",
        },
        dropdown: {
          background: "#fff",
          border: "1px solid #d9d9d9",
          color: "#222",
        },
        option: (active: boolean, optDisabled: boolean, hovered: boolean) => ({
          color: optDisabled ? "#bfbfbf" : active ? "#1890ff" : "#222",
          background: active
            ? "#e6f7ff"
            : hovered && !optDisabled
            ? "#f5f5f5"
            : optDisabled
            ? "#f5f5f5"
            : "#fff",
        }),
        placeholder: { color: "#bfbfbf" },
      }
    : {
        trigger: {
          background: disabled ? "#23262F" : "#23262F",
          color: disabled ? "#666" : value ? "#fff" : "#666",
          border: error
            ? "1px solid #ff4d4f"
            : disabled
            ? "1px solid #23262F"
            : "1px solid #23262F",
        },
        dropdown: {
          background: "#23262F",
          border: "1px solid #23262F",
          color: "#fff",
        },
        option: (active: boolean, optDisabled: boolean, hovered: boolean) => ({
          color: optDisabled ? "#666" : active ? "#00E8C6" : "#fff",
          background: active
            ? "#23262F"
            : hovered && !optDisabled
            ? "#333843"
            : optDisabled
            ? "#23262F"
            : "#23262F",
        }),
        placeholder: { color: "#666" },
      };

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: "relative", ...style }}
    >
      <style>{`
        .custom-select-dropdown {
          scrollbar-width: thin;
          scrollbar-color: #bfbfbf #f5f5f5;
        }
        .custom-select-dropdown::-webkit-scrollbar {
          width: 8px;
        }
        .custom-select-dropdown::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background: ${whiteTheme ? "#e5e5e5" : "#444C5C"};
        }
        .custom-select-dropdown::-webkit-scrollbar-track {
          background: ${whiteTheme ? "#f5f5f5" : "#23262F"};
        }
      `}</style>
      <div
        onClick={() => !disabled && setOpen((o) => !o)}
        style={{
          minHeight: 40,
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          fontSize: 15,
          cursor: disabled ? "not-allowed" : "pointer",
          boxSizing: "border-box",
          transition: "border 0.2s",
          opacity: disabled ? 0.6 : 1,
          width: "100%",
          ...selectTheme.trigger,
          ...style,
        }}
        tabIndex={0}
      >
        <span style={{ flex: 1 }}>
          {selected ? (
            selected.label
          ) : (
            <span style={selectTheme.placeholder}>
              {placeholder || "请选择"}
            </span>
          )}
        </span>
        <span style={{ marginLeft: 8, display: "flex", alignItems: "center" }}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 8L10 12L14 8"
              stroke="#bfbfbf"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>
      {open && !disabled && (
        <div
          className={`custom-select-dropdown${
            dropdownClassName ? " " + dropdownClassName : ""
          }`}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 44,
            zIndex: 10,
            borderRadius: 6,
            boxShadow: whiteTheme
              ? "0 2px 8px rgba(0,0,0,0.08)"
              : "0 2px 8px rgba(0,0,0,0.32)",
            maxHeight: 220,
            overflowY: "auto",
            ...selectTheme.dropdown,
            ...dropdownStyle,
          }}
        >
          {options.length === 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 120,
                width: "100%",
                userSelect: "none",
              }}
            >
              <svg
                width="64"
                height="41"
                viewBox="0 0 64 41"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>{t("暂无数据")}</title>
                <g transform="translate(0 1)" fill="none" fillRule="evenodd">
                  <ellipse
                    fill="#f5f5f5"
                    cx="32"
                    cy="33"
                    rx="32"
                    ry="7"
                  ></ellipse>
                  <g fillRule="nonzero" stroke="#d9d9d9">
                    <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                    <path
                      d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                      fill="#fafafa"
                    ></path>
                  </g>
                </g>
              </svg>
              <div style={{ marginTop: 8, color: "#bfbfbf", fontSize: 15 }}>
                {t("暂无数据")}
              </div>
            </div>
          )}
          {options.map((opt, idx) => (
            <div
              key={opt.value}
              onClick={() => {
                if (opt.disabled) return;
                setOpen(false);
                onChange?.(opt.value);
              }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                padding: "10px 16px",
                cursor: opt.disabled ? "not-allowed" : "pointer",
                fontWeight: value === opt.value ? 600 : 400,
                opacity: opt.disabled ? 0.6 : 1,
                ...selectTheme.option(
                  value === opt.value,
                  !!opt.disabled,
                  hoveredIndex === idx
                ),
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
      {children}
    </div>
  );
};
