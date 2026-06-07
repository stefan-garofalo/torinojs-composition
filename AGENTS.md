## Root Guidance

Primary skills here: `agent-browser`, `async-react-patterns`, `autoreview`, `create-plan`, `create-spec`, `debug-agent`, `design-taste-frontend`, `frontend-domain-structure`, `goalify`, `grill-me`, `implement-spec`, `improve-codebase-architecture`, `parallel-research`, `quality-types`, `requirements-grill`, `simplify`, `swarm-planner`, `tdd`, `vercel-composition-patterns`, `vercel-react-best-practices`, `write-backlog`.

This single-repo workspace owns a Remotion React/TypeScript presentation app in `remotion-presentation/` plus project knowledge in `wiki/`; keep changes scoped to those surfaces and do not treat the scaffolded Next.js wiki as the product app.

Before relying on external library behavior for implementation plans, inspect official docs first; use `opensrc path <package>` only for the focused runtime library whose source behavior materially affects the decision.

Use `portless` as the local-dev URL baseline when adding env examples, callback URLs, allowed origins, CORS, endpoint defaults, or app-to-app proxy targets.

When work here changes setup, workflow, contracts, or non-obvious behavior, update the relevant wiki/project docs in the same change.
