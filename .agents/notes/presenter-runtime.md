# Presenter Runtime

Use `bun run dev` or `bun run presenter` in `remotion-presentation/` for the presentation-like surface at `http://localhost:3001/`. The starter no longer exposes Remotion Studio as the default route.

Why: the deck requirement is keyboard-driven navigation on a clean projected surface, and fork users need one obvious local URL.

Current caveat: the restored presenter host navigates the current 16-slide deck at slide granularity. The old presenter branch had the cue-schema direction, but the merged slide content still needs slide-local semantic cue arrays before every reveal/code-preview beat can be navigated individually.
