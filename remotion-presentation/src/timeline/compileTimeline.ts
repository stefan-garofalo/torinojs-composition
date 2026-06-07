import type { SlideCue } from "../slides/types";
import { DEFAULT_POST_CUE_PADDING_FRAMES, PRESENTATION_FPS } from "./constants";

type TimelineSlideInput = Readonly<{
  id: string;
  title?: string;
  cues: readonly SlideCue[];
  durationInFrames?: number;
}>;

export type FrameRange = Readonly<{
  startFrame: number;
  holdFrame: number;
}>;

export type CompiledCue = SlideCue &
  Readonly<{
    slideId: string;
    slideIndex: number;
    cueIndex: number;
    absoluteStartFrame: number;
    absoluteHoldFrame: number;
  }>;

export type CompiledSlide = Readonly<{
  id: string;
  title?: string;
  index: number;
  startFrame: number;
  endFrame: number;
  durationInFrames: number;
  cues: readonly CompiledCue[];
}>;

export type CompiledTimeline = Readonly<{
  fps: typeof PRESENTATION_FPS;
  durationInFrames: number;
  slides: readonly CompiledSlide[];
  cues: readonly CompiledCue[];
}>;

export const deriveSlideDuration = (
  slide: TimelineSlideInput,
  paddingFrames = DEFAULT_POST_CUE_PADDING_FRAMES,
): number => {
  validateCues(slide);

  const lastCue = slide.cues[slide.cues.length - 1];
  const derivedDuration = lastCue.holdFrame + paddingFrames;

  if (slide.durationInFrames === undefined) {
    return derivedDuration;
  }

  assertValidFrame(slide.durationInFrames, `${slide.id}.durationInFrames`);

  if (slide.durationInFrames < derivedDuration) {
    throw new Error(
      `Slide "${slide.id}" durationInFrames must be >= final cue holdFrame plus padding (${derivedDuration}).`,
    );
  }

  return slide.durationInFrames;
};

export const compileTimeline = (
  slides: readonly TimelineSlideInput[],
): CompiledTimeline => {
  if (slides.length === 0) {
    throw new Error("Timeline requires at least one slide.");
  }

  const slideIds = new Set<string>();
  const cueIds = new Set<string>();
  const compiledSlides: CompiledSlide[] = [];
  const compiledCues: CompiledCue[] = [];
  let cursor = 0;

  slides.forEach((slide, slideIndex) => {
    assertNonEmptyId(slide.id, `slide[${slideIndex}].id`);

    if (slideIds.has(slide.id)) {
      throw new Error(`Duplicate slide id "${slide.id}".`);
    }

    slideIds.add(slide.id);
    validateCues(slide);

    const durationInFrames = deriveSlideDuration(slide);
    const slideCues = slide.cues.map((cue, cueIndex) => {
      if (cueIds.has(cue.id)) {
        throw new Error(`Duplicate cue id "${cue.id}".`);
      }

      cueIds.add(cue.id);

      const compiledCue: CompiledCue = {
        ...cue,
        slideId: slide.id,
        slideIndex,
        cueIndex,
        absoluteStartFrame: cursor + cue.startFrame,
        absoluteHoldFrame: cursor + cue.holdFrame,
      };

      compiledCues.push(compiledCue);
      return compiledCue;
    });

    compiledSlides.push({
      id: slide.id,
      title: slide.title,
      index: slideIndex,
      startFrame: cursor,
      endFrame: cursor + durationInFrames,
      durationInFrames,
      cues: slideCues,
    });

    cursor += durationInFrames;
  });

  return {
    fps: PRESENTATION_FPS,
    durationInFrames: cursor,
    slides: compiledSlides,
    cues: compiledCues,
  };
};

const validateCues = (slide: TimelineSlideInput): void => {
  if (slide.cues.length === 0) {
    throw new Error(`Slide "${slide.id}" must include at least one cue.`);
  }

  let previousHoldFrame: number | undefined;

  slide.cues.forEach((cue, cueIndex) => {
    const prefix = `${slide.id}.cues[${cueIndex}]`;

    assertNonEmptyId(cue.id, `${prefix}.id`);
    assertValidFrame(cue.startFrame, `${prefix}.startFrame`);
    assertValidFrame(cue.holdFrame, `${prefix}.holdFrame`);

    if (cue.holdFrame <= cue.startFrame) {
      throw new Error(
        `Cue "${cue.id}" holdFrame must be greater than startFrame.`,
      );
    }

    if (previousHoldFrame !== undefined && cue.startFrame < previousHoldFrame) {
      throw new Error(
        `Cue "${cue.id}" startFrame must be >= the previous cue holdFrame.`,
      );
    }

    previousHoldFrame = cue.holdFrame;
  });
};

const assertValidFrame = (value: number, name: string): void => {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`${name} must be a non-negative integer frame.`);
  }
};

const assertNonEmptyId = (value: string, name: string): void => {
  if (value.trim().length === 0) {
    throw new Error(`${name} must be a non-empty string.`);
  }
};
