---
domain: presentation
type: spec
surface: wiki
permission: project
status: implemented
links: []
created: 2026-06-09
updated: 2026-06-09
---

# Spec: Progressive Notification Story

## Goal

Reshape the notification section so it teaches the compound-components pattern progressively.

## Acceptance Criteria

- The spaghetti buildup has arrow-navigable beats for:
  - one lean post-like notification component;
  - follow behavior with a follow-back action;
  - DM request behavior with accept and ignore actions;
  - moderation as the break point.
- The compound-components buildup has arrow-navigable beats for extracting primitives before showing a full good abstraction.
- One complete good abstraction appears before the all-flavors/export/registry proof.
- The presenter remains visually clean: right preview panel shows only the notification row.
- `bun run lint` passes.
