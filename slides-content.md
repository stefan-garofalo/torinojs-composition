# Make The Shape Visible

## Slide 1 - Make The Shape Visible

Template shape: yellow title slide

Title:
Make The Shape Visible

Subtitle:
Through a composable React API

Content:
None.

Code:
None.

Script:
I want to talk about React compound components, but not as a cute children API.

I want to talk about what happens when a component has to support more product shapes than its public API can honestly describe.

Visual / animation:
Clean title slide. No code. Keep it calm.

## Slide 2 - A Useful Component Under Pressure

Template shape: white/yellow split slide

Title:
A useful component under pressure

Subtitle:
None.

Content:
Left side:
- Follow request: actor + follow back
- Post like: actor + thumbnail + post link
- DM request: preview + accept / ignore
- Photo tag: thumbnail + remove tag

Right side:
One row.
Several product shapes.

Code:
Optional small code block if space allows:

```tsx
<NotificationItem
  type="dmRequest"
  actor={user}
  message={request}
  showPreview
  primaryAction="accept"
  secondaryAction="ignore"
/>
```

Script:
This starts with a useful component.

Not bad code. Not a contrived example.

`NotificationItem` already supports follow requests, post likes, DM requests, and photo tags. Each feature made sense when it arrived.

They all render as one notification row, but they are not the same shape.

Follow request needs an action. Post like needs media. DM request needs a preview and two decisions. Photo tag needs media plus different behavior.

This is already structural variation. It is just still manageable enough that the component gets away with it.

Visual / animation:
Reveal the four supported shapes first. Highlight the structural part after each colon: action, thumbnail/link, preview/actions, thumbnail/remove tag. Then reveal the right-side contrast line.

## Slide 3 - The Fifth Shape

Template shape: white/yellow split slide

Title:
The fifth shape

Subtitle:
None.

Content:
Left side:
- no actor link
- system icon
- sensitive copy
- decision / appeal

Right side:
Looks like another notification.
Behaves like a new shape.

Code:
```tsx
<NotificationItem
  type="moderation"
  showActor={false}
  showSystemIcon
  showInlineReason
  primaryAction="viewDecision"
  secondaryAction="appeal"
/>
```

Script:
Then product asks for moderation events.

On paper, this is just another notification type. In the component, it changes the rules.

There may be no actor profile to link. The row needs a system icon. The copy is sensitive. The primary action opens a decision. The secondary action may be an appeal.

It looks like one more notification, but it behaves like a new shape.

Visual / animation:
Use the split template. Left side lists the rule changes. Right yellow panel carries the contrast line. If code appears, animate the new props one by one: `showActor`, `showSystemIcon`, `showInlineReason`, actions.

## Slide 4 - Props Outside, Branches Inside

Template shape: white code slide

Title:
Props outside, branches inside

Subtitle:
None.

Content:
- icon branch
- href branch
- action branch
- permission branch

Code:
```tsx
const icon =
  showSystemIcon ? <SystemIcon /> : <Avatar user={actor} />

const href =
  type === "moderation" ? decisionHref :
  type === "dmRequest" ? requestHref :
  profileHref

const primary =
  primaryAction === "appeal" ? appeal :
  primaryAction === "accept" ? acceptRequest :
  undefined
```

Script:
Now the outside API has to be decoded inside the component.

The issue is not that this code has an `if`. Branches are fine.

The issue is that supported product shapes are hidden inside a generic renderer. The component now knows what moderation is, what a DM request is, which route each one opens, and which action is legal.

Many props on the outside. Many branches on the inside.

That is prop soup.

Visual / animation:
Use a code-heavy slide. Animate a line from each prop in Slide 4 to a branch here. Make the right side feel heavier as branches appear.

## Slide 5 - Structural Variation

Template shape: dark emphasis slide

Title:
Structural variation

Subtitle:
Some changes are values.
Some changes are shapes.

Content:
When variation is structural,
make the structure visible.

Code:
None.

Script:
This is the point where I reach for a different lens.

Some product changes are value changes. Some product changes are shape changes.

Moderation is not just a different label inside the same notification. It changes the parts, the actions, the navigation, and the permissions around what can be shown.

When variation is structural, make the structure visible.

Visual / animation:
Use the dark emphasis template. Keep text sparse. Bring in four small words around the title if useful: parts, actions, navigation, permissions.

## Slide 6 - Configuration Is For Values

Template shape: white bullet slide

Title:
Configuration is for values

Subtitle:
Composition is for shape

Content:
- Same surface, new label: prop
- Same surface, loading state: prop
- New parts / actions / navigation: composition

Code:
None.

Script:
This distinction makes the refactor make sense.

Props are fine for independent facts inside a stable shape. A label, a date, a disabled state, a loading state.

But if the product change alters the parts, actions, navigation, permissions, or ownership boundary, the API should stop pretending this is just another value.

That is when the shape should move into code you can see.

Visual / animation:
Use the white bullet slide. Reveal the first two as normal/configuration examples, then visually emphasize the third line as the pivot to composition.

## Slide 7 - Make The Variants Explicit

Template shape: white code slide

Title:
Make the variants explicit

Subtitle:
None.

Content:
- FollowRequestNotification
- PostLikeNotification
- DMRequestNotification
- PhotoTagNotification
- ModerationNotification

Code:
```tsx
export {
  FollowRequestNotification,
  PostLikeNotification,
  DMRequestNotification,
  PhotoTagNotification,
  ModerationNotification,
}
```

Script:
So the public API changes shape.

Instead of one generic component with a growing mode language, the module exports explicit variants for the notification shapes it supports.

Each export is a product shape with a name.

The app no longer asks, "which prop combination describes this notification?"

It asks, "which supported notification variant is this?"

Visual / animation:
This is the first relief slide. Animate the old `NotificationItem type="..."` collapsing into the export list.

## Slide 8 - The Shape Is In The Code

Template shape: white code slide

Title:
The shape is in the code

Subtitle:
None.

Content:
- no `showActor={false}`
- no `primaryAction="viewDecision"`
- no generic moderation branch

Code:
```tsx
export function ModerationNotification(props) {
  return (
    <Notification.Container {...props}>
      <Notification.SystemIcon />
      <Notification.Body />
      <Notification.ReportReason />
      <Notification.Actions>
        <Notification.ViewDecision />
        <Notification.Appeal />
      </Notification.Actions>
      <Notification.Date />
    </Notification.Container>
  )
}
```

Script:
Open one of those exports and the shape is right there.

No `showActor={false}`. No `primaryAction="viewDecision"`. No generic row quietly learning moderation rules.

The product shape has a name, and the structure is visible from the code.

Visual / animation:
Animate the old moderation props fading out, then reveal the primitives in order: system icon, body, reason, actions, date.

## Slide 9 - Internal Kit / Public API

Template shape: white/yellow split slide

Title:
Internal kit / public API

Subtitle:
None.

Content:
Left side:
- primitives
- context structure
- variant logic

Right side:
- named variants
- supported shapes
- stable imports

Code:
None.

Script:
This is still compound components, but with a boundary.

The primitives are the internal kit. The named notification variants are the public API.

App code does not need to assemble every notification by hand. It imports the shapes the module supports.

Module authors still get the flexibility of composition when a new shape arrives.

Flexibility inside. Local reasoning outside.

Visual / animation:
Use the split template. Left side is internal, right yellow panel is public. End by emphasizing the line: flexibility inside, local reasoning outside.

## Slide 10 - The Inner Context

Template shape: white code slide

Title:
The inner context

Subtitle:
state / actions / meta

Content:
- `state`: what primitives render
- `actions`: what primitives trigger
- `meta`: refs, ids, labels, formatting

Code:
```tsx
type NotificationContext = {
  state: NotificationState
  actions: NotificationActions
  meta: NotificationMeta
}
```

Script:
The data did not disappear.

Each named variant owns the provider boundary its primitives need.

`state` is what primitives render. `actions` are what primitives can trigger. `meta` is the operational context around them: refs, ids, labels, formatting, tracking, platform details.

`Notification.ViewDecision` does not need five props at the call site. It consumes the generic context interface implemented by `ModerationNotification`.

Visual / animation:
Show the context type in the center. Highlight `actions` when mentioning `ViewDecision`; highlight `meta` only briefly so it does not become a detour.

## Slide 11 - The Registry Backtests The API

Template shape: white code slide

Title:
The registry backtests the API

Subtitle:
product type -> supported shape

Content:
- product taxonomy
- explicit variant set
- type coverage

Code:
```tsx
const NOTIFICATIONS: Record<
  NotificationType,
  NotificationRenderer
> = {
  followRequest: FollowRequestNotification,
  postLike: PostLikeNotification,
  dmRequest: DMRequestNotification,
  photoTag: PhotoTagNotification,
  moderation: ModerationNotification,
}
```

Script:
The registry is where this stops being just a nice refactor.

This record is a coverage surface. It forces the product taxonomy and the explicit variant set to stay aligned.

When a backend notification type exists, the frontend needs a supported shape for it.

When primitives or variant props change, the registry helps backtest the baseline we already claimed to support.

Visual / animation:
Animate a new `NotificationType` appearing without a renderer, then the record failing until a named variant is added. Keep it IDE-like, not theatrical.

## Slide 12 - The IDE Knows The Shapes

Template shape: white/yellow split slide

Title:
The IDE knows the shapes

Subtitle:
None.

Content:
Left side:
- unions
- records
- exact props

Right side:
Fewer public modes.

Code:
```tsx
type NotificationType =
  | "followRequest"
  | "postLike"
  | "dmRequest"
  | "photoTag"
  | "moderation"
```

Script:
TypeScript helps because the supported shapes are explicit.

Not with clever types for their own sake. Mostly with unions and records.

The IDE can autocomplete the variants the module supports. Each variant can ask for the exact props it needs. The registry can fail when the supported type set and the rendered variant set drift apart.

The point is not fewer characters. The point is fewer public modes to reason about.

Visual / animation:
Show an IDE-like autocomplete moment. Highlight `NotificationType`, then the matching exported variant. Keep the right yellow panel as the conceptual takeaway.

## Slide 13 - New Behavior, New Place

Template shape: white code slide

Title:
New behavior, new place

Subtitle:
Post comments do not become more props.

Content:
- shares post thumbnail
- shares text preview
- owns reply behavior

Code:
```tsx
export function PostCommentNotification(props) {
  return (
    <Notification.Container {...props}>
      <Notification.Actor />
      <Notification.Body />
      <Notification.CommentPreview />
      <Notification.PostThumbnail />
      <Notification.Actions>
        <Notification.Reply />
      </Notification.Actions>
      <Notification.Date />
    </Notification.Container>
  )
}
```

Script:
Then product asks for post comment notifications.

In the old API, this would be another overlap problem. It looks a bit like post like because there is a post thumbnail. It looks a bit like DM request because there is a text preview. It may have its own reply action and comment permalink.

With the new shape, it gets a name.

It can share primitives without pretending to be another notification type.

Visual / animation:
Show `PostLikeNotification` and `DMRequestNotification` primitives ghosted in the background, then assemble `PostCommentNotification` from shared pieces plus `Reply`.

## Slide 14 - Shrink The Public State Space

Template shape: dark emphasis slide

Title:
Shrink the public state space

Subtitle:
Fewer shapes to reason about.

Content:
- flag bags widen the space
- named shapes narrow the public set
- fewer valid combinations to understand

Code:
None.

Script:
This is the small theory behind the pattern.

A component API has a public state space. Every public prop combination is a state someone can write, review, and maintain.

A bag of flags creates a wide space of possible modes. Explicit variants create a smaller set of supported shapes.

The goal is not only to reject impossible states. It is to make the public set small enough that people can hold it in their head.

Visual / animation:
Use the dark emphasis slide. Animate many small prop combinations collapsing into a short list of named shapes.

## Slide 15 - Make The Shape Visible

Template shape: yellow final title slide

Title:
Make The Shape Visible

Subtitle:
Configuration is for values.
Composition is for shape.

Content:
- Supported behavior gets a name.
- Supported shape becomes visible.
- Flexibility inside. Local reasoning outside.

Code:
None.

Script:
That is the rule I want to leave with.

Configuration is for values. Composition is for shape.

If a product behavior is supported, give it a name. If a shape is supported, make it visible.

If a rule changes the parts, actions, navigation, permissions, or ownership boundary, do not hide it inside another prop on a generic component.

Keep the flexibility inside the module. Give local reasoning to the outside.

Visual / animation:
Return to the yellow title style. Keep it sparse. Bring back the final line from Slide 10: flexibility inside, local reasoning outside.
