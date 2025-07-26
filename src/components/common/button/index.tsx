import type { ComponentChildren } from "preact";
import { getButtonTheme } from "./theme";

interface ButtonProps {
  onClick?: () => void;
  color?: string;
  children: ComponentChildren;
}

export function Button({ onClick, color, children }: ButtonProps) {
  const style = getButtonTheme(color);
  return (
    <button style={style} onClick={onClick} type="button">
      {children}
    </button>
  );
}
