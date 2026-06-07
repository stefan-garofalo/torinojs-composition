# Prompt Spec

Target file: `AGENTS.md`
Scope: `root`
Workspace: `.`
Seed mode: `generated`

## House structure

- Start with one `## <Scope> Guidance` heading.
- Put one `Primary skills here: ...` line near the top.
- Never put phase skills in scoped `AGENTS.md` primary-skill lines. Keep `requirements-phase`, `delivery-phase`, `debugging-phase`, `review-phase`, `resolve-debt-phase`, and `docs-ingest-phase` as global orchestration entrypoints only.
- Follow with one short paragraph defining the scope boundary: what belongs here vs elsewhere.
- Treat every authored `AGENTS.md` file as the neutral source of truth and create a sibling `CLAUDE.md` symlink mirror that points to it.
- Add `opensrc` / source-inspection guidance only when this scope actually needs it.
- Add portless guidance only to the root/handoff, or to a scoped prompt that directly owns local URL, origin, callback, CORS, or proxy configuration.
- End with the docs-update rule when work in this scope changes setup, workflow, contracts, or non-obvious behavior.
- Add extra focused sections only when the detected scope truly needs them.

## Selected packs

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

## Primary skills

- `agent-browser`
- `async-react-patterns`
- `autoreview`
- `create-plan`
- `create-spec`
- `debug-agent`
- `design-taste-frontend`
- `frontend-domain-structure`
- `goalify`
- `grill-me`
- `implement-spec`
- `improve-codebase-architecture`
- `parallel-research`
- `quality-types`
- `requirements-grill`
- `simplify`
- `swarm-planner`
- `tdd`
- `vercel-composition-patterns`
- `vercel-react-best-practices`
- `write-backlog`

## Source inspection

- No arbitrary concrete `opensrc` repositories are invented by scaffold.
- During post-scaffold setup, decide which detected core libraries materially affect prompt or lint authoring, then run `opensrc path <package>` or `opensrc path owner/repo` for those libraries before relying on source behavior.

## Authoring guidance

- Keep the final prompt concise, imperative, and scope-first.
- Match the existing repo house style used by the detected workspace prompt files.
- Preserve this order: heading, `Primary skills here`, scope boundary, optional `opensrc`, docs update rule.
- Keep phase skills out of every scoped `AGENTS.md`; invoke phases from the parent goal/handoff flow instead.
- Route broader monorepo concerns back to the root prompt instead of repeating them in every scope.
- If a seed prompt exists in the source repo, preserve repo-specific constraints while reconciling them with the detected pack set.
- Keep `$docs-ingest-phase` invocation in prompt files, not in generated docs pages.