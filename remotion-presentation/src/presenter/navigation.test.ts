import type { CompiledCue } from "../timeline";
import { getCueIndexForFrame, getCueTarget } from "./navigation";

const cues = [
  cue("intro", 0, 18),
  cue("point", 18, 54),
  cue("slide-change", 54, 72),
] as const;

expectEqual(getCueTarget(cues, 0, "next"), {
  cueIndex: 1,
  frame: 18,
  shouldPlay: true,
});

expectEqual(getCueTarget(cues, 2, "previous"), {
  cueIndex: 1,
  frame: 53,
  shouldPlay: false,
});

expectEqual(getCueTarget(cues, 1, "first"), {
  cueIndex: 0,
  frame: 0,
  shouldPlay: true,
});

expectEqual(getCueTarget(cues, 0, "last"), {
  cueIndex: 2,
  frame: 71,
  shouldPlay: false,
});

expectEqual(getCueTarget(cues, 1, "replay"), {
  cueIndex: 1,
  frame: 18,
  shouldPlay: true,
});

expectEqual(getCueIndexForFrame(cues, 0), 0);
expectEqual(getCueIndexForFrame(cues, 19), 1);
expectEqual(getCueIndexForFrame(cues, 80), 2);

console.log("navigation tests passed");

function cue(
  id: string,
  absoluteStartFrame: number,
  absoluteHoldFrame: number,
): CompiledCue {
  return {
    id,
    startFrame: absoluteStartFrame,
    holdFrame: absoluteHoldFrame,
    slideId: "slide",
    slideIndex: 0,
    cueIndex: 0,
    absoluteStartFrame,
    absoluteHoldFrame,
  };
}

function expectEqual<T>(actual: T, expected: T): void {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);

  if (actualJson !== expectedJson) {
    throw new Error(`Expected ${expectedJson}, received ${actualJson}`);
  }
}
