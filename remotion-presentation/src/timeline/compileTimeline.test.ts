import type { SlideDefinition } from "../slides/types";
import {
  compileTimeline,
  DEFAULT_POST_CUE_PADDING_FRAMES,
  deriveSlideDuration,
  PANEL_OR_LARGE_TRANSITION_FRAMES,
  PRESENTATION_FPS,
  TEXT_OR_SMALL_TRANSITION_FRAMES,
} from "./index";

type TestCase = Readonly<{
  name: string;
  run: () => void;
}>;

const baseSlides = (): SlideDefinition[] => [
  {
    id: "intro",
    title: "Intro",
    cues: [
      { id: "intro-title", startFrame: 0, holdFrame: 18 },
      { id: "intro-point", startFrame: 18, holdFrame: 54 },
    ],
  },
  {
    id: "code",
    title: "Code",
    cues: [
      { id: "code-enter", startFrame: 0, holdFrame: 36 },
      {
        id: "slide-change-code",
        startFrame: 36,
        holdFrame: 72,
        kind: "slide-change",
      },
    ],
    durationInFrames: 120,
  },
];

const tests: TestCase[] = [
  {
    name: "exports accepted 60fps timing constants",
    run: () => {
      expectEqual(PRESENTATION_FPS, 60);
      expectEqual(TEXT_OR_SMALL_TRANSITION_FRAMES, 18);
      expectEqual(PANEL_OR_LARGE_TRANSITION_FRAMES, 36);
      expectEqual(DEFAULT_POST_CUE_PADDING_FRAMES, 36);
    },
  },
  {
    name: "compiles slide-local cues into absolute ranges",
    run: () => {
      const timeline = compileTimeline(baseSlides());

      expectEqual(timeline.fps, 60);
      expectEqual(timeline.durationInFrames, 210);
      expectEqual(
        timeline.slides.map((slide) => ({
          id: slide.id,
          startFrame: slide.startFrame,
          endFrame: slide.endFrame,
          durationInFrames: slide.durationInFrames,
        })),
        [
          { id: "intro", startFrame: 0, endFrame: 90, durationInFrames: 90 },
          { id: "code", startFrame: 90, endFrame: 210, durationInFrames: 120 },
        ],
      );
      expectEqual(
        timeline.cues.map((cue) => ({
          id: cue.id,
          slideId: cue.slideId,
          absoluteStartFrame: cue.absoluteStartFrame,
          absoluteHoldFrame: cue.absoluteHoldFrame,
        })),
        [
          {
            id: "intro-title",
            slideId: "intro",
            absoluteStartFrame: 0,
            absoluteHoldFrame: 18,
          },
          {
            id: "intro-point",
            slideId: "intro",
            absoluteStartFrame: 18,
            absoluteHoldFrame: 54,
          },
          {
            id: "code-enter",
            slideId: "code",
            absoluteStartFrame: 90,
            absoluteHoldFrame: 126,
          },
          {
            id: "slide-change-code",
            slideId: "code",
            absoluteStartFrame: 126,
            absoluteHoldFrame: 162,
          },
        ],
      );
    },
  },
  {
    name: "derives duration from final holdFrame plus default padding",
    run: () => {
      expectEqual(deriveSlideDuration(baseSlides()[0]), 90);
    },
  },
  {
    name: "accepts valid explicit duration override",
    run: () => {
      expectEqual(deriveSlideDuration(baseSlides()[1]), 120);
    },
  },
  {
    name: "rejects duplicate cue ids",
    run: () => {
      expectThrows(() =>
        compileTimeline([
          {
            id: "intro",
            cues: [{ id: "same", startFrame: 0, holdFrame: 18 }],
          },
          {
            id: "code",
            cues: [{ id: "same", startFrame: 0, holdFrame: 36 }],
          },
        ]),
      );
    },
  },
  {
    name: "rejects non-increasing cue ranges",
    run: () => {
      expectThrows(() =>
        compileTimeline([
          {
            id: "intro",
            cues: [{ id: "bad", startFrame: 18, holdFrame: 18 }],
          },
        ]),
      );
      expectThrows(() =>
        compileTimeline([
          {
            id: "intro",
            cues: [
              { id: "first", startFrame: 0, holdFrame: 36 },
              { id: "overlap", startFrame: 18, holdFrame: 54 },
            ],
          },
        ]),
      );
    },
  },
  {
    name: "rejects invalid frames",
    run: () => {
      expectThrows(() =>
        compileTimeline([
          {
            id: "intro",
            cues: [{ id: "negative", startFrame: -1, holdFrame: 18 }],
          },
        ]),
      );
      expectThrows(() =>
        compileTimeline([
          {
            id: "intro",
            cues: [{ id: "fractional", startFrame: 0.5, holdFrame: 18 }],
          },
        ]),
      );
      expectThrows(() =>
        compileTimeline([
          {
            id: "intro",
            cues: [{ id: "short", startFrame: 0, holdFrame: 18 }],
            durationInFrames: 53,
          },
        ]),
      );
    },
  },
  {
    name: "rejects empty cue arrays",
    run: () => {
      expectThrows(() => compileTimeline([{ id: "intro", cues: [] }]));
    },
  },
];

for (const test of tests) {
  test.run();
}

console.log(`timeline tests passed: ${tests.length}`);

function expectEqual<T>(actual: T, expected: T): void {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);

  if (actualJson !== expectedJson) {
    throw new Error(`Expected ${expectedJson}, received ${actualJson}`);
  }
}

function expectThrows(run: () => void): void {
  try {
    run();
  } catch {
    return;
  }

  throw new Error("Expected function to throw.");
}
