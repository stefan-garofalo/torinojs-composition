---
domain: presenter
type: implementation-plan
surface: wiki
permission: project
links:
  - "[[specs/presenter/live-cue-based-remotion-presenter/SPEC]]"
  - "https://github.com/stefan-garofalo/torinojs-composition/issues/1"
  - "https://github.com/stefan-garofalo/torinojs-composition/issues/2"
  - "https://github.com/stefan-garofalo/torinojs-composition/issues/3"
  - "https://github.com/stefan-garofalo/torinojs-composition/issues/4"
created: 2026-06-08
updated: 2026-06-08
---

# Plan: Live Cue-Based Remotion Presenter

**Status:** Complete

## Initial Situation

`remotion-presentation/` is scaffolded and has the Remocn registry blocks installed, but the active composition still renders `null` and the root composition still uses the starter 1280x720, 30fps settings. GitHub epic #1 asks for the first presenter gate: a clean fullscreen Remotion presenter that behaves like a keynote through semantic cue navigation. Child stories #2, #3, and #4 define the required keyboard controls, timeline compiler, and two-slide proof gate.

## Issue

Remotion is currently only a video scaffold. It has no presentation runtime, no cue model, no global timeline compiler, no keyboard-driven Player shell, and no sample slides proving that content cues and slide-change cues can be navigated predictably.

## Solution Shape

Build a small presenter foundation:

- A slide-local cue schema with `startFrame` and `holdFrame`.
- A timeline compiler that validates slide definitions and produces absolute cue frames.
- A fullscreen Player shell with keyboard-only cue navigation.
- Two sample slides using the schema: one narrative/text slide and one code-plus-preview slide.
- 60fps timing constants for 300ms text/small and 600ms panel/large motion.

This plan intentionally stops at the first gate. It does not author the full 16-slide talk.

## Inner Skill Phases

### Grill-Me

No new questions are open. The prior requirements grill and explicit child issues already lock the controversial decisions: keyboard-only control, no pause concept, no visible controls, clean slide-change cues, 60fps, and two-slide implementation gate.

### Parallel Research

Used for readonly discovery across independent surfaces:

- GitHub epic #1 and child stories #2, #3, #4.
- Existing Remotion scaffold and installed Remocn registry files.
- Wiki conventions under `wiki/AGENTS.md`.
- Remotion best-practice rules for compositions, frame-driven animation, and timing.
- Remotion Player docs confirming `<Player>` and `PlayerRef` as the intended interactive playback primitives.

### Swarm Planner

Implementation will run in parallel mode. Wave 1 has disjoint write scopes so workers can code in parallel. Wave 2 integrates the outputs into the root Player shell and runs final acceptance.

### TDD

Each task starts from a public behavior:

- Timeline compiler behavior is tested directly through exported pure functions.
- Presenter navigation is validated through the mounted shell behavior and/or focused control helpers.
- Slides are validated through the accepted schema, composition metadata, and render/lint checks.

## Resolved Decision Ledger

| Decision | Resolution |
|----------|------------|
| Execution mode | Parallel implementation waves. |
| Output format | Live Remotion presenter, not PPTX or MP4. |
| Composition size | 1920x1080 at 60fps. |
| Controls | `ArrowRight`, `ArrowLeft`, `Home`, `End`, `R` only. |
| Pause model | No pause/play concept in the presentation UX. |
| Slide transition | Semantic slide-change cue; visual default is clean, with entrance animations doing the work. |
| Gate size | Two sample slides only. |
| Package manager | Bun. |

## Assumptions And Constraints

- The chained user request counts as spec approval for implementation.
- The repo-local wiki path is `wiki/specs/...`, not `apps/wiki/specs/...`.
- `@remotion/player` may need to be added because the scaffold currently has `remotion` and `@remotion/cli`, but not Player.
- Remocn blocks may be adapted through wrappers, but the registry files themselves should remain recognizable and available.
- Workers must not touch unrelated skill folders, generated skill copies, or unrelated repo metadata.

## Codebase Findings

- `remotion-presentation/src/Composition.tsx` currently returns `null`.
- `remotion-presentation/src/Root.tsx` currently registers `MyComp` at 60 frames, 30fps, 1280x720.
- `remotion-presentation/src/components/remocn/` contains `GlassCodeBlock`, `LiveCodeCompilation`, typography blocks, and transition blocks.
- `remotion-presentation/package.json` uses Bun-compatible scripts and has `bun.lock`.
- `slides-content.md`, `deck-beats.md`, and `fragments.md` contain the pinned talk content and sample notification code context.

## External Research Used

- Remotion skill rules: drive animation from `useCurrentFrame()`, express durations in frames from fps, use explicit `interpolate()` ranges and Bézier easing.
- Remotion composition docs: root `<Composition>` sets `id`, `component`, `durationInFrames`, `fps`, `width`, and `height`.
- Remotion Player docs: `<Player>` renders a Remotion component in a React app with `durationInFrames`, `compositionWidth`, `compositionHeight`, and `fps`; `PlayerRef` supports imperative playback methods needed to seek/play/pause around cue ranges.

## Dependency Graph

```text
Wave 1:
T1 timeline compiler/tests ─┐
T2 sample slides/stage UI ──┼─> Wave 2:
                             ├─> T3 presenter Player shell + root integration
                             └─> T4 acceptance/docs finalization
```

## Parallel Execution Waves

| Wave | Tasks | Can Start When |
|------|-------|----------------|
| 1 | T1, T2 | Immediately after plan creation |
| 2 | T3 | T1 and T2 complete |
| 3 | T4 | T3 complete |

## Tasks

### T1: Timeline Contract And Tests

- **depends_on**: []
- **location**: `remotion-presentation/src/timeline/`, `remotion-presentation/src/slides/types.ts`, test files under `remotion-presentation/src/**/*.test.ts`
- **description**: Define slide/cue types, timing constants, and a pure compiler that validates slide-local cues and returns absolute cue and slide ranges.
- **validation**: Unit tests prove global frame compilation, derived duration, explicit override duration, duplicate cue rejection, non-increasing cue rejection, invalid frame rejection, and empty cue rejection.
- **status**: Complete
- **log**: Implemented by Wave 1 worker. `bun src/timeline/compileTimeline.test.ts` passed with 8 behavior checks.
- **files edited/created**: `remotion-presentation/src/slides/types.ts`, `remotion-presentation/src/timeline/constants.ts`, `remotion-presentation/src/timeline/compileTimeline.ts`, `remotion-presentation/src/timeline/index.ts`, `remotion-presentation/src/timeline/compileTimeline.test.ts`
- **backlog_item_id**: GH-3
- **backlog_item_url**: https://github.com/stefan-garofalo/torinojs-composition/issues/3
- **relation_mode**: native-subissue-and-body-links
- **assigned_skills**: `create-plan`, `swarm-planner`, `tdd`, `remotion:remotion-best-practices`
- **tdd_target**: A caller can pass two slide definitions with slide-local cues and receive absolute cue ranges plus derived slide durations.
- **review_mode**: cli

### T2: Two Sample Slides And Stage Primitives

- **depends_on**: []
- **location**: `remotion-presentation/src/slides/`, `remotion-presentation/src/components/presenter/`, `remotion-presentation/src/components/preview/`, `remotion-presentation/src/theme/`
- **description**: Create the two sample slides using the accepted schema: one narrative/text entrance slide and one code-plus-preview slide using Remocn code/typography primitives and a mocked notification preview.
- **validation**: Both sample slides export valid definitions, use 60fps timing constants, include content cues plus a slide-change cue, and render without visible debug/control metadata.
- **status**: Complete
- **log**: Implemented by Wave 1 worker. Two sample slides render through the accepted schema and use Remocn typography/code primitives plus mocked notification preview UI.
- **files edited/created**: `remotion-presentation/src/theme/presenter-theme.ts`, `remotion-presentation/src/components/presenter/stage-primitives.tsx`, `remotion-presentation/src/components/preview/mock-notification-preview.tsx`, `remotion-presentation/src/slides/narrative-entrance-slide.tsx`, `remotion-presentation/src/slides/code-preview-slide.tsx`, `remotion-presentation/src/slides/sample-slide-props.ts`, `remotion-presentation/src/slides/index.ts`
- **backlog_item_id**: GH-4
- **backlog_item_url**: https://github.com/stefan-garofalo/torinojs-composition/issues/4
- **relation_mode**: native-subissue-and-body-links
- **assigned_skills**: `create-plan`, `swarm-planner`, `tdd`, `remotion:remotion-best-practices`
- **tdd_target**: Rendering the sample slide registry exposes exactly two slide definitions, one narrative and one code-plus-preview, each with slide-local cues.
- **review_mode**: mixed

### T3: Fullscreen Keyboard Presenter

- **depends_on**: [T1, T2]
- **location**: `remotion-presentation/src/presenter/`, `remotion-presentation/src/Composition.tsx`, `remotion-presentation/src/Root.tsx`, `remotion-presentation/package.json`
- **description**: Add the Remotion Player dependency if missing, wire the compiled timeline into a fullscreen stage, and implement keyboard-only cue navigation for `ArrowRight`, `ArrowLeft`, `Home`, `End`, and `R`.
- **validation**: Lint/typecheck passes; root composition is 1920x1080 at 60fps; keyboard behavior can advance/reverse/restart cues; no controls, overlay, pause/play affordance, fullscreen key, or debug route exists.
- **status**: Complete
- **log**: Added `@remotion/player`, navigation helpers/tests, Player shell, Vite presenter host, compiled deck renderer, hold-frame pause behavior, and 1920x1080/60fps root composition.
- **files edited/created**: `remotion-presentation/package.json`, `remotion-presentation/bun.lock`, `remotion-presentation/tsconfig.json`, `remotion-presentation/vite.config.ts`, `remotion-presentation/index.html`, `remotion-presentation/src/index.css`, `remotion-presentation/src/presenter-entry.tsx`, `remotion-presentation/src/presenter/navigation.ts`, `remotion-presentation/src/presenter/navigation.test.ts`, `remotion-presentation/src/presenter/deck.tsx`, `remotion-presentation/src/presenter/PresenterPlayer.tsx`, `remotion-presentation/src/Composition.tsx`, `remotion-presentation/src/Root.tsx`
- **backlog_item_id**: GH-2
- **backlog_item_url**: https://github.com/stefan-garofalo/torinojs-composition/issues/2
- **relation_mode**: native-subissue-and-body-links
- **assigned_skills**: `create-plan`, `swarm-planner`, `tdd`, `remotion:remotion-best-practices`
- **tdd_target**: From cue index 0, invoking next, previous, first, last, and replay commands seeks to the expected cue start or hold frame.
- **review_mode**: mixed

### T4: Acceptance Audit And Implementation Notes

- **depends_on**: [T3]
- **location**: `wiki/specs/presenter/live-cue-based-remotion-presenter/IMPLEMENTATION-NOTES.md`, `wiki/specs/presenter/live-cue-based-remotion-presenter/PLAN.md`, `wiki/specs/presenter/live-cue-based-remotion-presenter/SPEC.md`
- **description**: Run the final CLI/browser checks, update plan task statuses/logs, write implementation notes, and audit every spec acceptance criterion.
- **validation**: `bun run lint` passes, a Remotion still/smoke render succeeds or an explicit blocker is recorded, implementation notes include execution mode `parallel`, sanity checks, acceptance audit, manual review checklist, and remaining work.
- **status**: Complete
- **log**: Ran focused tests, repo lint/typecheck, Remotion still renders, Studio HTTP smoke, and `agent-browser` live-keyboard validation. Acceptance audit recorded in implementation notes.
- **files edited/created**: `wiki/specs/presenter/live-cue-based-remotion-presenter/SPEC.md`, `wiki/specs/presenter/live-cue-based-remotion-presenter/PLAN.md`, `wiki/specs/presenter/live-cue-based-remotion-presenter/IMPLEMENTATION-NOTES.md`
- **backlog_item_id**: GH-1
- **backlog_item_url**: https://github.com/stefan-garofalo/torinojs-composition/issues/1
- **relation_mode**: native-subissue-and-body-links
- **assigned_skills**: `implement-spec`, `simplify`, `tdd`, `remotion:remotion-best-practices`
- **tdd_target**: The implemented gate satisfies every acceptance criterion from the epic-level spec or records a precise blocker.
- **review_mode**: mixed

## Testing Strategy

- Unit-test the timeline compiler first because it is pure and owns the strictest contract.
- Prefer public interfaces: compile slide definitions, invoke presentation navigation commands, render the public sample composition.
- Run `bun run lint` from `remotion-presentation/`.
- Run at least one Remotion still render against the presenter composition after integration.
- Use browser validation for interactive keyboard behavior if the local Studio/Player target can be launched cleanly.

## Risks And Mitigations

- **Player dependency mismatch**: install `@remotion/player` at the same exact Remotion version as the existing packages.
- **Parallel merge conflicts**: keep Wave 1 write scopes disjoint; only T3 owns root integration.
- **Registry component assumptions**: wrap or compose installed Remocn blocks instead of rewriting registry internals.
- **Keyboard behavior is hard to prove in render-only checks**: isolate cue navigation math into public helper functions and smoke-test the mounted Player.
- **Scope creep into full deck authoring**: enforce the two-slide gate and park full deck production for later epics.

## Validation Gates

- **Gate 1**: T1 and T2 complete with no overlapping file edits.
- **Gate 2**: T3 integrates timeline and slides into the Player shell.
- **Gate 3**: T4 proves lint, render/smoke, acceptance audit, and manual review checklist.

## Unresolved Questions

None for this epic gate.
