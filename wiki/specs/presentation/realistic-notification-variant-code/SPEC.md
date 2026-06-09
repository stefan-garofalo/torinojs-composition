---
domain: presentation
type: spec
surface: wiki
permission: project
status: implemented
links:
  - "[[specs/presentation/realistic-notification-variant-code/PLAN]]"
  - "https://github.com/stefan-garofalo/torinojs-composition/issues/12"
  - "https://github.com/stefan-garofalo/torinojs-composition/issues/13"
  - "https://github.com/stefan-garofalo/torinojs-composition/issues/14"
created: 2026-06-08
updated: 2026-06-08
---

# Spec: Realistic Notification Variant Code

## Goal

Replace illustrative notification snippets in the Remotion keynote with actual working React notification variant code that can be shown in code blocks and rendered in the DX preview panel.

## Problem

The current presentation proves the visual idea with fake preview cards, but the source code shown in the slides is still partly pseudo-code. The talk is about making supported shapes visible through composition, so the deck needs real source-owned React examples that model the intended API.

## Scope

- Build six working notification variants: follow request, post like, DM request, photo tag, moderation, and post comment.
- Use fake deterministic hooks for reads/actions instead of real queries or mutations.
- Use source-owned shadcn-style Card, Avatar, Button, and typography primitives in the presentation app.
- Render the DX panel from the real notification registry and fixtures instead of a parallel preview-only schema.
- Wire code blocks to realistic notification source snippets and typed preview steps.

## Out Of Scope

- Production Traevolution app imports.
- Real routing, generated API types, queries, mutations, or network IO.
- A complete product notification system beyond the keynote examples.
- Visible presenter controls or debug overlays.

## Acceptance Criteria

- All six variants compile and render from the public notification module.
- Fake hooks return deterministic `{ state, actions, meta }` models without effects, queries, mutations, or routing.
- Registry coverage makes every `NotificationType` map to a renderer.
- The DX preview panel renders real notification variants from fixtures.
- Code-DX slides use realistic snippets and explicit typed preview steps, not string/file-name inference.
- Validation includes CLI checks plus representative visual/browser review of the presenter or Studio frames.
