import { codePreviewSlide } from "./code-preview-slide";
import { narrativeEntranceSlide } from "./narrative-entrance-slide";

export type { SlideCue, SlideCueKind, SlideDefinition } from "./types";
export type { SampleSlideProps } from "./sample-slide-props";

export const sampleSlides = [narrativeEntranceSlide, codePreviewSlide] as const;

export { codePreviewSlide, narrativeEntranceSlide };
