---
title: "Composable React Remotion Grill Log"
surface: project
permission: project
---

# Composable React Remotion Grill Log

## Artifact Shape

### Q1

Question:
Should the final artifact primarily be a full Remotion video/keynote experience, a PPTX/Google Slides deck with embedded rendered clips, or both?

Accepted answer:
- Primary artifact: full Remotion video/keynote experience.
- Parked: PPTX/Google Slides as a later handout/export path if needed.
- Rationale: the code/UI preview idea needs timing, transitions, and motion as first-class structure; PPTX should not constrain the presentation before the motion story works.

### Q2

Question:
Should the Remotion keynote be a linear video, a manually scrubbed Studio composition, or a presentation-like runtime with next/previous navigation?

Accepted answer:
- The keynote must behave like a presentation.
- Navigation must support next/previous between every intentional cue: slide changes, element reveals, code animations, UI preview changes, and transitions.
- Implementation direction: build a custom presenter shell around Remotion Player, with a cue list mapping each navigable step to a target frame/range.
- Rationale: the talk needs live presenter control; a rendered MP4 alone is too passive, and raw Remotion Studio scrubbing is too low-level for presentation delivery.

### Q3

Question:
What should count as a navigable cue?

Accepted answer:
- Use semantic cues only.
- Include: title appears, bullet group appears, code diff begins/completes, UI preview reaches a meaningful state, slide transition completes.
- Exclude: every animation frame and every tiny micro-reveal when the content is one conceptual group.
- Rationale: semantic cues preserve presenter control without turning the talk into hundreds of clicks.

### Q4

Question:
Should the presenter shell show only the slide fullscreen, or include presenter-only UI?

Accepted answer:
- Show only the slide fullscreen.
- Controls happen by keyboard only.
- No visible presenter overlay, control dashboard, cue labels, slide counter, timer, or next-cue display in the projected UI.
- Rationale: the presentation surface must stay clean; control affordances should not become part of the visual artifact.

### Q5

Question:
Which keyboard controls should the presenter shell support?

Accepted answer:
- `Space` / `ArrowRight`: next semantic cue.
- `ArrowLeft`: previous semantic cue.
- `Home`: first cue.
- `End`: last cue.
- `R`: restart current cue.
- Do not add a fullscreen key.
- Rationale: the app should provide invisible navigation and recovery controls; fullscreen can be handled outside the app by the browser/system presentation setup.

### Q6

Question:
Do we need a separate rehearsal/debug mode that shows cue names and frame numbers, but is never used on stage?

Accepted answer:
- No separate rehearsal/debug route or overlay.
- The presenter surface remains clean in all app modes.
- Use Remotion Studio, code inspection, and targeted renders for debugging instead of building debug UI into the presentation app.
- Rationale: avoid adding a second surface that can drift from the real presentation experience.

### Q7

Question:
Should the clean presenter app support exporting a linear MP4 from the same cue timeline now?

Accepted answer:
- Not yet.
- Focus current implementation on the live cue-based presenter only.
- Park MP4/export until the presentation itself exists.
- Rationale: export adds a secondary delivery constraint before the live presenter model is proven.

## Notification Preview And Content Sources

### Q8

Question:
For the notification UI preview, should we import the real Traevolution notification components or recreate a talk-specific preview?

Accepted answer:
- Recreate talk-specific notification components and previews.
- Do not import the real Traevolution app components.
- Use `slides-content.md`, `deck-beats.md`, and `fragments.md` as the source of truth for slide copy, code snippets, and narrative beats.
- Rationale: the talk needs a clean, controllable visual model; importing the real app would pull in Expo/React Native dependencies, theme providers, generated API types, routing, and platform assumptions.

### Q9

Question:
How faithful should the recreated notification preview be?

Accepted answer:
- Use a fake/basic stage UI, not a production-faithful clone.
- Reuse shadcn-like default styling for typography, cards, buttons, spacing, and panel structure.
- Keep the preview conceptually faithful to the talk: actor/icon, body, context preview, actions, date, and shape changes.
- Rationale: the audience needs to understand the API shape instantly from a distance; stage readability and animation control matter more than production UI fidelity.

### Q10

Question:
Which Remocn registry components are hard requirements for the presentation system?

Accepted answer:
- `CodeDiffWipe` from `https://www.remocn.dev/docs/ui-blocks/code-diff-wipe` for before/after API transitions.
- `GlassCodeBlock` from `https://www.remocn.dev/docs/ui-blocks/glass-code-block` for readable stage code.
- `LiveCodeCompilation` from `https://www.remocn.dev/docs/compositions/live-code-compilation` as the base for the code-plus-UI-preview DX panel.
- Remocn transitions from `https://www.remocn.dev/docs/transitions` as the transition vocabulary.
- These are mandatory registry components used to create the presentation itself, not optional visual inspiration.
- Rationale: the keynote should be a custom Remotion presentation, but the Remocn registry is the required implementation substrate for code blocks, code diffs, live preview panels, and transitions.

### Q11

Question:
Should `LiveCodeCompilation` be used as one reusable split component across multiple slides, with different code and preview states passed in?

Accepted answer:
- Yes.
- Use `LiveCodeCompilation` as the reusable base for slides that need code evolving alongside a preview.
- Canonical term: **DX panel** means the right-side live UI preview panel, not the entire code-plus-preview split.
- Rationale: one consistent grammar keeps the presentation coherent: code changes on the left, the DX panel/preview responds on the right.

### Q12

Question:
Should the left code side and right DX panel always appear together, or only on slides where code demonstrates a shape change?

Accepted answer:
- Use the code-plus-DX-panel layout only where code demonstrates a meaningful shape change.
- Do not force every slide into a code/preview split.
- Rationale: the keynote still needs rhythm; title, theory, and transition slides should breathe, while code-plus-DX panels should be reserved for proof moments.

### Q13

Question:
How should non-code title/copy slides be animated?

Accepted answer:
- Use Remocn typography registry components to animate titles, copy, emphasis lines, and highlighted phrases.
- Do not hand-roll generic typography animations when Remocn registry typography components fit.
- Use shadcn-like typography/cards/buttons/avatar primitives inside the DX panel.
- Rationale: Remocn should create the presentation itself, including typography motion; shadcn-like UI should stay scoped to the mocked preview panel.

Implementation note:
- Installed classic typography registry components in the Remotion scaffold: `StaggeredFadeUp`, `MaskedSlideReveal`, `InlineHighlight`, `MarkerHighlight`, and `TextFadeReplace`.
- Required non-typography registry components already present: `CodeDiffWipe`, `GlassCodeBlock`, `LiveCodeCompilation`, `DirectionalWipe`, `FrostedGlassWipe`, `GridPixelateWipe`, and `ChromaticAberrationWipe`.

### Q14

Question:
For Remocn typography, should the presentation use restrained/classic text motion or tech/glitch effects?

Accepted answer:
- Use normal/classic Remocn typography transitions for slide titles, copy, emphasis, and highlights.
- Do not use tech/glitch typography effects.
- Let code block components carry their own code-specific animation behavior.
- Rationale: the talk should feel precise and clean, not theatrical; code animation already has enough motion and should not be visually overcompeted by title/copy effects.

## Visual System

### Q15

Question:
Should the overall visual style follow the original yellow/white/dark template language from `slides-content.md`, or should the Remotion version define a new minimal visual system?

Accepted answer:
- Use the JavaScript-yellow palette as the base.
- Keep the Remotion presentation darkmode-first.
- Do not imitate the light PowerPoint template literally.
- Preserve the yellow/white/dark rhythm as dark stage design with yellow accents.
- Rationale: the yellow palette fits the JavaScript topic, but a darkmode Remotion keynote better supports code, preview panels, and stage contrast.

### Q32

Question:
What are the final visual-system tokens and defaults?

Accepted answer:
- Use JavaScript palette tokens:
  - `#F0DB4F` — yellow / corn
  - `#323330` — dark grey / black wool
- Keep the deck darkmode-first.
- Use default shadcn theming conventions for typography, spacing, radius, cards, buttons, and general UI proportions.
- Rationale: JS yellow anchors the topic; shadcn defaults provide a familiar neutral UI system without over-designing custom tokens.

## Implementation Structure

### Q16

Question:
Should the deck be one continuous Remotion composition with a global cue timeline, or separate slide components each declaring their own cues?

Accepted answer:
- Use separate slide components that each own their content, local animations, and semantic cues.
- Compile those slide-local cues into one global presenter timeline.
- Rationale: each slide stays easy to reason about while the presenter shell still exposes one continuous next/previous navigation model.

### Q17

Question:
Should cues target a single frame, or a range with `startFrame` and `holdFrame`?

Accepted answer:
- Use a range cue model with `startFrame` and `holdFrame`.
- `startFrame`: where the cue animation begins.
- `holdFrame`: where the presenter lands and waits after the cue animation completes.
- Rationale: next/previous should play a semantic animation and settle on its readable final state; one frame cannot express that behavior cleanly.

Validation:
- Remotion Player supports imperative playback control via `play()`, `pause()`, `getCurrentFrame()`, `seekTo(frame)`, and frame events, so a presenter shell can play from a cue start and stop at its hold frame.
- Remotion `useCurrentFrame()` is sequence-relative inside `<Sequence>`, so absolute cue truth should stay in the shared cue/timeline registry and be passed down when needed.
- `/Users/stefan/Desktop/repos/cda-04-26` proves the beats-control idea with `PresentationStepDefinition`, a central timeline, and Player keyboard controls, but its step model is `holdFrame`-only. Our explicit `startFrame` plus `holdFrame` model is the cleaner version of that pattern.

### Q18

Question:
Should cue `startFrame` and `holdFrame` be slide-relative or absolute?

Accepted answer:
- Author cues as slide-relative frames inside each slide file.
- Compile slide-relative cues to absolute global frames in the central timeline registry.
- Rationale: slide authors should reason locally, while the presenter/player needs one global frame truth.

### Q19

Question:
Should each slide declare a fixed `durationInFrames`, or should duration be derived from its last cue plus padding?

Accepted answer:
- Derive slide duration from the last cue `holdFrame` plus exit padding.
- Allow an explicit `durationInFrames` override only for special cases such as ambient loops or longer transitions.
- Rationale: derived duration avoids manually keeping slide duration in sync with cue changes.

### Q20

Question:
What frame rate and default motion durations should the presenter use?

Accepted answer:
- Use `60fps` for the Remotion keynote.
- Make transition durations configurable by motion scale.
- Default text/small element transitions: `300ms` = `18` frames at `60fps`.
- Default large panel / big UI change transitions: `600ms` = `36` frames at `60fps`.
- Use these constants for cue padding and animation defaults rather than hard-coding arbitrary frame counts per slide.
- Rationale: 60fps gives smoother stage motion; scale-based duration keeps text crisp and large layout changes readable.

### Q21

Question:
For slide duration padding after the last cue, should the default be text-scale or panel-scale?

Accepted answer:
- Use panel-scale padding by default.
- Default post-cue slide padding: `600ms` = `36` frames at `60fps`.
- Rationale: the final state of a slide should have a short readable beat before the next cue or slide transition.

### Q22

Question:
Should slide-to-slide transitions be cue-controlled too, or automatic after the last cue?

Accepted answer:
- Slide-to-slide transitions are cue-controlled.
- The last content cue lands and waits.
- Pressing next triggers the slide transition.
- The transition lands on the next slide's first hold frame.
- Rationale: this matches real presentation behavior; the presenter decides when the audience is done with the slide.

### Q23

Question:
Should slide transition cues belong to the outgoing slide, incoming slide, or global compiler?

Accepted answer:
- The global timeline compiler owns slide transition cues.
- Slide components define only their own content cues.
- The compiler inserts transition cues between adjacent slides.
- Rationale: the compiler knows adjacent slides and can apply transitions consistently without forcing slide files to know about their neighbors.

### Q24

Question:
Should the transition type be chosen globally by default, with per-slide override when needed?

Accepted answer:
- Use one global default transition type for most slide changes.
- Allow per-slide `transitionOut` override only when a slide's visual structure needs a specific transition.
- Rationale: consistency first; override only for structural moments.

### Q25

Question:
Which Remocn transition should be the global default?

Accepted answer:
- Do not use heavy slide-level transition effects as the default.
- Let the entering animations of each slide's elements create the transition effect between slides.
- The global compiler may still insert a transition cue, but the default visual transition is effectively `none` / clean cut into the next slide's first reveal.
- Rationale: Remocn wipe/glass transitions feel too heavy for this talk; normal presentation rhythm should come from classic element entrances.

### Q26

Question:
Should we still keep the installed Remocn transition components available for rare structural moments?

Accepted answer:
- Keep the installed transition components because they are already scaffolded.
- Do not design around them.
- Use them only if a later slide genuinely needs one; otherwise ignore them.
- Rationale: this is not worth over-designing. The default rhythm is element entrances, not slide-level transition effects.

### Q27

Question:
Should the timeline compiler still create explicit slide-change cues even if the visual transition is just a clean cut?

Accepted answer:
- Yes.
- Slide-change remains an explicit semantic cue.
- Navigation semantics and visual transition effects are separate.
- Rationale: pressing next from the last content cue should be deliberate even if the visual result is simply the next slide entering.

### Q28

Question:
Should the first cue of each slide be the slide's empty/base state or the first visible readable state?

Accepted answer:
- The first cue plays the slide's entrance animation and holds at the first visible readable state.
- Do not skip enter animations.
- Do not hold on blank/base implementation frames unless a slide intentionally begins from blank as part of the story.
- Rationale: the audience should see content arrive, and the presenter should wait on a readable state.

### Q29

Question:
For previous navigation, should `ArrowLeft` go to the previous cue's `holdFrame` directly, or replay the previous cue from its `startFrame`?

Accepted answer:
- `ArrowLeft` jumps directly to the previous cue's `holdFrame`.
- `R` restarts/replays the current cue from its `startFrame`.
- Rationale: previous navigation is recovery/navigation; replay is an explicit separate action.

### Q30

Question:
Should pressing `Space` while a cue animation is currently playing pause playback, or should it be ignored until the cue reaches `holdFrame`?

Accepted answer:
- Pause does not exist as a presentation concept.
- Do not use `Space` for pause/play.
- The presenter only supports discrete cue navigation: forward, backward, restart current cue, start presentation, and end presentation.
- Rationale: this is a presentation, not a video player; controls should move between element animations and slide transitions, never stop halfway in an awkward intermediate state.

### Q31

Question:
What are the final implementation defaults for controls, schemas, directory layout, validation, aspect ratio, and first build gate?

Accepted answer:
- Next key: `ArrowRight` only.
- Start/end keys: `Home` jumps to the first cue; `End` jumps to the last cue.
- Restart key: keep `R` to replay the current cue from `startFrame`.
- Cue schema:

```ts
type Cue = {
  id: string
  label: string
  startFrame: number
  holdFrame: number
}
```

- Slide schema:

```ts
type SlideDefinition = {
  id: string
  component: SlideComponent
  cues: Cue[]
  durationInFrames?: number
}
```

- Directory layout:

```txt
src/presenter/
src/slides/
src/timeline/
src/theme/
src/components/remocn/
src/components/preview/
```

- Cue labels exist in code for debugging/authoring only and are never rendered on stage.
- Timeline validation must throw on duplicate cue ids, non-increasing cues, invalid frames, and empty cue arrays.
- Output format: `16:9`, `1920x1080`, `60fps`.
- Implementation gate: first implement the presenter shell, timeline compiler, and two sample slides before scaling to all sixteen slides.
- Rationale: these defaults prove navigation and cue semantics before the deck is expanded.

## Remocn And Preview Mapping

### Q33

Question:
Which slide structures should the Remotion keynote support?

Accepted answer:
- Use `LiveCodeCompilation` when a slide needs to display the UI output of a code block.
- Use simple text/bullet slide compositions for narrative slides, following `slides-content.md`.
- Use `GlassCodeBlock` when a slide displays code without a right-side UI preview.
- Rationale: this creates two clean slide families: narrative/text slides and proof/code-preview slides, with a separate code-only display option.

### Q34

Question:
How should the notification preview states be designed?

Accepted answer:
- The notification preview states can be mocked freely by the implementer.
- Use the notification abstractions and code examples defined in `deck-beats.md`, `fragments.md`, and `slides-content.md`.
- Use shadcn-style UI primitives and defaults for fake preview UI: typography, avatar, button, card, separator, badges, and related neutral components.
- The preview only needs to communicate the conceptual shape changes: actor/avatar vs system icon, body, context preview, thumbnail/media, actions, date, and moderation/comment variants.
- Rationale: the preview is a stage-readable explanation tool, not a production UI clone.
