---
domain: presentation
type: implementation-notes
spec: GH-12
links:
  - "[[specs/presentation/GH-12-mock-notification-preview-system/SPEC]]"
ingested: false
last_ingested: null
created: 2026-06-08
updated: 2026-06-08
---

# Implementation Notes: Mock Notification Preview System

## Execution Mode

parallel

## Execution Board

| Wave   | Tasks                                                           | Status   |
| ------ | --------------------------------------------------------------- | -------- |
| Wave 1 | T1 Notification preview variants, T2 Reusable live code mapping | Complete |
| Wave 2 | T3 Composition integration                                      | Complete |
| Wave 3 | T4 Validation, docs, PR, merge, backlog close                   | Complete |

## Sanity Checks

- Installed dependencies with `cd remotion-presentation && bun install`.
- Focused Wave 1/2 lint passed:
  - Command: `cd remotion-presentation && bunx eslint src/Composition.tsx src/components/preview src/components/remocn/live-code-compilation.tsx`
  - Result: passed.
- Remotion bundle passed:
  - Command: `cd remotion-presentation && bun run build`
  - Result: passed and generated `remotion-presentation/build`, then parent removed the generated build directory from the git diff.
- Representative stills passed:
  - Command: `cd remotion-presentation && bunx remotion still MyComp --frame=0 --scale=0.5 /tmp/gh12-overview.png`
  - Command: `cd remotion-presentation && bunx remotion still MyComp --frame=1050 --scale=0.5 /tmp/gh12-moderation.png`
  - Command: `cd remotion-presentation && bunx remotion still MyComp --frame=2130 --scale=0.5 /tmp/gh12-post-comment.png`
  - Result: all three rendered.
- Agent-browser validation passed:
  - Studio command: `cd remotion-presentation && bun run dev -- --port=3012`
  - Browser commands: `agent-browser open http://localhost:3012`, `agent-browser snapshot -i`, `agent-browser screenshot /tmp/gh12-agent-browser-overview.png`
  - Result: browser snapshot exposed the Remotion Studio `MyComp` preview and all six variant headings.
- Full lint status:
  - Command: `cd remotion-presentation && bun run lint`
  - Result: blocked by existing `oxlint.config.ts` ultracite module-resolution/type errors.
- Remotion warning:
  - Build/still/studio warn that installed `zod` is `4.4.3` while Remotion asks for `4.3.6`; build and still rendering still completed.

## Acceptance Audit

| Acceptance criterion                                                                                                                       | Status | Evidence                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mock preview variants cover follow request, post like, DM request, photo tag, moderation, and post comment.                                | Met    | `notificationPreviewVariantIds` exports all six variants, and the overview frame/browser snapshot shows all six headings.                                        |
| Variants communicate actor/avatar versus system icon, body, context preview, media/thumbnail, actions, and date where those fields belong. | Met    | Preview fixtures include avatar variants, a moderation system icon, bodies, quotes/meta, media placeholders, shape-specific actions, and timestamps.             |
| Preview UI uses shadcn-style cards, typography, avatars, buttons, badges, separators, and panels.                                          | Met    | `MockNotificationPreview` uses stage token cards, avatar/system icon treatments, badges, separators, button-like actions, media panels, and compact typography.  |
| Preview UI is fake, conceptual, and readable from stage distance at 1920x1080.                                                             | Met    | No production imports; stills at overview/moderation/post-comment were visually inspected after render.                                                          |
| Moderation code maps to a system-icon/action-oriented preview state.                                                                       | Met    | Moderation frames show a system icon with `View decision` and `Appeal`; still `/tmp/gh12-moderation.png`.                                                        |
| Explicit export and variant examples map to supported-shape preview states.                                                                | Met    | Supported-shapes scene maps export-list fragments through `variantId` preview updates.                                                                           |
| New behavior/new place examples show shared primitives plus a distinct post-comment variant.                                               | Met    | Post-comment scene maps `PostCommentNotification` code to the `post-comment` preview with comment quote, media, and `Reply`; still `/tmp/gh12-post-comment.png`. |
| Preview updates happen only on slides where code demonstrates a meaningful shape change.                                                   | Met    | Only the five code-plus-preview scenes use `LiveCodeCompilation` preview state; overview is static.                                                              |
| The Remotion presentation validates through CLI checks plus a browser presentation check.                                                  | Met    | Focused ESLint, build, still renders, and agent-browser Studio snapshot passed; full lint blocker is recorded separately.                                        |

## Surprises And Decisions

- `origin/main` does not contain the prior `MockNotificationPreview` or reusable `LiveCodeCompilation` groundwork mentioned in GitHub comments, so this run implemented those surfaces from scratch.
- Grill docs identify `src/components/preview/` as the expected home for preview components; the initial plan was corrected from `components/notifications` to `components/preview`.
- Parent review tightened preview fixture semantics after Wave 1 so fake actions match the content docs rather than generic social-app labels.
- Parent visual review removed demo-era `Preview HMR` visible text from `LiveCodeCompilation` and increased code panel readability before final still/browser checks.
- Read-only review caught clipped overview mini-previews; parent fixed the overview scale/grid before final validation.
- Full lint remains blocked by existing config/tooling issues outside this epic. This branch does not alter `oxlint.config.ts`.

## Remaining Work

- No remaining in-scope implementation, documentation, or validation work is parked.
- GitHub PR merge and issue closure are performed as native tracker state after the branch commit.

## Manual Review Checklist

| Area                 | Check                                                        | How to perform                                                                                                 | Expected result                                                                                                       |
| -------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Variant coverage     | Confirm all six notification shapes render.                  | Open `/tmp/gh12-overview.png` or run Remotion Studio and inspect the first frame.                              | Follow request, post like, DM request, photo tag, moderation, and post comment are visible.                           |
| Moderation mapping   | Confirm generic moderation props drive a moderation preview. | Open `/tmp/gh12-moderation.png`.                                                                               | Code mentions moderation shape; preview shows system icon, `View decision`, `Appeal`, and sensitive-copy/meta fields. |
| Post-comment mapping | Confirm new behavior/new place maps to a distinct variant.   | Open `/tmp/gh12-post-comment.png`.                                                                             | Code mentions `PostCommentNotification`; preview shows actor, comment quote, media/thread preview, and `Reply`.       |
| Browser smoke        | Confirm the presentation loads in Studio.                    | Run `cd remotion-presentation && bun run dev -- --port=3012`, then `agent-browser open http://localhost:3012`. | `MyComp` opens and the first frame exposes the all-variants overview.                                                 |
| Build smoke          | Confirm Remotion still bundles.                              | Run `cd remotion-presentation && bun run build`.                                                               | Bundle completes; the known zod version warning may still appear.                                                     |
| Lint caveat          | Confirm lint is not over-claimed.                            | Run `cd remotion-presentation && bun run lint`.                                                                | Full lint is expected to remain blocked by existing `oxlint.config.ts` ultracite module-resolution/type errors.       |
