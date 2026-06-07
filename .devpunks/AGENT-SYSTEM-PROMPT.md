Give this to the next agent

You are continuing a `punks scaffold` run.

Read first:
  • `.devpunks/scaffold-manifest.json`
  • `.devpunks/AGENT-HANDOFF.md`
  • `.devpunks/required-tools.json`

Tool bootstrap status:
  • `agent-browser`: already present
  • `clawpatch`: already present
  • `debug-agent`: already present
  • `opensrc`: already present
  • `portless`: already present
  • `skills`: already present

What was scaffolded:
  • final scoped/root prompt files were not written yet
  • .agents/AGENTS.md
  • .devpunks/specs/lint/README.md
  • .devpunks/specs/lint/assets.json
  • .devpunks/specs/lint/oxlint-starter.json
  • .devpunks/specs/lint/selection.json
  • .agents/skills/agent-browser
  • .agents/skills/async-react-patterns
  • .agents/skills/autoreview
  • .agents/skills/bug-discovery-phase
  • .agents/skills/bug-resolution-phase
  • .agents/skills/create-plan
  • .agents/skills/create-spec
  • .agents/skills/debug-agent
  • .agents/skills/debugging-phase
  • .agents/skills/delivery-phase
  • .agents/skills/design-taste-frontend
  • .agents/skills/docs-ingest-phase
  • .agents/skills/frontend-domain-structure
  • .agents/skills/goalify
  • .agents/skills/grill-me
  • .agents/skills/implement-spec
  • .agents/skills/improve-codebase-architecture
  • .agents/skills/parallel-research
  • .agents/skills/quality-types
  • .agents/skills/requirements-grill
  • .agents/skills/requirements-phase
  • .agents/skills/resolve-debt-phase
  • .agents/skills/review-phase
  • .agents/skills/simplify
  • .agents/skills/swarm-planner
  • .agents/skills/tdd
  • .agents/skills/vercel-composition-patterns
  • .agents/skills/vercel-react-best-practices
  • .agents/skills/write-backlog
  • .devpunks/specs/prompts/root.md
  • .devpunks/specs/prompts/shared-agents.md
  • .agents/subagents/manifest.mjs
  • .agents/subagents/manifest.prompt.md
  • .devpunks/specs/subagents/manifest-spec.json
  • .agents/scripts/sync-subagents.mjs
  • .claude/CLAUDE.md
  • .claude/agents/api-domain.md
  • .claude/agents/auth-security.md
  • .claude/agents/code-review.md
  • .claude/agents/docs-ingest-phase.md
  • .claude/agents/frontend-app.md
  • .claude/agents/frontend-cache.md
  • .claude/agents/frontend-data.md
  • .claude/agents/frontend-ui.md
  • .claude/agents/python-app.md
  • .claude/agents/python-async.md
  • .claude/agents/python-testing.md
  • .claude/agents/server-transport.md
  • .claude/settings.json
  • .claude/skills
  • .codex/AGENTS.md
  • .codex/agents/api-domain.toml
  • .codex/agents/auth-security.toml
  • .codex/agents/code-review.toml
  • .codex/agents/docs-ingest-phase.toml
  • .codex/agents/frontend-app.toml
  • .codex/agents/frontend-cache.toml
  • .codex/agents/frontend-data.toml
  • .codex/agents/frontend-ui.toml
  • .codex/agents/python-app.toml
  • .codex/agents/python-async.toml
  • .codex/agents/python-testing.toml
  • .codex/agents/server-transport.toml
  • .codex/config.toml
  • .cursor/agents/api-domain.md
  • .cursor/agents/auth-security.md
  • .cursor/agents/code-review.md
  • .cursor/agents/docs-ingest-phase.md
  • .cursor/agents/frontend-app.md
  • .cursor/agents/frontend-cache.md
  • .cursor/agents/frontend-data.md
  • .cursor/agents/frontend-ui.md
  • .cursor/agents/python-app.md
  • .cursor/agents/python-async.md
  • .cursor/agents/python-testing.md
  • .cursor/agents/server-transport.md
  • .cursor/hooks.json
  • .opencode/AGENTS.md
  • .opencode/agents/api-domain.md
  • .opencode/agents/auth-security.md
  • .opencode/agents/code-review.md
  • .opencode/agents/docs-ingest-phase.md
  • .opencode/agents/frontend-app.md
  • .opencode/agents/frontend-cache.md
  • .opencode/agents/frontend-data.md
  • .opencode/agents/frontend-ui.md
  • .opencode/agents/python-app.md
  • .opencode/agents/python-async.md
  • .opencode/agents/python-testing.md
  • .opencode/agents/server-transport.md

What you must do:
  1. Treat the prompt spec markdown files as instructions, not final prompt bodies.
  2. Repo is in single-repo mode. Stitch scoped guidance into one root prompt, plus docs guidance when present.
  3. Read `.devpunks/required-tools.json` and verify `skills`, `portless`, `opensrc`, and `agent-browser` are actually available when listed. If any are missing, install/fix that first.
  4. Keep the final prompt house style tight: `## ... Guidance`, `Primary skills here`, one short scope-boundary paragraph, optional `opensrc` guidance only when needed, then the docs-update rule.
  4a. Never put phase skills in scoped `AGENTS.md` primary-skill lines. Keep `requirements-phase`, `delivery-phase`, `debugging-phase`, `review-phase`, `resolve-debt-phase`, and `docs-ingest-phase` as global orchestration entrypoints only.
  5. Treat every authored root/docs/workspace `AGENTS.md` file as the neutral scoped prompt source and create a sibling `CLAUDE.md` symlink mirror beside each one.
  6. Keep `.agents/AGENTS.md` as the shared global prompt source behind the scoped prompt tree; `.claude/CLAUDE.md` should mirror that neutral file.
  7. Before relying on subagents, verify the active harness global/project settings enable subagent execution, then verify `.agents/subagents/manifest.mjs` and selected specialist path/guidance/skill coverage. Repair settings/setup or execute locally if the guard fails.
  8. Keep `.agents/hooks/` as the neutral hook source, `.agents/skills/` as the main skill directory, and `.agents/scripts/sync-subagents.mjs` as the harness sync entrypoint. Only `.claude/skills` should mirror `.agents/skills`.
  9. Reconcile `.agents/subagents/manifest.mjs` with both `.agents/subagents/manifest.prompt.md` and `.devpunks/specs/subagents/manifest-spec.json`.
  10. Update owned paths / guidance file references in the subagent manifest to match the real repo shape.
  11. Use `portless` as the local-dev URL baseline. Prefer stable subdomains over raw `localhost:<port>` values in env examples, endpoint defaults, callback URLs, allowed origins, CORS, and app-to-app proxies.
  12. If adopting Oxlint or Oxfmt, replace existing lint/format setup deliberately: package scripts, task pipelines, CI, editor/docs references, and hooks should agree on the new tools.
  13. Before authoring final prompts or implementation plans, identify the core detected libraries whose source behavior matters.
  14. Run `opensrc path <package>` or `opensrc path owner/repo` for those core libraries, then inspect the returned checkout paths. Clone the major framework/runtime libraries you will reason about; do not clone every dependency mechanically.
