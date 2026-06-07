---
domain: presentation
type: spec
status: implemented
links:
  - "https://github.com/stefan-garofalo/torinojs-composition/issues/9"
  - "https://github.com/stefan-garofalo/torinojs-composition/issues/10"
  - "https://github.com/stefan-garofalo/torinojs-composition/issues/11"
created: 2026-06-08
updated: 2026-06-08
id: GH-9
---

# Spec: Dark JavaScript Visual System

## User Input

i want you to [$create-spec](/Users/stefan/.codex/worktrees/add2/comoposition-react/.agents/skills/create-spec/SKILL.md) --> [$create-plan](/Users/stefan/.codex/worktrees/add2/comoposition-react/.agents/skills/create-plan/SKILL.md) --> [$implement-spec](/Users/stefan/.codex/worktrees/add2/comoposition-react/.agents/skills/implement-spec/SKILL.md) IN FULL PARALLEL MODE

 the @github epic [https://github.com/stefan-garofalo/torinojs-composition/issues/9](https://github.com/stefan-garofalo/torinojs-composition/issues/9) and its subtasks:
[https://github.com/stefan-garofalo/torinojs-composition/issues/10](https://github.com/stefan-garofalo/torinojs-composition/issues/10)
[https://github.com/stefan-garofalo/torinojs-composition/issues/11](https://github.com/stefan-garofalo/torinojs-composition/issues/11)

run all inner steps of all skills i tagged here. use [$vercel:shadcn](/Users/stefan/.codex/plugins/cache/openai-curated/vercel/3f0def1b/skills/shadcn/SKILL.md) for impl

GitHub epic #9 outcome:

Define and apply the dark JavaScript visual system for the stage experience.

GitHub story #10 outcome:

The keynote has shared theme tokens and layout defaults that every slide can use.

GitHub story #11 outcome:

Slides share a consistent stage layout rhythm that supports readable text, code, and preview panels.

## Context

This Remotion keynote needs a visual system suitable for a live JavaScript talk projected at 1920x1080. The audience must be able to read narrative text, code, and fake notification UI previews quickly from a stage distance.

The current grill decision set has already locked a darkmode-first JavaScript palette and shadcn-style UI defaults. This spec turns that backlog scope into one epic-level product contract covering theme tokens, shared layout rhythm, and readability.

## Non-Goals

- Do not recreate the light PowerPoint template literally.
- Do not build a custom design system from scratch.
- Do not make decorative slide-level transition effects the default visual grammar.
- Do not import production Traevolution UI components.
- Do not solve the full slide content implementation or presenter timeline in this spec.

## Acceptance Criteria

- JavaScript yellow is available as the canonical accent token with exact value `#F0DB4F`.
- Dark grey / black wool is available as the canonical dark base token with exact value `#323330`.
- The presentation is darkmode-first across the stage background, code surfaces, and preview UI surfaces.
- Theme defaults follow shadcn-style conventions for typography, spacing, radius, cards, buttons, and general UI proportions.
- Narrative slides, code-only slides, and code-plus-DX-panel slides share a consistent spacing and typography rhythm.
- Text, code, and UI elements are readable at the target 1920x1080 stage resolution.
- Dark backgrounds, yellow accents, and neutral shadcn-style surfaces are applied consistently across the sample presentation surface.
- The visual system keeps code contrast high enough that syntax, line grouping, and key API shapes remain legible.

## Constraints

- Visual decisions must preserve projector readability over decorative density.
- Yellow should act as an accent and topic anchor, not as the dominant background.
- Neutral UI surfaces should feel shadcn-like: compact, crisp, legible, and understated.
- The deck must keep the stage clean; cue labels, counters, and debug UI must not render as part of this visual system.
- Implementation must use full parallel mode once `implement-spec` begins.
- Implementation should use the `vercel:shadcn` guidance and existing shadcn configuration rather than inventing a bespoke UI framework.

## Technical Notes

- The Remotion app currently has `components.json` configured for `new-york`, neutral base color, Tailwind v4 CSS variables, and Remocn registry entries.
- The Remotion root currently renders a placeholder composition, so the implementation can prove the visual system with a focused stage composition.
- Grill status identifies the accepted visual tokens, 1920x1080 output, 60fps runtime, and Remocn/shadcn-style presentation substrate.

## Decision Log

| Decision | Rationale |
|----------|-----------|
| Use `presentation` as the spec domain. | The scope is the Remotion keynote stage surface, not the scaffolded wiki app. |
| Treat the spec as approved for execution. | The user requested the full create-spec to create-plan to implement-spec chain in one goal, and the linked grill docs show no open visual-system ambiguities. |
| Use dark JavaScript palette tokens literally. | GitHub #10 and the grill status require exact `#F0DB4F` and `#323330` values. |
| Keep the visual grammar shadcn-style, not custom. | GitHub #9/#10 request shadcn defaults for proportions, cards, buttons, typography, spacing, and radius. |
