---
domain: presentation
type: spec
status: implemented
links:
  - "https://github.com/stefan-garofalo/torinojs-composition/issues/12"
  - "https://github.com/stefan-garofalo/torinojs-composition/issues/13"
  - "https://github.com/stefan-garofalo/torinojs-composition/issues/14"
created: 2026-06-08
updated: 2026-06-08
id: GH-12
---

# Spec: Mock Notification Preview System

## User Input

/goal i want you to [$create-spec](/Users/stefan/Desktop/personale/keynotes/torinojs/comoposition-react/.agents/skills/create-spec/SKILL.md) --> [$create-plan](/Users/stefan/Desktop/personale/keynotes/torinojs/comoposition-react/.agents/skills/create-plan/SKILL.md) --> [$implement-spec](/Users/stefan/Desktop/personale/keynotes/torinojs/comoposition-react/.agents/skills/implement-spec/SKILL.md) the @github epic [https://github.com/stefan-garofalo/torinojs-composition/issues/12](https://github.com/stefan-garofalo/torinojs-composition/issues/12) and all its subissues: [https://github.com/stefan-garofalo/torinojs-composition/issues/14](https://github.com/stefan-garofalo/torinojs-composition/issues/14)
[https://github.com/stefan-garofalo/torinojs-composition/issues/13](https://github.com/stefan-garofalo/torinojs-composition/issues/13)

checkout to new branch for the epic

run all inner steps of all skills i tagged here. use [$remotion:remotion-best-practices](/Users/stefan/.codex/plugins/cache/openai-curated/remotion/3f0def1b/skills/remotion/SKILL.md) for implementation. go full parallel with subagents when implementing. CHECK with [$agent-browser](/Users/stefan/Desktop/personale/keynotes/torinojs/comoposition-react/.agents/skills/agent-browser/SKILL.md) the presentation to validate.

once done and everything works create pr and merge with rebase onto main. then close the backlog

GitHub epic #12 outcome:

Recreate the notification examples as clear, fake stage UI that demonstrates structural variation without importing the production app.

GitHub story #13 outcome:

The keynote can show fake notification variants that make supported shapes visible.

GitHub story #14 outcome:

Code examples in the talk drive meaningful right-panel preview states.

## Context

The Remotion keynote already has a dark JavaScript visual-system proof and stage primitives. The talk content is about making structural variation visible in a notification UI API: follow request, post like, DM request, photo tag, moderation, and post comment all look like notifications, but each carries different product rules.

This spec defines the stage-facing preview system for those examples. It is for the presenter and audience, not app users. The preview should help the audience see why a generic `NotificationItem` becomes prop soup and why named notification abstractions make supported shapes explicit.

## Non-Goals

- Do not import Traevolution app components, Expo/React Native dependencies, generated API types, app routes, or production notification logic.
- Do not live-compile arbitrary user code.
- Do not simulate production notification behavior perfectly.
- Do not build the whole keynote deck beyond the notification-preview slides needed for this epic.
- Do not rewrite `slides-content.md`, `deck-beats.md`, or `fragments.md`.

## Acceptance Criteria

- Mock preview variants cover follow request, post like, DM request, photo tag, moderation, and post comment.
- Variants communicate actor/avatar versus system icon, body, context preview, media/thumbnail, actions, and date where those fields belong.
- Preview UI uses shadcn-style cards, typography, avatars, buttons, badges, separators, and panels.
- Preview UI is fake, conceptual, and readable from stage distance at 1920x1080.
- Moderation code maps to a system-icon/action-oriented preview state.
- Explicit export and variant examples map to supported-shape preview states.
- New behavior/new place examples show shared primitives plus a distinct post-comment variant.
- Preview updates happen only on slides where code demonstrates a meaningful shape change.
- The Remotion presentation validates through CLI checks plus a browser presentation check.

## Constraints

- Use the existing Remotion app and stage visual system under `remotion-presentation/`.
- Use Remotion-safe animation rules: frame-driven state via `useCurrentFrame`, no CSS transitions for rendered motion.
- Keep the preview stage-readable rather than production-faithful.
- Keep changes scoped to `remotion-presentation/` and `wiki/specs/presentation/GH-12-mock-notification-preview-system/`, plus required wiki index/log bookkeeping.
- Use full parallel implementation mode once `implement-spec` begins.
- Use concise GitHub comments or native close state for backlog sync; do not rewrite product-facing issue bodies with task internals.

## Technical Notes

- `origin/main` currently has no `MockNotificationPreview`, `codeEvents`, or `renderPreview` API in `LiveCodeCompilation`, despite prior issue comments mentioning partial groundwork from another branch.
- Current `LiveCodeCompilation` is a button demo with hardcoded events and a hardcoded right preview; it must become reusable for notification code-plus-preview slides.
- Existing stage primitives are source-owned Remotion React components with shadcn-like surfaces and exact dark JavaScript tokens.
- Content sources identify the required shapes and mapping moments: `slides-content.md`, `deck-beats.md`, `fragments.md`, and the grill status/log.

## Decision Log

| Decision                                                                  | Rationale                                                                                                |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Use `presentation` as the spec domain.                                    | Scope is the Remotion keynote stage surface.                                                             |
| Treat this spec as approved for execution.                                | The user requested the complete create-spec to create-plan to implement-spec chain in one goal.          |
| Build conceptual fake UI only.                                            | GitHub #12 and grill docs explicitly reject production app imports and production-faithful cloning.      |
| Use code-driven preview states only where shape changes are demonstrated. | Story #14 requires meaningful mapping, not a preview that changes on every slide.                        |
| Include post comment as the second stress-test variant.                   | Story #13 says post comment where used, and the content docs make it the new-behavior/new-place example. |
