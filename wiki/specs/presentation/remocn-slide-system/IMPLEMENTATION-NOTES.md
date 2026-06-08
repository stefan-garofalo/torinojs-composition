---
domain: presentation
type: implementation-notes
spec: GH-5
links:
  - "[[specs/presentation/remocn-slide-system/SPEC]]"
ingested: false
last_ingested: null
created: 2026-06-08
updated: 2026-06-08
---

# Implementation Notes: Remocn Slide System And Motion Vocabulary

## Execution Mode

parallel

## Execution Board

| Wave | Tasks | Status |
|------|-------|--------|
| 1 | T1, T2, T3 | Complete |
| 2 | T4 | Complete |
| 3 | T5 | Complete |

## Sanity Checks

- Wave 1 parent import check: `talkSlides` exports 16 slides with family counts `narrative: 8`, `code-only: 5`, `code-dx: 3`; `NarrativeTalkSlide`, `CodeOnlyTalkSlide`, `CodeDxTalkSlide`, and `LiveCodeCompilation` all import as functions.
- Wave 1 parent TypeScript check passed for slide exports, preview component, and reusable `LiveCodeCompilation`.
- Wave 1 parent ESLint check passed for `src/slides`, `src/components/preview`, and `src/components/remocn/live-code-compilation.tsx`.
- T4 parent metadata check: `VISUAL_SYSTEM_DURATION_IN_FRAMES` equals the slide duration sum `7380`, `presenterTimeline` contains 16 ordered slides, first slide is `make-the-shape-visible`, last slide is `make-the-shape-visible-final`, output is 1920x1080 at 60fps.
- `bun run lint` passed in `remotion-presentation`.
- `bun run build` passed in `remotion-presentation`.
- Remotion stills rendered for narrative, code-only, and code-plus-DX frames: `/tmp/remocn-final-narrative.png`, `/tmp/remocn-final-code-only.png`, `/tmp/remocn-final-code-dx.png`.
- `agent-browser` validated Remotion Studio at `http://localhost:4005/MyComp`, initial narrative slide, frame `1900` code-only slide, and frame `1290` code-plus-DX slide.

## Acceptance Audit

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Multi-slide keynote replaces the three-family sample. | Met | `MyComp` renders 16 `talkSlides` in `Series`; duration is `7380` frames. |
| Narrative slides support titles, subtitles, bullets, emphasis, and holds. | Met | `NarrativeTalkSlide` maps title/subtitle/bullets/emphasis from typed slide content. |
| Narrative text uses classic Remocn typography. | Met | `StaggeredFadeUp`, `MarkerHighlight`, and `InlineHighlight` are used; no glitch/wipe components in slide renderers. |
| Code-only slides use `GlassCodeBlock`. | Met | `CodeOnlyTalkSlide` wraps `GlassCodeBlock`; browser frame `1900` shows the code-only slide and `glass-code-block.tsx` sequences. |
| Code-only snippets are readable at 1920x1080. | Met | Still `/tmp/remocn-final-code-only.png` inspected; Studio frame `1900` validated. |
| Code-plus-DX uses `LiveCodeCompilation`. | Met | `CodeDxTalkSlide` composes `LiveCodeCompilation` with custom code events and `renderPreview`. |
| DX panel means only the right-side preview. | Met | `renderPreview` supplies the right-side `MockNotificationPreview`; the split itself remains the LiveCodeCompilation layout. |
| DX layout appears only for meaningful shape-change slides. | Met | `code-dx` family is limited to slides 4, 9, and 14. |
| Dark JavaScript visual system remains intact. | Met | Metadata remains 1920x1080/60fps; theme tokens and stage styles are reused. |
| Browser validation covers representative families. | Met | `agent-browser` snapshots validated narrative, code-only, and code-DX frames in Remotion Studio. |

## Manual Review Checklist

| Area | Check | How to perform | Expected result |
|------|-------|----------------|-----------------|
| Remotion Studio | Open the deck. | Run `cd remotion-presentation && bun run dev -- --port=4005`, then open `http://localhost:4005/MyComp`. | Studio loads `MyComp` and shows the opening narrative slide. |
| Code-only slide | Seek to frame `1900`. | Use the Studio frame control and enter `1900`. | `Props outside, branches inside` appears with a readable `GlassCodeBlock` code surface. |
| Code-plus-DX slide | Seek to frame `1290`. | Use the Studio frame control and enter `1290`. | `The fifth shape` appears with code on the left and a notification preview on the right. |
| CLI validation | Re-run validation. | Run `cd remotion-presentation && bun run lint && bun run build`. | Both commands pass. |

## Remaining Work

None.
