---
domain: presenter
type: spec
status: implemented
surface: wiki
permission: project
links:
  - "https://github.com/stefan-garofalo/torinojs-composition/issues/1"
  - "https://github.com/stefan-garofalo/torinojs-composition/issues/2"
  - "https://github.com/stefan-garofalo/torinojs-composition/issues/3"
  - "https://github.com/stefan-garofalo/torinojs-composition/issues/4"
  - "[[specs/presenter/presenter-specs]]"
created: 2026-06-08
updated: 2026-06-08
id: GH-1
---

# Spec: Live Cue-Based Remotion Presenter

## User Input

> i want you to [$create-spec](/Users/stefan/Desktop/personale/keynotes/torinojs/comoposition-react/.agents/skills/create-spec/SKILL.md) --> [$create-plan](/Users/stefan/Desktop/personale/keynotes/torinojs/comoposition-react/.agents/skills/create-plan/SKILL.md) --> [$implement-spec](/Users/stefan/Desktop/personale/keynotes/torinojs/comoposition-react/.agents/skills/implement-spec/SKILL.md) the @github epic [https://github.com/stefan-garofalo/torinojs-composition/issues/1](https://github.com/stefan-garofalo/torinojs-composition/issues/1)
> https://github.com/stefan-garofalo/torinojs-composition/issues/4
> https://github.com/stefan-garofalo/torinojs-composition/issues/3
> https://github.com/stefan-garofalo/torinojs-composition/issues/2
>
> and all these subissues
>
> run all inner steps of all skills i tagged here. use [$remotion:remotion-best-practices](/Users/stefan/.codex/plugins/cache/openai-curated/remotion/3f0def1b/skills/remotion/SKILL.md) for impl
>
> implementation must be FULL PARALLEL

## Context

The Remotion presentation currently has a scaffolded project plus installed Remocn registry blocks, but the presentation still renders no real deck. The first epic is not the full talk; it is the live presenter foundation that makes the deck behave like a keyboard-driven keynote instead of a passive video.

The affected role is the presenter-author: they need to rehearse and present through semantic beats with reliable next/previous behavior. The first build gate must prove this model with two sample slides before the remaining 16-slide deck is authored.

## Non-Goals

- Authoring all 16 final slides.
- MP4 export.
- PPTX or Google Slides handout/export.
- A visual timeline editor.
- A debug route, rehearsal overlay, visible controls, or rendered cue metadata.
- A pause/play presentation model.
- A fullscreen keybinding.

## Acceptance Criteria

- The Remotion project exposes a fullscreen, slide-only stage at 16:9, 1920x1080, 60fps.
- The stage uses Remotion Player as the playback surface for interactive presentation control.
- Keyboard navigation supports only the accepted presentation controls: `ArrowRight`, `ArrowLeft`, `Home`, `End`, and `R`.
- `ArrowRight` advances to the next semantic cue animation and lands on that cue's hold state.
- `ArrowLeft` jumps directly to the previous cue's hold state.
- `Home` jumps to the first cue and `End` jumps to the final cue.
- `R` replays the current cue from its start frame.
- The stage has no visible controls, no pause/play affordance, no fullscreen key, no debug route, and no rendered cue metadata.
- Slides author cues as slide-relative ranges with `startFrame` and `holdFrame`.
- The timeline compiler produces absolute presenter frames from slide-local cues.
- Slide duration derives from the final cue `holdFrame` plus default padding unless the slide explicitly overrides duration.
- Slide-change is represented as an explicit semantic cue even when the visual transition is a clean cut.
- The compiler rejects duplicate cue ids, non-increasing cue ranges, invalid frames, and empty cue arrays.
- Two sample slides use the accepted slide schema.
- Cue navigation works across content cues and a slide-change cue.
- One sample slide demonstrates text/narrative entrance behavior.
- One sample slide demonstrates code or code-plus-preview behavior.
- Sample motion uses the accepted 60fps timing constants: 300ms text/small transitions and 600ms panel/large transitions.

## Constraints

- Use Bun for package management and project commands.
- Use Remotion best practices: frame-driven animation through `useCurrentFrame()`, explicit frame ranges, and Remotion composition metadata.
- Use Remocn registry components where this gate needs typography or code presentation primitives.
- Keep the implementation gate small: prove the presenter model with two sample slides, then stop.
- Use parallel implementation waves once implementation begins.
- Do not import real Traevolution notification UI; sample UI can be mocked.

## Technical Notes

- Existing Remotion app path: `remotion-presentation/`.
- Existing scaffold entry points: `remotion-presentation/src/Root.tsx`, `remotion-presentation/src/Composition.tsx`, `remotion-presentation/src/index.ts`.
- Installed Remocn registry examples include `GlassCodeBlock`, `LiveCodeCompilation`, and typography/transition blocks under `remotion-presentation/src/components/remocn/`.
- GitHub epic #1 links child stories #2, #3, and #4. Those child story bodies are the authoritative acceptance source for this spec.
- Remotion Player docs support using `<Player>` with `component`, `durationInFrames`, `compositionWidth`, `compositionHeight`, and `fps`, plus `PlayerRef` for imperative `play()`, `pause()`, `getCurrentFrame()`, and related controls.

## Decision Log

| Decision | Rationale |
|----------|-----------|
| The first epic proves only the presenter shell and two sample slides. | The backlog explicitly defines this as the first build gate before scaling to all 16 slides. |
| Slide cues are authored slide-relative and compiled globally. | This keeps each slide self-contained while giving the presenter one absolute playback timeline. |
| Slide transitions default to clean semantic slide-change cues. | The accepted visual grammar delegates the transition feeling to entering slide elements. |
| Presentation controls are keyboard-only. | The user rejected overlays, visible controls, pause/play, and fullscreen shortcuts. |
| Implementation runs in parallel waves. | The user explicitly required full parallel implementation. |
