---
domain: presentation
type: implementation-notes
spec: realistic-notification-variant-code
surface: wiki
permission: project
links:
  - "[[specs/presentation/realistic-notification-variant-code/SPEC]]"
  - "[[specs/presentation/realistic-notification-variant-code/PLAN]]"
ingested: false
last_ingested: null
created: 2026-06-08
updated: 2026-06-08
---

# Implementation Notes: Realistic Notification Variant Code

## Summary

- Implementation complete except for tracker sync blocked by GitHub connector permissions. The DX preview now renders real notification variants through the registry, code-DX slides use realistic snippets with typed preview steps, and final CLI/browser validation passed.

## Execution Mode

- parallel

## Deviations From the Plan

- The `implement-spec` lifecycle requires a sibling `SPEC.md`. The planning run intentionally created only `PLAN.md`, so T0 created the minimal approved `SPEC.md` before app implementation.
- GitHub issue creation for the new owning story was attempted during planning and failed with connector permission `403`; backlog id remains blocked by connector permissions.

## Surprises and Decisions

- The project has shadcn configuration but no generated `src/components/ui` files, so implementation uses source-owned inline-style primitives grounded in existing stage tokens.
- `AvatarImage` uses Remotion `Img` instead of native `img` to satisfy Remotion lint rules.

## Sanity Checks

| Check | Result | Notes |
|------|--------|-------|
| T1 RED import check | Passed as expected | Missing `src/notifications` and `src/components/ui/*` imports failed before implementation. |
| T1 import check | Passed | `bun -e "await import('./src/notifications/index.ts')"` |
| T1 focused ESLint | Passed | `bunx eslint src/components/ui src/notifications` |
| Wave 2 focused ESLint | Passed | `bunx eslint src/components/ui src/notifications` |
| Wave 2 TypeScript | Passed | `bunx tsc --noEmit --pretty false` |
| T3 focused ESLint | Passed | `bunx eslint src/components/preview/mock-notification-preview.tsx src/notifications` |
| T3 TypeScript | Passed | `bunx tsc --noEmit --pretty false` |
| T4 RED mapping check | Passed as expected | `rg` found `resolvePreviewVariant`, `line.includes`, and `fileName.includes` before implementation. |
| T4 heuristic removal check | Passed | `rg` now finds typed `previewSteps` only. |
| T4 TypeScript | Passed | `bunx tsc --noEmit --pretty false` |
| T4 focused ESLint | Passed | `bunx eslint src/slides src/components/preview src/notifications` |
| Full lint | Passed | `bun run lint` |
| Remotion bundle | Passed with warning | `bun run build`; Remotion still warns that installed `zod` is 4.4.3 while it requests 4.3.6. |
| Forbidden surface scan | Passed | No production imports, real queries/mutations, routing, `fetch`, or `useEffect` in notification/preview/slide surfaces. |
| Moderation still | Passed | `/tmp/realistic-notifications-moderation-late.png` visually inspected; realistic code and moderation variant render. |
| Post-comment still | Passed | `/tmp/realistic-notifications-post-comment-late.png` visually inspected; realistic code and post-comment variant render. |
| Presenter browser smoke | Passed | `agent-browser` opened `http://localhost:3001/`, took screenshots, and exercised `ArrowRight`. |
| Studio browser smoke | Historical | Earlier validation used a non-starter Remotion Studio route. The starter workflow now validates `http://localhost:3001/`. |

## Acceptance Criteria Status

| Criterion | Status | Notes |
|-----------|--------|-------|
| All six variants compile and render from public notification module. | Met | Six variant files export named components/hooks through `src/notifications/index.ts`; `bun run lint` passes. |
| Fake hooks return deterministic `{ state, actions, meta }` without real IO. | Met | Variant hooks derive view models from fixtures and fake actions; forbidden-surface scan found no real IO/routing/effects. |
| Registry covers every `NotificationType`. | Met | `notificationRenderers satisfies Record<NotificationType, NotificationRenderer>` type-checks. |
| DX preview renders real notification variants from fixtures. | Met | `MockNotificationPreview` resolves fixtures and renders through `notificationRenderers`. |
| Code-DX slides use realistic snippets and typed preview steps. | Met | `notification-code-snippets.ts` supplies snippets and `CodeDxContent.previewSteps` drives preview state. |
| CLI and visual/browser validation completed. | Met | Full lint/build, still renders, presenter browser smoke, and Studio browser smoke completed. |

## Manual Review Checklist

| Area | Check | How to perform | Expected result |
|------|-------|----------------|-----------------|
| CLI | Re-run app checks | `cd remotion-presentation && bun run lint && bun run build` | Lint passes; build succeeds, with the known Remotion `zod` version warning. |
| Visual stills | Inspect representative code-DX frames | Open `/tmp/realistic-notifications-moderation-late.png` and `/tmp/realistic-notifications-post-comment-late.png` | Realistic code appears on the left and real notification variants render on the right. |
| Presenter | Smoke live presentation navigation | Open `http://localhost:3001/`, press `ArrowRight` through slides | Clean slide-only presenter surface advances without visible controls. |
| Presenter | Inspect current starter surface | Open `http://localhost:3001/` | The fullscreen presenter loads without Studio chrome. |
| Tracker | Finish backlog sync when permissions allow | Create or identify a GitHub story for this follow-up and replace `TBD-new-GitHub-story` in the plan | Tracker has a real product-facing owner for this implemented follow-up. |

## Pre-existing Issues

- Backlog story creation is blocked by GitHub connector permissions.

## Out of Scope Observations

- None yet.

## Remaining Work

- Tracker sync only: GitHub issue creation is blocked by connector permissions (`403 Resource not accessible by integration`). No implementation work remains.

## Steering

| Date | Feedback | Changes |
|------|----------|---------|
| 2026-06-08 | User requested realistic working React notification code and invoked `$implement-spec`. | Running plan in parallel mode. |
