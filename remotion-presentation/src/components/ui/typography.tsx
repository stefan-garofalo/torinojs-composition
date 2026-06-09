import type { CSSProperties, HTMLAttributes } from "react";

type TextProps = HTMLAttributes<HTMLElement> & {
  style?: CSSProperties;
};

export function TypographyH3({ style, ...props }: TextProps) {
  return (
    <h3
      style={{
        color: "var(--foreground)",
        fontFamily: "var(--font-sans)",
        fontSize: "1.5rem",
        fontWeight: 600,
        letterSpacing: 0,
        lineHeight: 1.08,
        margin: 0,
        ...style,
      }}
      {...props}
    />
  );
}

export function TypographyP({ style, ...props }: TextProps) {
  return (
    <p
      style={{
        color: "var(--foreground)",
        fontFamily: "var(--font-sans)",
        fontSize: "0.9375rem",
        lineHeight: 1.35,
        margin: 0,
        ...style,
      }}
      {...props}
    />
  );
}

export function TypographySmall({ style, ...props }: TextProps) {
  return (
    <small
      style={{
        color: "var(--muted-foreground)",
        fontFamily: "var(--font-sans)",
        fontSize: "0.8125rem",
        fontWeight: 500,
        lineHeight: 1.15,
        ...style,
      }}
      {...props}
    />
  );
}

export function TypographyMuted({ style, ...props }: TextProps) {
  return (
    <p
      style={{
        color: "var(--muted-foreground)",
        fontFamily: "var(--font-sans)",
        fontSize: "0.8125rem",
        lineHeight: 1.3,
        margin: 0,
        ...style,
      }}
      {...props}
    />
  );
}

export function TypographyBlockquote({ style, ...props }: TextProps) {
  return (
    <blockquote
      style={{
        borderLeft: "2px solid var(--border)",
        color: "var(--muted-foreground)",
        fontFamily: "var(--font-sans)",
        fontSize: "0.875rem",
        lineHeight: 1.3,
        margin: 0,
        paddingLeft: 14,
        ...style,
      }}
      {...props}
    />
  );
}
