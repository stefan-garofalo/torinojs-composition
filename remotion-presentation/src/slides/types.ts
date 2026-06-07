import type { ComponentType } from "react";

export type SlideCueKind = "content" | "slide-change";

export type SlideCue = Readonly<{
  id: string;
  startFrame: number;
  holdFrame: number;
  kind?: SlideCueKind;
  label?: string;
}>;

export type SlideDefinition<Props = unknown> = Readonly<{
  id: string;
  title?: string;
  component?: ComponentType<Props>;
  props?: Props;
  cues: readonly SlideCue[];
  durationInFrames?: number;
}>;
