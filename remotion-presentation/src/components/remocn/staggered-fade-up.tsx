"use client";

import { interpolate, useCurrentFrame } from "remotion";
import { titleVw } from "../../lib/viewport-units";

export interface StaggeredFadeUpProps {
  text: string;
  staggerDelay?: number;
  distance?: number;
  fontSize?: number | string;
  color?: string;
  fontWeight?: number;
  background?: string;
  speed?: number;
  startFrame?: number;
  justifyContent?: CSSStyleDeclaration["justifyContent"];
  letterSpacing?: string | number;
  lineHeight?: number;
  className?: string;
}

export function StaggeredFadeUp({
  text,
  staggerDelay = 4,
  distance = 20,
  fontSize = titleVw(72),
  color = "#171717",
  fontWeight = 600,
  background = "white",
  speed = 1,
  startFrame = 0,
  justifyContent = "center",
  letterSpacing = "-0.03em",
  lineHeight = 1.05,
  className,
}: StaggeredFadeUpProps) {
  const frame = useCurrentFrame() * speed - startFrame;

  const tokens = text.split(/(\s+)/);
  let animatedIndex = 0;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent,
        background,
      }}
    >
      <span
        className={className}
        style={{
          fontSize,
          fontWeight,
          color,
          letterSpacing,
          lineHeight,
          whiteSpace: "pre-wrap",
          fontFamily:
            "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {tokens.map((token, i) => {
          if (/^\s+$/.test(token)) {
            return token;
          }

          const local = frame - animatedIndex * staggerDelay;
          animatedIndex += 1;
          const opacity = interpolate(local, [0, 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const y = interpolate(local, [0, 12], [distance, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity,
                transform: `translateY(${y}px)`,
              }}
            >
              {token}
            </span>
          );
        })}
      </span>
    </div>
  );
}
