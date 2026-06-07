# Subagent Manifest Prompt

Populate `.agents/subagents/manifest.mjs` from the detected repo shape and selected packs.

## Detected Workspaces

- `remotion-presentation`
- `wiki`

## Selected Packs

- `debug`
- `docs`
- `frontend`
- `planning`
- `quality`
- `react`
- `requirements`
- `research`
- `subagents`
- `typescript`

## Requirements

- Keep capability packs narrow and reusable.
- Keep specialist agents scoped by owned paths and guidance files.
- Include `simplify` in every implementation-focused specialist.
- Keep docs ownership in a dedicated docs specialist when `docs/` exists.
- Use explicit skill lists when runtime inheritance differs across harnesses.