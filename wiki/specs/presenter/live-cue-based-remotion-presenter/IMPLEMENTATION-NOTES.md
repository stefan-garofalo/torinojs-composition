---
domain: presenter
type: implementation-notes
spec: GH-1
surface: wiki
permission: project
links:
  - "[[specs/presenter/live-cue-based-remotion-presenter/SPEC]]"
  - "[[specs/presenter/live-cue-based-remotion-presenter/PLAN]]"
ingested: false
last_ingested: null
created: 2026-06-08
updated: 2026-06-08
---

# Implementation Notes: Live Cue-Based Remotion Presenter

## Execution Mode

parallel

## Execution Board

| Task | Status | Notes |
|------|--------|-------|
| T1 Timeline contract and tests | Complete | Wave 1 worker-owned; behavior tests passed. |
| T2 Two sample slides and stage primitives | Complete | Wave 1 worker-owned; sample registry and focused checks passed. |
| T3 Fullscreen keyboard presenter | Complete | Integrated Player shell, navigation helpers, hold-frame stop behavior, root composition, Vite host, and dependency pins. |
| T4 Acceptance audit and notes | Complete | Acceptance audit and manual checklist recorded. |

## Sanity Checks

- `bun src/timeline/compileTimeline.test.ts` passed: 8 timeline checks.
- `bun src/presenter/navigation.test.ts` passed.
- `bun run lint` passed with one existing warning in `src/components/remocn/live-code-compilation.tsx`.
- `bunx remotion still ComposableReactPresenter --scale=0.25 --frame=30 --output=/tmp/composable-react-presenter-frame30.png` passed.
- `bunx remotion still ComposableReactPresenter --scale=0.25 --frame=440 --output=/tmp/composable-react-presenter-frame440.png` passed.
- `curl -I http://localhost:3015` returned `HTTP/1.1 200 OK` after starting `bun run dev -- --port 3015`.
- `curl -I http://localhost:3016/` returned `HTTP/1.1 200 OK` after starting `bun run presenter -- --port 3016`.
- `agent-browser --session composable-presenter open http://localhost:3016/` loaded the live presenter.
- `agent-browser` screenshots verified the narrative slide, forward cue hold, code slide, and final preview hold.
- `agent-browser press ArrowRight`, `ArrowLeft`, `Home`, `End`, and `r` were exercised against the live presenter host.

## Decisions And Deviations

- Execution is parallel because the user explicitly required full parallel implementation.
- Wave 1 write scopes are disjoint: timeline/compiler files vs slide/stage/preview files.
- The renderable Remotion composition now renders `PresenterDeck` directly. The interactive keyboard shell remains in `PresenterPlayer` because nesting `@remotion/player` inside a Remotion composition misframed still renders.
- `zod@4.3.6` was pinned because Remotion warned that the transitive installed version was incompatible.
- `oxlint.config.ts` is excluded from the app `tsc` pass because its package-export types require module resolution settings that do not match the Remotion scaffold. Source lint/typecheck still runs through `bun run lint`.
- A minimal Vite host was added for the live presenter URL because `@remotion/player` is intended for regular React apps, while the Remotion composition should render the deck directly.
- `agent-browser` initially caught a Player hook-context failure in Vite. `vite.config.ts` now dedupes `@remotion/player`, `react`, `react-dom`, and `remotion` so the Player context and Remotion hooks share module instances.
- `agent-browser` also caught forward playback running past cue holds. `PresenterPlayer` now listens to `frameupdate`, pauses at the target cue hold frame, and seeks exactly to that hold frame.
- User/browser testing caught `ArrowLeft` appearing stuck at contiguous cue boundaries. Hold targets now seek to the last frame inside the target cue (`holdFrame - 1`) and previous/replay use the presenter's stored cue index when frame-derived cue detection is ambiguous.
- React was aligned to `18.3.1` with matching type packages while investigating Player compatibility.

## Acceptance Audit

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Fullscreen, slide-only 16:9 stage at 1920x1080, 60fps | Met | `Root.tsx` registers `ComposableReactPresenter` at 1920x1080 and `PRESENTATION_FPS`; still renders are correctly framed. |
| Remotion Player exists as the interactive playback shell | Met | `PresenterPlayer.tsx` uses `@remotion/player` with `PlayerRef`. |
| Keyboard controls only: ArrowRight, ArrowLeft, Home, End, R | Met | `PresenterPlayer.tsx` handles only those keys; `navigation.test.ts` covers command targets. |
| ArrowRight advances to next cue animation and hold state | Met | `getCueTarget(..., "next")` returns next cue start with playback enabled; `agent-browser` verified forward cue and slide-change behavior. |
| ArrowLeft jumps to previous cue hold state | Met | `getCueTarget(..., "previous")` returns the last frame inside the previous cue hold with playback disabled; `agent-browser` verified visible backward movement from the code slide to the narrative slide. |
| Home and End jump to first/final cues | Met | `navigation.test.ts` covers first and last commands; `agent-browser` exercised both keys. |
| R replays current cue from start frame | Met | `navigation.test.ts` covers replay command; `agent-browser` exercised `r` on the live host. |
| No visible controls, pause/play affordance, fullscreen key, debug route, or rendered cue metadata | Met | `PresenterPlayer.tsx` disables Player controls/click/space/fullscreen; sample slides render no cue metadata. |
| Slide-local `startFrame` and `holdFrame` cues | Met | `slides/types.ts` and sample slides define slide-local cues. |
| Compiler produces global absolute frames | Met | `compileTimeline.test.ts` checks absolute cue ranges. |
| Duration derives from final hold plus padding unless overridden | Met | `deriveSlideDuration` and tests cover both paths. |
| Slide-change is explicit semantic cue | Met | Both sample slides include `kind: "slide-change"` cues. |
| Compiler rejects duplicate cue ids, non-increasing cues, invalid frames, and empty cue arrays | Met | `compileTimeline.test.ts` covers all rejection paths. |
| Two sample slides use accepted schema | Met | `sampleSlides` exports narrative and code-plus-preview slide definitions. |
| Cue navigation works across content and slide-change cues | Met | Compiled sample timeline includes 8 cues and 2 slide-change cues; navigation helper is cue-kind agnostic. |
| One sample demonstrates text/narrative entrance | Met | `NarrativeEntranceSlide` uses Remocn typography and frame-driven reveals. |
| One sample demonstrates code/code-plus-preview behavior | Met | `CodePreviewSlide` uses `GlassCodeBlock` and mocked notification preview. |
| 60fps timing constants: 300ms and 600ms | Met | `constants.ts` defines 18f and 36f at 60fps; tests assert values. |

## Remaining Work

None for this epic gate.

## Manual Review Checklist

| Area | Check | How to perform | Expected result |
|------|-------|----------------|-----------------|
| Studio smoke | Open the renderable deck in Remotion Studio | Visit `http://localhost:3015` while the dev server is running and select `ComposableReactPresenter` | The two-slide sample deck appears at 16:9 with no in-slide control overlay. |
| Cue behavior | Try the keyboard controls in the live presenter host | Visit `http://localhost:3016/`, then use `ArrowRight`, `ArrowLeft`, `Home`, `End`, and `R` | The deck moves between cue starts/holds according to the semantic cue model. |
| Render smoke | Re-run the still command | `bunx remotion still ComposableReactPresenter --scale=0.25 --frame=440 --output=/tmp/composable-react-presenter-frame440.png` | Code-plus-preview slide renders nonblank and correctly framed. |
| CLI regression | Re-run source checks | `bun run lint && bun src/timeline/compileTimeline.test.ts && bun src/presenter/navigation.test.ts` | Commands pass; lint may keep the existing Remocn warning. |
