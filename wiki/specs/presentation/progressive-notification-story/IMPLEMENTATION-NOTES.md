---
domain: presentation
type: implementation-notes
spec: progressive-notification-story
links:
  - "[[specs/presentation/progressive-notification-story/SPEC]]"
ingested: false
last_ingested: null
created: 2026-06-09
updated: 2026-06-09
---

# Implementation Notes

## Summary

- Implemented the progressive notification story arc in the Remotion presenter.
- Added a complete spec folder preflight because the approved plan existed without `SPEC.md`.

## Execution Mode

- sequential

## Deviations From the Plan

- Added the missing `SPEC.md` preflight from the already approved plan so `implement-spec` has a complete spec folder.

## Surprises and Decisions

- DM request preview needed two actions to match the new story beat, so the notification row view model now supports `actions` while preserving the existing single `action` shape.
- Code-DX previews now always start from their final UI state to avoid an initial wrong preview flicker while code lines animate.

## Sanity Checks

| Check | Result | Notes |
|------|--------|-------|
| `bun run lint` | Pass | Ran in `remotion-presentation/`; includes ESLint and TypeScript. |
| Browser walkthrough | Pass | Captured progressive arc screenshots from `http://localhost:3001/`. |
| Early code-DX preview sample | Pass | `/tmp/code-dx-final-preview-from-start.png` shows final preview state from the beginning. |

## Acceptance Criteria Status

| Criterion | Status | Notes |
|-----------|--------|-------|
| Spaghetti buildup has post-like, follow, DM two-action, and moderation beats | Met | Added code-DX slides before moderation usage. |
| Outside follow/DM usage appears before moderation spaghetti | Met | Added `The outside still looks fine` before `More branches`. |
| Compound buildup has primitive extraction beats | Met | Added row, identity, copy, media, and actions extraction beats. |
| One good abstraction appears before all flavors | Met | `The shape is in the code` now precedes `Then scale the pattern`. |
| Right preview panel remains row-only | Met | Existing row-only preview preserved. |
| `bun run lint` passes | Met | Passed. |

## Manual Review Checklist

| Area | Check | How to perform | Expected result |
|------|-------|----------------|-----------------|
| Presenter story | Walk the notification section | Open `http://localhost:3001/`, use `ArrowRight` through the notification arc. | The arc moves from clean post-like to follow, DM, moderation collapse, primitive extraction, one good abstraction, then all flavors. |
| DM preview | Verify two actions | Navigate to `Then two actions`. | Right preview shows Accept and Ignore buttons. |
| Request usage bridge | Verify follow/DM call sites | Navigate to `The outside still looks fine`. | Code shows follow request and DM request call sites before moderation spaghetti. |
| Payoff order | Verify final ordering | Navigate after primitive extraction beats. | Single moderation abstraction appears before the all-flavors/export slide. |
| All flavors stack | Verify final scale proof | Navigate to `Then scale the pattern`. | Right preview shows all notification flavors vertically. |

## Remaining Work

- None.
