---
domain: presentation
type: plan
surface: wiki
permission: project
links: []
created: 2026-06-09
updated: 2026-06-09
---

# Plan: Progressive Notification Story

**Status:** Complete

## Situation

The notification section already has real React variants, code-plus-preview slides, and a navigable presenter. The story now needs the missing Fernando Rojo-style arc:

1. progressively build from one lean notification into prop/branch spaghetti;
2. progressively extract compound primitives into one good abstraction;
3. only then show all supported flavors.

## Locked Decisions

- Sequence: `one clean component -> add behavior -> add interaction -> add two actions -> moderation breaks it -> extract primitives -> build one good compound component -> show all flavors`.
- Keep every major step arrow-navigable.
- Show one good compound abstraction before showing the full export/registry.
- Keep changes scoped to `remotion-presentation/` and plan/docs in `wiki/`.

## Skill Phases

- `grill-me`: complete; user approved the exact sequence.
- `parallel-research`: skipped; local slide/snippet restructuring only.
- `swarm-planner`: tasks below are small, ordered, and independently reviewable.
- `tdd`: each task has a first public behavior target.
- Backlog sync: skipped; no backlog write/sync requested for this lean plan.

## Tasks

### T1: Rebuild Spaghetti Buildup Beats

- **depends_on**: []
- **location**: `remotion-presentation/src/slides/content.ts`, `remotion-presentation/src/slides/notification-code-snippets.ts`
- **description**: Replace the current early notification arc with navigable beats: lean post-like only, add follow action, add DM accept/ignore actions, then moderation as the breaking point.
- **validation**: Arrow navigation shows each added behavior as its own cue/beat before moderation.
- **status**: Complete
- **log**: Added progressive beats for lean post-like, follow-back interaction, DM accept/ignore actions, outside follow/DM usage before moderation, and moderation collapse.
- **files edited/created**:
  - `remotion-presentation/src/slides/content.ts`
  - `remotion-presentation/src/slides/notification-code-snippets.ts`
  - `remotion-presentation/src/slides/types.ts`
  - `remotion-presentation/src/notifications/types.ts`
  - `remotion-presentation/src/notifications/primitives.tsx`
  - `remotion-presentation/src/notifications/variants/dm-request-notification.tsx`
- **backlog_item_id**: N/A
- **backlog_item_url**: N/A
- **relation_mode**: body-links
- **assigned_skills**: [`implement-spec`, `simplify`, `tdd`, `agent-browser`]
- **tdd_target**: First prove the slide sequence contains the four progressive spaghetti beats in order before the moderation usage beat.
- **review_mode**: mixed

### T2: Rebuild Compound Primitive Buildup Beats

- **depends_on**: [T1]
- **location**: `remotion-presentation/src/slides/content.ts`, `remotion-presentation/src/slides/notification-code-snippets.ts`
- **description**: Add progressive extraction beats for compound primitives: row/container, actor, body, media, actions, then one complete good compound notification.
- **validation**: Presenter can navigate each primitive extraction beat and lands on one complete good abstraction before the all-flavors slide.
- **status**: Complete
- **log**: Added row, identity, copy, media, and actions extraction beats before the single good abstraction payoff.
- **files edited/created**:
  - `remotion-presentation/src/slides/content.ts`
  - `remotion-presentation/src/slides/notification-code-snippets.ts`
  - `remotion-presentation/src/slides/types.ts`
- **backlog_item_id**: N/A
- **backlog_item_url**: N/A
- **relation_mode**: body-links
- **assigned_skills**: [`implement-spec`, `simplify`, `tdd`, `agent-browser`, `design-taste-frontend`]
- **tdd_target**: First prove the compound buildup has at least five ordered extraction beats and a single complete abstraction payoff.
- **review_mode**: mixed

### T3: Reorder Final Payoff

- **depends_on**: [T2]
- **location**: `remotion-presentation/src/slides/content.ts`, `remotion-presentation/src/slides/notification-code-snippets.ts`
- **description**: Move the “all supported flavors/export registry” slide after the single good abstraction. Keep it as scaling proof, not the first solution.
- **validation**: Browser navigation order is single abstraction first, all flavors second.
- **status**: Complete
- **log**: Moved the all-flavors/export proof after the single good moderation abstraction and made its preview show every notification flavor vertically.
- **files edited/created**:
  - `remotion-presentation/src/slides/content.ts`
- **backlog_item_id**: N/A
- **backlog_item_url**: N/A
- **relation_mode**: body-links
- **assigned_skills**: [`implement-spec`, `simplify`, `agent-browser`]
- **tdd_target**: First prove the all-flavors slide no longer appears before the single abstraction payoff.
- **review_mode**: mixed

### T4: Validate Narrative Flow

- **depends_on**: [T1, T2, T3]
- **location**: `remotion-presentation/src/slides/**`
- **description**: Run lint/typecheck and browser-check the presenter at `http://localhost:3001/`, capturing evidence for the full notification arc.
- **validation**: `bun run lint` passes; browser screenshots or walkthrough confirm the ordered arc and no clipped code/preview regressions.
- **status**: Complete
- **log**: Ran lint/typecheck and browser walkthrough screenshots for the progressive arc.
- **files edited/created**:
  - `wiki/specs/presentation/progressive-notification-story/SPEC.md`
  - `wiki/specs/presentation/progressive-notification-story/IMPLEMENTATION-NOTES.md`
  - `wiki/specs/presentation/progressive-notification-story/PLAN.md`
- **backlog_item_id**: N/A
- **backlog_item_url**: N/A
- **relation_mode**: body-links
- **assigned_skills**: [`agent-browser`, `autoreview`, `tdd`]
- **tdd_target**: First prove the presenter can navigate through the complete notification arc without skipping or duplicating beats.
- **review_mode**: mixed

## Execution Waves

- Wave 1: T1
- Wave 2: T2
- Wave 3: T3
- Wave 4: T4

## Risks

- Too many beats can slow the talk; keep code snippets short and semantic.
- Dense spaghetti snippets can clip; adjust per-slide font/height only where needed.
- Preview panel should remain row-only and not reintroduce explanatory chrome.

## Unresolved Questions

- None.
