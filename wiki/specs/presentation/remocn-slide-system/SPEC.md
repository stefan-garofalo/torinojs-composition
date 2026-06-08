---
domain: presentation
type: spec
status: implemented
links:
  - "https://github.com/stefan-garofalo/torinojs-composition/issues/5"
  - "https://github.com/stefan-garofalo/torinojs-composition/issues/6"
  - "https://github.com/stefan-garofalo/torinojs-composition/issues/7"
  - "https://github.com/stefan-garofalo/torinojs-composition/issues/8"
created: 2026-06-08
updated: 2026-06-08
id: GH-5
---

# Spec: Remocn Slide System And Motion Vocabulary

## User Input

/goal i want you to [$create-spec](/Users/stefan/Desktop/personale/keynotes/torinojs/comoposition-react/.agents/skills/create-spec/SKILL.md) --> [$create-plan](/Users/stefan/Desktop/personale/keynotes/torinojs/comoposition-react/.agents/skills/create-plan/SKILL.md) --> [$implement-spec](/Users/stefan/Desktop/personale/keynotes/torinojs/comoposition-react/.agents/skills/implement-spec/SKILL.md) the @github epic [https://github.com/stefan-garofalo/torinojs-composition/issues/5](https://github.com/stefan-garofalo/torinojs-composition/issues/5) and all its subissues: [https://github.com/stefan-garofalo/torinojs-composition/issues/6](https://github.com/stefan-garofalo/torinojs-composition/issues/6) [https://github.com/stefan-garofalo/torinojs-composition/issues/7](https://github.com/stefan-garofalo/torinojs-composition/issues/7)
[https://github.com/stefan-garofalo/torinojs-composition/issues/8](https://github.com/stefan-garofalo/torinojs-composition/issues/8)

checkout to new branch for the epic

run all inner steps of all skills i tagged here. use [$remotion:remotion-best-practices](/Users/stefan/.codex/plugins/cache/openai-curated/remotion/3f0def1b/skills/remotion/SKILL.md) for implementation. go full parallel with subagents when implementing. CHECK with [$agent-browser](/Users/stefan/Desktop/personale/keynotes/torinojs/comoposition-react/.agents/skills/agent-browser/SKILL.md) the presentation to validate.

once done and everything works create pr and merge with rebase onto main. then close the backlog

## Context

The Remotion app already has a dark JavaScript visual system proof: shared 1920x1080 stage tokens, narrative/code/DX panel layout primitives, and installed Remocn registry components. The next product need is the reusable slide system that turns the pinned talk content in `slides-content.md`, `deck-beats.md`, and `fragments.md` into a coherent Remotion-native keynote.

The talk is for TorinoJS attendees watching a live keynote about React compound components. The deck must make structural API variation visible: prop soup, explicit named shapes, compound primitives, provider context, registry coverage, TypeScript unions, and the final rule that configuration is for values while composition is for shape.

## Non-Goals

- Do not create tech/glitch typography effects.
- Do not replace Remocn registry components with custom equivalents when an installed component already fits.
- Do not use the code-plus-DX-panel layout for every code slide.
- Do not add a right-side UI preview when the code only needs to carry an API shape.
- Do not rewrite the talk content or change the thesis.
- Do not build the scaffolded wiki app as the product app.

## Acceptance Criteria

- The Remotion composition renders the pinned talk as a multi-slide keynote instead of the current three-family visual-system sample.
- Narrative slides support titles, subtitles, bullet groups, emphasis lines, and readable cue holds from `slides-content.md`.
- Narrative text entrances use classic Remocn typography motion.
- Typography motion remains normal/classic and avoids tech/glitch effects.
- Code-only slides use `GlassCodeBlock` as their code renderer.
- Code-only snippets remain readable at 1920x1080.
- Code-only reveal timing uses shared motion constants where applicable.
- Code-only slides are visually distinct from code-plus-DX-panel slides.
- Code-plus-DX-panel slides use `LiveCodeCompilation` as the base layout.
- The DX panel means only the right-side UI preview, not the whole split slide.
- Code-plus-DX-panel slides accept different snippets and preview states through reusable props.
- The code-plus-DX-panel layout appears only where code demonstrates meaningful shape change.
- The deck preserves the existing dark JavaScript visual system and 1920x1080 stage readability.
- Browser validation confirms representative narrative, code-only, and code-plus-DX-panel moments render in Remotion Studio.

## Constraints

- Remocn registry components must create the presentation itself.
- The exact source content is `slides-content.md`, `deck-beats.md`, and `fragments.md`.
- Output target remains 1920x1080 at 60fps.
- Implementation must run in parallel worker waves.
- Validation must include `agent-browser` against the local presentation.
- Backlog closeout must cover epic #5 plus stories #6, #7, and #8.

## Technical Notes

- Issue #8 is already closed, but the current `main` branch does not include the parameterized `LiveCodeCompilation` behavior described in its closeout comment. The earlier branch `team/stefan/epic-1-remotion-presenter` contains reusable source evidence for that work.
- The current app root renders `MyComp` from `remotion-presentation/src/Composition.tsx`.
- Existing Remocn components include `GlassCodeBlock`, `LiveCodeCompilation`, `StaggeredFadeUp`, `TextFadeReplace`, `InlineHighlight`, and `MarkerHighlight`.
- Remotion best-practice rules used for this spec: composition metadata, `Series`/`Sequence` timing, explicit `interpolate` timing, classic text animation, and text overflow awareness.

## Decision Log

| Decision | Rationale |
|----------|-----------|
| Use one unified spec for #5. | The parent epic owns one reusable slide system and the child stories are three facets of that system. |
| Treat #8 as verification plus reuse scope. | GitHub marks #8 closed, but current `main` lacks the implementation evidence; this epic must preserve or restore it. |
| Approve the spec immediately for execution. | The user explicitly requested create-spec -> create-plan -> implement-spec in one goal and the backlog/grill docs remove blocking ambiguity. |
| Use `presentation` as the domain. | The work changes the Remotion keynote stage surface and related project wiki docs. |
