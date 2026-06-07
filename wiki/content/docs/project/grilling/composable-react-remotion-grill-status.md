---
title: "Composable React Remotion Grill Status"
surface: project
permission: project
---

# Composable React Remotion Grill Status

## Branch Dashboard

- **Artifact shape**: 100%
  Locked direction: primary output is a full Remotion video/keynote experience.
  Still-open items: none.
- **Presentation runtime structure**: 100%
  Locked direction: custom presentation-like runtime using Remotion Player and a cue list.
  Still-open items: none.
- **Remocn usage**: 100%
  Locked direction: mandatory use of Remocn registry blocks to create the presentation itself. Use `LiveCodeCompilation` for code-plus-DX-panel slides, simple text/bullet compositions for narrative slides, and `GlassCodeBlock` for code-only slides.
  Still-open items: none.
- **Notification UI preview**: 100%
  Locked direction: recreate fake/basic stage UI using shadcn-style cards, typography, avatars, buttons, badges, separators, and panels; implementer can design the exact preview states from the pinned content docs.
  Still-open items: none.
- **Visual system**: 100%
  Locked direction: darkmode-first JavaScript-yellow palette using `#F0DB4F` yellow/corn and `#323330` dark grey/black wool, with default shadcn theming conventions for typography, spacing, radius, cards, buttons, and UI proportions.
  Still-open items: none.
- **Implementation structure**: 100%
  Locked direction: separate slide components with slide-local cues compiled into one global presenter timeline.
  Still-open items: none.

## Parked Branches

- **PPTX/Google Slides handout/export**: parked until the Remotion keynote structure is working.
- **Linear MP4/export**: parked until the live cue-based presenter exists.

## Glossary

### Terms

- **Remotion keynote**: a video-native presentation where slides, code animation, UI preview, and transitions are rendered as one Remotion composition.
  Avoid: PPTX-first deck.
- **Presenter shell**: the interactive React runtime that wraps Remotion Player and provides next/previous navigation through named cues.
  Avoid: raw Studio scrubbing as the presentation UI.
- **Cue**: one intentional navigation stop in the presentation timeline, mapped to a Remotion frame or frame range.
  Avoid: treating only whole slides as navigable.
- **Semantic cue**: a cue that corresponds to a meaningful talk beat rather than a tiny animation increment.
  Avoid: frame-by-frame navigation, micro-clicking every small animation.
- **Handout deck**: an optional later PPTX or Google Slides version used for sharing static material after the Remotion keynote works.
- **Talk-specific preview**: a recreated notification UI used only for the keynote, controlled by the slide/code narrative rather than imported from the production app.
  Avoid: importing the real Traevolution app UI into the keynote runtime.
- **Remocn registry substrate**: the required copied registry components used to build the keynote's code blocks, code diffs, live preview panel, and transitions.
  Avoid: treating Remocn as optional inspiration or reimplementing equivalent components from scratch.
- **DX panel**: the right-side live UI preview panel inside the code-plus-preview composition.
  Avoid: using DX panel to mean the whole split layout.
- **Code-plus-DX-panel layout**: a proof layout where code evolves on the left and the right-side DX panel preview responds.
  Avoid: using this layout for every slide by default.
- **Remocn typography motion**: copied Remocn registry typography components used for title, copy, emphasis, and phrase animations.
  Avoid: hand-rolling generic text animation when registry typography fits; avoid tech/glitch typography effects.
- **Dark JavaScript palette**: a darkmode-first visual system using JavaScript-yellow as the primary accent.
  Avoid: literal light PowerPoint template imitation.
- **Slide-local cues**: semantic cue definitions owned by the slide component that renders the corresponding animation.
  Avoid: one giant hand-authored global cue array.
- **Global presenter timeline**: the flattened cue sequence used by the presenter shell for next/previous navigation.
- **Range cue**: a semantic cue with both `startFrame` and `holdFrame`, where playback begins at the start frame and the presenter waits at the hold frame.
  Avoid: single-frame cues for animated reveals.
- **Slide-relative cue frames**: cue frames authored relative to the beginning of a slide and compiled into absolute global frames.
  Avoid: authoring every cue directly in absolute composition coordinates.
- **Derived slide duration**: default slide duration computed from its final cue hold frame plus exit padding.
  Avoid: manually syncing fixed slide durations with cue edits unless a slide explicitly needs an override.
- **Motion scale**: a configurable timing category for animation duration.
  Avoid: arbitrary per-slide frame counts when a text/small/large motion constant fits.
- **Narrative slide**: a simple text/bullet composition following `slides-content.md`, animated with classic Remocn typography.
- **Code-only slide**: a slide that uses `GlassCodeBlock` to display code without a right-side DX panel.
- **Code-plus-DX-panel slide**: a slide that uses `LiveCodeCompilation` when code should produce or update a right-side UI preview.

### Axioms

- The Remotion keynote is the primary artifact.
- PPTX/Google Slides must not constrain the motion design until the Remotion story is pinned.
- The live talk must navigate by cues, not by passive MP4 playback.
- Cue granularity is semantic: navigate meaningful talk beats, not every animation frame.
- The projected presentation surface must be slide-only fullscreen with no visible presenter UI.
- Keyboard controls are `ArrowRight` next, `ArrowLeft` previous, `Home` first, `End` last, and `R` restart current cue; no fullscreen key and no pause/play concept.
- No separate rehearsal/debug route or visible debug overlay belongs in the presenter app.
- MP4/export is parked; current implementation targets live cue-based presentation only.
- Notification UI/code examples are recreated from `slides-content.md`, `deck-beats.md`, and `fragments.md`; production app imports are out of scope.
- Notification previews should use fake/basic stage UI with shadcn-like defaults, not production-faithful styling.
- Notification preview states may be mocked freely by the implementer from `deck-beats.md`, `fragments.md`, and `slides-content.md`.
- Mandatory Remocn components must be used to create the presentation itself: `CodeDiffWipe`, `GlassCodeBlock`, `LiveCodeCompilation`, and Remocn transition blocks.
- `LiveCodeCompilation` is the reusable base for code-plus-preview slides; the **DX panel** is the right-side preview panel.
- Code-plus-DX-panel layout appears only where code demonstrates a meaningful shape change.
- Remocn typography registry components animate titles, copy, emphasis lines, and highlighted phrases outside the DX panel.
- Typography motion must stay normal/classic; no tech/glitch typography effects.
- Visual system is darkmode-first with JavaScript-yellow accents.
- Visual tokens are `#F0DB4F` yellow/corn and `#323330` dark grey/black wool.
- Use default shadcn theming conventions for typography, spacing, radius, cards, buttons, and UI proportions.
- Slides own local cues; the app compiles them into one global presenter timeline.
- Cue schema uses `startFrame` plus `holdFrame`, validated against Remotion Player controls and the prior `cda-04-26` beats-control example.
- Cues are slide-relative in slide files and absolute only after timeline compilation.
- Slide duration defaults to final cue hold frame plus exit padding, with explicit override only for special cases.
- Composition runs at 60fps.
- Default motion constants: text/small `300ms`/`18f`; large panel or big UI change `600ms`/`36f`.
- Default post-cue slide padding is panel-scale: `600ms`/`36f`.
- Slide-to-slide transitions are cue-controlled, not automatic after the final content cue.
- Slide transition cues are inserted by the global timeline compiler, not authored inside slide components.
- Default slide transition is visually `none` / clean cut; transition feeling comes from entering animations of next-slide elements.
- Installed Remocn transition components remain available but are not part of the default visual grammar.
- Slide-change remains an explicit semantic cue even when the visual transition is a clean cut.
- The first cue of each slide starts the entrance animation and holds at the first readable state.
- Previous navigation jumps to previous cue `holdFrame`; `R` replays the current cue from `startFrame`.
- `Space`/pause/play is not part of the presenter model; this is discrete cue navigation only.
- Next key is `ArrowRight` only; `Home` first cue, `End` last cue, `R` restart current cue.
- Cue labels are authoring/debug metadata only and must never render on stage.
- Timeline compiler must throw on duplicate cue ids, non-increasing cues, invalid frames, and empty cue arrays.
- Output format is `16:9`, `1920x1080`, `60fps`.
- First implementation gate is presenter shell + timeline compiler + two sample slides before scaling to all sixteen.

### Accepted Schemas

```ts
type Cue = {
  id: string
  label: string
  startFrame: number
  holdFrame: number
}
```

```ts
type SlideDefinition = {
  id: string
  component: SlideComponent
  cues: Cue[]
  durationInFrames?: number
}
```

### Accepted Directory Layout

```txt
src/presenter/
src/slides/
src/timeline/
src/theme/
src/components/remocn/
src/components/preview/
```

### Installed Remocn Registry Components

- Code/display: `CodeDiffWipe`, `GlassCodeBlock`, `LiveCodeCompilation`
- Transitions: `DirectionalWipe`, `FrostedGlassWipe`, `GridPixelateWipe`, `ChromaticAberrationWipe`
- Typography: `StaggeredFadeUp`, `MaskedSlideReveal`, `InlineHighlight`, `MarkerHighlight`, `TextFadeReplace`

### Flagged Ambiguities

- None.
