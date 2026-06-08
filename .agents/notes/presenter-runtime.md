# Presenter Runtime

Use `bun run presenter` in `remotion-presentation/` for the presentation-like surface. `bun run dev` opens Remotion Studio, which is only the debugging/scrubbing surface and does not satisfy the accepted live navigation requirement.

Why: the deck requirement is keyboard-driven cue navigation on a clean projected surface. Studio exposes the timeline, so it is useful for inspection but wrong for rehearsal/delivery.

Current caveat: the restored presenter host navigates the current 16-slide deck at slide granularity. The old presenter branch had the cue-schema direction, but the merged slide content still needs slide-local semantic cue arrays before every reveal/code-preview beat can be navigated individually.
