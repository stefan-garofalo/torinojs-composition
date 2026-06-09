import type { ButtonHTMLAttributes, CSSProperties } from "react";
import { vw } from "../../lib/viewport-units";

export type ButtonVariant =
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  style?: CSSProperties;
};

export function Button({
  style,
  type = "button",
  variant = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      style={{
        ...variantStyle[variant],
        alignItems: "center",
        borderRadius: "var(--radius-md)",
        display: "inline-flex",
        fontFamily: "var(--font-sans)",
        fontSize: vw(14),
        fontWeight: 500,
        gap: 8,
        justifyContent: "center",
        lineHeight: 1,
        minHeight: 36,
        padding: "0 0.875rem",
        ...style,
      }}
      type={type}
      {...props}
    />
  );
}

const baseBorder = "1px solid var(--border)";

const variantStyle: Record<ButtonVariant, CSSProperties> = {
  default: {
    background: "var(--primary)",
    border: "1px solid transparent",
    color: "var(--primary-foreground)",
  },
  secondary: {
    background: "var(--secondary)",
    border: baseBorder,
    color: "var(--secondary-foreground)",
  },
  outline: {
    background: "transparent",
    border: baseBorder,
    color: "var(--foreground)",
  },
  ghost: {
    background: "transparent",
    border: "1px solid transparent",
    color: "var(--muted-foreground)",
  },
  destructive: {
    background: "rgba(248, 113, 113, 0.14)",
    border: "1px solid rgba(248, 113, 113, 0.36)",
    color: "#fecaca",
  },
};
