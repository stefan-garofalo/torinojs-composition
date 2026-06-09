import type { CSSProperties, HTMLAttributes } from "react";

type DivProps = HTMLAttributes<HTMLDivElement> & {
  style?: CSSProperties;
};

export function Card({ style, ...props }: DivProps) {
  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "none",
        color: "var(--card-foreground)",
        overflow: "hidden",
        ...style,
      }}
      {...props}
    />
  );
}

export function CardHeader({ style, ...props }: DivProps) {
  return (
    <div
      style={{
        display: "grid",
        gap: 8,
        padding: "1.5rem 1.5rem 0",
        ...style,
      }}
      {...props}
    />
  );
}

export function CardTitle({ style, ...props }: DivProps) {
  return (
    <div
      style={{
        color: "var(--card-foreground)",
        fontFamily: "var(--font-sans)",
        fontSize: "1.5rem",
        fontWeight: 600,
        lineHeight: 1,
        ...style,
      }}
      {...props}
    />
  );
}

export function CardDescription({ style, ...props }: DivProps) {
  return (
    <div
      style={{
        color: "var(--muted-foreground)",
        fontFamily: "var(--font-sans)",
        fontSize: "0.875rem",
        lineHeight: 1.28,
        ...style,
      }}
      {...props}
    />
  );
}

export function CardContent({ style, ...props }: DivProps) {
  return (
    <div
      style={{
        display: "grid",
        gap: 16,
        padding: "1.5rem",
        ...style,
      }}
      {...props}
    />
  );
}

export function CardFooter({ style, ...props }: DivProps) {
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        gap: 10,
        padding: "0 1.5rem 1.5rem",
        ...style,
      }}
      {...props}
    />
  );
}
