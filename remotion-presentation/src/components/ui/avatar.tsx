import type { CSSProperties, HTMLAttributes, ImgHTMLAttributes } from "react";
import { Img } from "remotion";
import { vw } from "../../lib/viewport-units";

type DivProps = HTMLAttributes<HTMLDivElement> & {
  style?: CSSProperties;
};

export function Avatar({ style, ...props }: DivProps) {
  return (
    <div
      style={{
        alignItems: "center",
        background: "var(--muted)",
        border: "1px solid var(--border)",
        borderRadius: 999,
        color: "var(--foreground)",
        display: "inline-flex",
        flexShrink: 0,
        fontFamily: "var(--font-sans)",
        fontSize: vw(14),
        fontWeight: 500,
        height: 56,
        justifyContent: "center",
        overflow: "hidden",
        width: 56,
        ...style,
      }}
      {...props}
    />
  );
}

export function AvatarImage({
  src,
  style,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { src: string }) {
  return (
    <Img
      src={src}
      style={{
        display: "block",
        height: "100%",
        objectFit: "cover",
        width: "100%",
        ...style,
      }}
      {...props}
    />
  );
}

export function AvatarFallback({ style, ...props }: DivProps) {
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
        ...style,
      }}
      {...props}
    />
  );
}
