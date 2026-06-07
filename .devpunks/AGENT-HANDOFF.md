# Agent Handoff

You are continuing a `punks scaffold` run.

## What was scaffolded

- Final root/docs/workspace prompt files were not written yet.
- Shared global prompt scaffolding under `.agents/`.
- Prompt specs under `.devpunks/specs/prompts/`.
- Selected lint asset specs under `.devpunks/specs/lint/`.
- Subagent manifest scaffolding/specs under `.agents/subagents/` and `.devpunks/specs/subagents/`.
- Scaffold manifest at `.devpunks/scaffold-manifest.json`.
- Required tools manifest at `.devpunks/required-tools.json`.
- Tool bootstrap: `agent-browser` was already present.
- Tool bootstrap: `clawpatch` was already present.
- Tool bootstrap: `debug-agent` was already present.
- Tool bootstrap: `opensrc` was already present.
- Tool bootstrap: `portless` was already present.
- Tool bootstrap: `skills` was already present.

## Repo shape

- Repo shape mode: `single`
- Effective monorepo: `no`
- Detected technologies: `nextjs`, `react`
- Final packs: `debug`, `docs`, `frontend`, `planning`, `quality`, `react`, `requirements`, `research`, `subagents`, `typescript`

## Required next actions

1. Read `.devpunks/scaffold-manifest.json` first for the full pack/spec metadata.
2. Use the prompt spec files to author final prompt files. Do not treat the spec files as final prompt bodies.
3. Match the existing prompt house style from this repo: one `## ... Guidance` heading, `Primary skills here`, one short scope paragraph, optional `opensrc` guidance only when needed, then the docs-update rule.
3a. Read the required tools manifest and confirm `skills`, `portless`, `opensrc`, and `agent-browser` are actually available before deeper repo work.
3b. Never put phase skills in scoped `AGENTS.md` primary-skill lines. Keep `requirements-phase`, `delivery-phase`, `debugging-phase`, `review-phase`, `resolve-debt-phase`, and `docs-ingest-phase` as global orchestration entrypoints invoked from the parent goal/handoff flow.
4. Because this repo is in single-repo mode, stitch scope guidance into a single root prompt plus docs guidance when present.
5. Author every root/docs/workspace `AGENTS.md` file as the neutral prompt source of truth and create a sibling `CLAUDE.md` symlink mirror beside each one instead of maintaining duplicated prompt bodies.
6. Keep `.agents/AGENTS.md` as the shared global guidance source behind the scoped prompt tree; `.claude/CLAUDE.md` should stay a symlink mirror of that neutral file.
7. Keep portless as the repo-wide local URL baseline: prefer stable local subdomains over raw localhost ports where env examples, endpoint constants, callback URLs, allowed origins, CORS, or app-to-app proxy targets are configured.
8. Inspect the applied Oxlint configs and lint asset specs. Scaffold creates or patches nearest package/app configs and adds missing lint dev dependencies; preserve local policy when making follow-up edits.
9. Keep `.agents/hooks/` as the neutral hook source of truth; harness hook mirrors should point back to it.
10. Before relying on subagents, verify the active harness global/project settings enable subagent execution, then verify `.agents/subagents/manifest.mjs` and the selected specialist's owned paths, guidance files, and skills. Repair settings/setup or execute locally when the guard fails.
11. Use `.agents/scripts/sync-subagents.mjs` to regenerate harness-native agents, hook mirrors, shared prompt mirrors, and the `.claude/skills` compatibility mirror when the neutral manifest changes.
12. Populate or reconcile `.agents/subagents/manifest.mjs` using both the manifest spec JSON and the manifest prompt markdown.
13. Adjust owned paths and guidance file references in the subagent manifest to match the real repo layout. Monorepo vs single-repo shape affects these paths.
14. Before authoring final prompts or implementation plans, identify the core detected libraries whose source behavior matters, run `opensrc path <package>` or `opensrc path owner/repo` for those libraries, then inspect the returned checkout paths. Clone the major framework/runtime libraries you will reason about; do not clone every dependency mechanically.

## Shared core files

- `.agents/AGENTS.md`

## Skill files

- `.agents/skills/agent-browser`
- `.agents/skills/async-react-patterns`
- `.agents/skills/autoreview`
- `.agents/skills/bug-discovery-phase`
- `.agents/skills/bug-resolution-phase`
- `.agents/skills/create-plan`
- `.agents/skills/create-spec`
- `.agents/skills/debug-agent`
- `.agents/skills/debugging-phase`
- `.agents/skills/delivery-phase`
- `.agents/skills/design-taste-frontend`
- `.agents/skills/docs-ingest-phase`
- `.agents/skills/frontend-domain-structure`
- `.agents/skills/goalify`
- `.agents/skills/grill-me`
- `.agents/skills/implement-spec`
- `.agents/skills/improve-codebase-architecture`
- `.agents/skills/parallel-research`
- `.agents/skills/quality-types`
- `.agents/skills/requirements-grill`
- `.agents/skills/requirements-phase`
- `.agents/skills/resolve-debt-phase`
- `.agents/skills/review-phase`
- `.agents/skills/simplify`
- `.agents/skills/swarm-planner`
- `.agents/skills/tdd`
- `.agents/skills/vercel-composition-patterns`
- `.agents/skills/vercel-react-best-practices`
- `.agents/skills/write-backlog`

## Prompt spec files

- `.devpunks/specs/prompts/root.md`
- `.devpunks/specs/prompts/shared-agents.md`

## Lint spec files

- `.devpunks/specs/lint/README.md`
- `.devpunks/specs/lint/assets.json`
- `.devpunks/specs/lint/oxlint-starter.json`
- `.devpunks/specs/lint/selection.json`

## Subagent files

- `.agents/subagents/manifest.mjs`
- `.agents/subagents/manifest.prompt.md`
- `.devpunks/specs/subagents/manifest-spec.json`

## Script files

- `.agents/scripts/sync-subagents.mjs`

## Hook files


## Harness files

- `.claude/CLAUDE.md`
- `.claude/agents/api-domain.md`
- `.claude/agents/auth-security.md`
- `.claude/agents/code-review.md`
- `.claude/agents/docs-ingest-phase.md`
- `.claude/agents/frontend-app.md`
- `.claude/agents/frontend-cache.md`
- `.claude/agents/frontend-data.md`
- `.claude/agents/frontend-ui.md`
- `.claude/agents/python-app.md`
- `.claude/agents/python-async.md`
- `.claude/agents/python-testing.md`
- `.claude/agents/server-transport.md`
- `.claude/settings.json`
- `.claude/skills`
- `.codex/AGENTS.md`
- `.codex/agents/api-domain.toml`
- `.codex/agents/auth-security.toml`
- `.codex/agents/code-review.toml`
- `.codex/agents/docs-ingest-phase.toml`
- `.codex/agents/frontend-app.toml`
- `.codex/agents/frontend-cache.toml`
- `.codex/agents/frontend-data.toml`
- `.codex/agents/frontend-ui.toml`
- `.codex/agents/python-app.toml`
- `.codex/agents/python-async.toml`
- `.codex/agents/python-testing.toml`
- `.codex/agents/server-transport.toml`
- `.codex/config.toml`
- `.cursor/agents/api-domain.md`
- `.cursor/agents/auth-security.md`
- `.cursor/agents/code-review.md`
- `.cursor/agents/docs-ingest-phase.md`
- `.cursor/agents/frontend-app.md`
- `.cursor/agents/frontend-cache.md`
- `.cursor/agents/frontend-data.md`
- `.cursor/agents/frontend-ui.md`
- `.cursor/agents/python-app.md`
- `.cursor/agents/python-async.md`
- `.cursor/agents/python-testing.md`
- `.cursor/agents/server-transport.md`
- `.cursor/hooks.json`
- `.opencode/AGENTS.md`
- `.opencode/agents/api-domain.md`
- `.opencode/agents/auth-security.md`
- `.opencode/agents/code-review.md`
- `.opencode/agents/docs-ingest-phase.md`
- `.opencode/agents/frontend-app.md`
- `.opencode/agents/frontend-cache.md`
- `.opencode/agents/frontend-data.md`
- `.opencode/agents/frontend-ui.md`
- `.opencode/agents/python-app.md`
- `.opencode/agents/python-async.md`
- `.opencode/agents/python-testing.md`
- `.opencode/agents/server-transport.md`

All paths above are rooted at `/Users/stefan/Desktop/personale/keynotes/torinojs/comoposition-react`.