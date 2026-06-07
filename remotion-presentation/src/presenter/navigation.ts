import type { CompiledCue } from "../timeline";

export type CueCommand = "next" | "previous" | "first" | "last" | "replay";

export type NavigationResult = Readonly<{
  cueIndex: number;
  frame: number;
  shouldPlay: boolean;
}>;

export const getCueTarget = (
  cues: readonly CompiledCue[],
  currentCueIndex: number,
  command: CueCommand,
): NavigationResult => {
  if (cues.length === 0) {
    throw new Error("Cannot navigate an empty cue timeline.");
  }

  const safeIndex = clamp(currentCueIndex, 0, cues.length - 1);

  if (command === "first") {
    return target(cues, 0, "start");
  }

  if (command === "last") {
    return target(cues, cues.length - 1, "hold");
  }

  if (command === "previous") {
    return target(cues, Math.max(0, safeIndex - 1), "hold");
  }

  if (command === "replay") {
    return target(cues, safeIndex, "start");
  }

  return target(cues, Math.min(cues.length - 1, safeIndex + 1), "start");
};

export const getCueIndexForFrame = (
  cues: readonly CompiledCue[],
  frame: number,
): number => {
  if (cues.length === 0) {
    return 0;
  }

  for (let index = cues.length - 1; index >= 0; index -= 1) {
    if (frame >= cues[index].absoluteStartFrame) {
      return index;
    }
  }

  return 0;
};

const target = (
  cues: readonly CompiledCue[],
  cueIndex: number,
  mode: "start" | "hold",
): NavigationResult => ({
  cueIndex,
  frame:
    mode === "start"
      ? cues[cueIndex].absoluteStartFrame
      : Math.max(
          cues[cueIndex].absoluteStartFrame,
          cues[cueIndex].absoluteHoldFrame - 1,
        ),
  shouldPlay: mode === "start",
});

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));
