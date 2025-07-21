import type { FunctionalComponent } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  style?: any;
  error?: boolean;
}

export const Select: FunctionalComponent<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  style,
  error,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div ref={ref} style={{ position: "relative", ...style }}>
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          minHeight: 40,
          border: error ? "1px solid #ff4d4f" : "1px solid #d9d9d9",
          borderRadius: 6,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          fontSize: 15,
          color: value ? "#222" : "#bfbfbf",
          cursor: "pointer",
          boxSizing: "border-box",
          transition: "border 0.2s",
          ...style,
        }}
      >
        <span style={{ flex: 1 }}>
          {selected ? selected.label : placeholder || "请选择"}
        </span>
        <span style={{ marginLeft: 8, fontSize: 12, color: "#bfbfbf" }}>▼</span>
      </div>
      {open && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 44,
            zIndex: 10,
            background: "#fff",
            border: "1px solid #d9d9d9",
            borderRadius: 6,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            maxHeight: 220,
            overflowY: "auto",
          }}
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                setOpen(false);
                onChange(opt.value);
              }}
              style={{
                padding: "10px 16px",
                cursor: "pointer",
                color: "#222",
                background: value === opt.value ? "#f5f5f5" : "#fff",
                fontWeight: value === opt.value ? 600 : 400,
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
