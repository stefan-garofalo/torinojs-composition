# Make The Shape Visible - Slide Copy

This file is the copy map for the live Remotion deck in `remotion-presentation/src/deck/content.ts`.
Keep titles, subtitles, bullets, claims, focus strips, and step messages in sync with the TypeScript deck source.
Code snippets live in TypeScript and `notification-code-snippets.ts`; do not duplicate full code here.

## Slide 1 - Make The Shape Visible

Title:
Make The Shape Visible

Subtitle:
Through a composable React API

## Slide 2 - A Useful Component Under Pressure

Title:
A useful component under pressure

Subtitle:
One row.
Several product shapes.

Content:
- Follow request: actor + follow back
- Post like: actor + thumbnail + post link
- DM request: preview + accept / ignore
- Photo tag: thumbnail + remove tag

## Slide 3 - One Clean Shape

Title:
One clean shape

Focus:
- one product shape
- actor + body + media
- simple because singular

Step messages:
- One notification shape can stay simple.
- The trouble starts when this shape becomes the shared container.

## Slide 4 - Add Interaction

Title:
Add interaction

Focus:
- follow request arrives
- one branch feels reasonable
- behavior starts entering the surface

Step messages:
- A follow request adds one reasonable action.
- The branch is still small enough to feel harmless.

## Slide 5 - Then Two Actions

Title:
Then two actions

Focus:
- DM request arrives
- accept + ignore
- the renderer starts parsing shape

Step messages:
- DM request adds decisions, hooks, and routes.
- The shared item now knows which actions are legal.

## Slide 6 - The Outside Still Looks Fine

Title:
The outside still looks fine

Focus:
- short follow usage
- short DM usage
- complexity hides as a set

Step messages:
- A single call site still looks reviewable.
- But the API fails as combinations grow.

## Slide 7 - More Branches

Title:
More branches

Content:
- decision href
- actor removal
- system icon
- appeal handlers

Right text:
The generic item is learning another product concept.

Focus:
- moderation adds product rules
- actor identity becomes conditional
- decision and appeal move inside

Step messages:
- Moderation looks like another type, but changes the rules.
- Navigation now depends on the hidden product shape.
- Identity is no longer always an actor.
- The renderer now owns product behavior.

## Slide 8 - Then Moderation Breaks It

Title:
Then moderation breaks it

Content:
- no actor link
- system icon
- sensitive copy
- decision / appeal

Right text:
Looks like another notification.
Behaves like a new shape.

Focus:
- showActor encodes identity
- system icon changes the shape
- decision and appeal encode behavior

Step messages:
- We are no longer configuring details of the same row.
- Identity, navigation, copy, actions, and permissions changed.
- Another prop is the wrong level of expression.

## Slide 9 - Props Outside, Branches Inside

Title:
Props outside, branches inside

Content:
- one prop chooses icon
- one prop chooses href
- one prop chooses action
- one prop patches a mode

## Slide 10 - Structural Variation

Title:
Structural variation

Subtitle:
Some changes are values.
Some changes are shapes.

Claim:
When variation is structural, make the structure visible.

Emphasis:
- When variation is structural,
- make the structure visible.

## Slide 11 - Configuration Is For Values

Title:
Configuration is for values

Subtitle:
Composition is for shape

Claim:
Configuration is for values. Composition is for shape.

Content:
- Stable shape, new label: prop
- Stable shape, loading state: prop
- New parts / actions / navigation: composition

## Slide 12 - Extract The Row

Title:
Extract the row

Focus:
- row becomes a primitive
- shared frame stays boring
- variant owns behavior

Step messages:
- Start by extracting the shared row as a stable primitive.
- The row renders; the variant decides the product shape.

## Slide 13 - Extract Identity

Title:
Extract identity

Focus:
- identity becomes explicit
- system icon is chosen in JSX
- no optional actor fiction

Step messages:
- Moderation renders system identity directly.

## Slide 14 - Extract Copy

Title:
Extract copy

Focus:
- named body slot
- named timestamp slot
- copy belongs to shape

Step messages:
- Copy stops being a special case inside a generic renderer.

## Slide 15 - Extract Media

Title:
Extract media

Focus:
- media as a visible part
- only shapes that need media render it

Step messages:
- Media appears only in the shapes that truly need it.

## Slide 16 - Extract Actions

Title:
Extract actions

Focus:
- actions as behavior
- two DM decisions
- behavior belongs to the shape

Step messages:
- Accept and ignore become visible behavior primitives.

## Slide 17 - The Shape Is In The Code

Title:
The shape is in the code

Content:
- no `showActor={false}`
- no `primaryAction="viewDecision"`
- no generic moderation branch

Focus:
- system icon
- body
- report reason
- actions
- date

Step messages:
- The supported behavior has a name.
- The row is still an abstraction, but it is readable.
- Reason and visibility are explicit parts of this shape.
- Actions are visible in the composed shape.

## Slide 18 - Make The Variants Explicit

Title:
Make the variants explicit

Content:
- FollowRequestNotification
- PostLikeNotification
- DMRequestNotification
- PhotoTagNotification
- ModerationNotification
- PostCommentNotification

Focus:
- named variants
- supported shapes
- local reasoning

Step messages:
- The module exports supported shapes by name.
- Post like stops being a prop combination.
- DM request becomes the shape you render.
- Photo tag owns media and remove-tag behavior.
- Moderation gets a real place in the API.
- The public question becomes: which supported shape is this?

## Slide 19 - Internal Kit / Public API

Title:
Internal kit / public API

Subtitle:
Flexibility inside.
Local reasoning outside.

Content:
- visual primitives
- behavior primitives
- provider contracts
- named variants
- supported shapes
- local reasoning

## Slide 20 - The Inner Context

Title:
The inner context

Subtitle:
primitives consume an interface

Content:
- `state`: what primitives render
- `actions`: what primitives trigger
- `meta`: refs, ids, labels, tracking

## Slide 21 - New Behavior, New Place

Title:
New behavior, new place

Subtitle:
New complexity gets a new place.

Content:
- reuses actor / body / media
- owns comment preview
- owns reply behavior

Focus:
- reused actor primitive
- comment preview
- post thumbnail
- reply action

Step messages:
- Composition does not remove complexity; it gives it a home.
- The comment preview is not hidden behind a mode.
- Media is reused without pretending every shape has it.
- Reply behavior is owned by the post-comment shape.

## Slide 22 - Shrink The Public State Space

Title:
Shrink the public state space

Subtitle:
Fewer public modes to keep in your head.

Claim:
Every public prop combination is a state someone can write, review, test, and maintain.

Content:
- flag bags widen the state space
- explicit variants narrow the public set
- TypeScript helps with named shapes

## Slide 23 - Make The Shape Visible

Title:
Make The Shape Visible

Subtitle:
Configuration is for values.
Composition is for shape.

Content:
- Supported behavior gets a name.
- Supported shape becomes visible.
- No archeology required.
