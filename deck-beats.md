# Make The Shape Visible

We start with a component that already earned its place.

`NotificationItem` supports follow requests, post likes, DM requests, and photo tags. None of those features were unreasonable. Each one needed a slightly different row, so the component learned a few more props and a few more branches.

```tsx
<NotificationItem
  type="dmRequest"
  actor={user}
  message={request}
  showPreview
  primaryAction="accept"
  secondaryAction="ignore"
  timestamp={timestamp}
/>
```

This is not disaster code.

It is a useful component that has been asked to support several product shapes through one public API.

---

The existing shapes are already different.

Follow request needs an actor and a follow-back action.

Post like needs an actor, a post thumbnail, and a post link.

DM request needs an actor, a message preview, and accept / ignore actions.

Photo tag needs an actor, a photo thumbnail, and maybe remove-tag behavior.

They all fit inside a notification row, but they are not the same shape.

---

Then product asks for moderation events.

On paper, this is just another notification type.

In the component, it changes the rules.

There may be no actor profile to link. The row may need a system icon instead of an avatar. The copy is sensitive. The target may be hidden. The primary action opens a decision. The secondary action may be an appeal.

```tsx
<NotificationItem
  type="moderation"
  actor={null}
  showActor={false}
  showSystemIcon
  showInlineReason
  primaryAction="viewDecision"
  secondaryAction="appeal"
/>
```

The new feature does not only add data.

It changes the shape.

---

Now the outside API has to be decoded inside the component.

```tsx
const icon =
  showSystemIcon ? <SystemIcon /> : <Avatar user={actor} />

const href =
  type === "moderation" ? decisionHref :
  type === "dmRequest" ? requestHref :
  type === "postLike" ? postHref :
  profileHref

const primary =
  primaryAction === "appeal" ? appeal :
  primaryAction === "accept" ? acceptRequest :
  primaryAction === "followBack" ? followBack :
  undefined
```

The issue is not that this code has an `if`.

The issue is that supported product shapes are now hidden inside a generic renderer.

Many props on the outside.

Many branches on the inside.

That is prop soup.

---

This is the point where I reach for a different lens.

Some product changes are value changes.

Some product changes are shape changes.

Moderation is not just a different label inside the same notification row. It changes the parts, the actions, the navigation, and the permissions around what can be shown.

That is structural variation.

When variation is structural, make the structure visible.

---

This is the distinction that makes the refactor make sense.

Configuration is for values.

Composition is for shape.

If the row is the same shape and only the label, date, disabled state, or loading state changes, a prop is fine.

If the product change alters the parts, actions, navigation, permissions, or ownership boundary, the API should stop pretending this is just another value.

That is when the shape should move into the code you can see.

---

So the public API changes shape.

Instead of one generic component with a growing prop language, the module exports the notification shapes it supports.

```tsx
export {
  FollowRequestNotification,
  PostLikeNotification,
  DMRequestNotification,
  PhotoTagNotification,
  ModerationNotification,
}
```

Each export is a product shape with a name.

The app no longer asks, "which prop combination describes this notification?"

It asks, "which supported notification shape is this?"

---

Open one of those exports and the shape is right there.

```tsx
export function ModerationNotification(props: NotificationProps) {
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

No `showActor={false}`.

No `primaryAction="viewDecision"`.

No generic row quietly learning moderation rules.

The product shape has a name, and the structure is visible from the code.

---

This is still compound components, but with a boundary.

The primitives are the internal kit.

The named notification abstractions are the public API.

App code does not need to assemble every notification by hand. It imports the shapes the module supports.

Module authors still get the flexibility of composition when a new shape arrives.

Flexibility inside.

Local reasoning outside.

---

The data did not disappear.

Each named abstraction owns the context structure its primitives need.

```tsx
type NotificationContext = {
  state: NotificationState
  actions: NotificationActions
  meta: NotificationMeta
}
```

`state` is what primitives render.

`actions` are what primitives can trigger.

`meta` is the operational context around them: refs, ids, labels, formatting, tracking, platform details.

`Notification.ViewDecision` does not need five props at the call site. It reads the action from the context structure provided by `ModerationNotification`.

---

The registry is where this stops being just a nice refactor.

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

This record is a coverage surface.

It forces the product taxonomy and the UI taxonomy to stay aligned.

When a backend notification type exists, the frontend needs a supported shape for it.

When primitives or abstraction props change, the registry helps backtest the baseline we already claimed to support.

---

TypeScript helps because the supported shapes are explicit.

Not with clever types for their own sake.

Mostly with unions and records.

```tsx
type NotificationType =
  | "followRequest"
  | "postLike"
  | "dmRequest"
  | "photoTag"
  | "moderation"
```

The IDE can autocomplete the shapes the module supports.

Each abstraction can ask for the exact props it needs.

The registry can fail when the supported set and the rendered set drift apart.

The point is not fewer characters.

The point is fewer valid public combinations to reason about.

---

Then product asks for post comment notifications.

In the old API, this would be another overlap problem.

It looks a bit like post like because there is a post thumbnail.

It looks a bit like DM request because there is a text preview.

It may have its own reply action and comment permalink.

With the new shape, it gets a name.

```tsx
export function PostCommentNotification(props: NotificationProps) {
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

It can share primitives without pretending to be another notification type.

---

This is the small theory behind the pattern.

A component API has a state space.

Every public prop combination is a state someone can write, review, and maintain.

A bag of flags creates a wide space of combinations.

Named abstractions create a smaller set of supported shapes.

The goal is not only to reject impossible states.

It is also to reduce the number of valid public combinations people have to think about.

---

That is the rule I want to leave with.

Configuration is for values.

Composition is for shape.

If a product behavior is supported, give it a name.

If a shape is supported, make it visible.

If a rule changes the parts, actions, navigation, permissions, or ownership boundary, do not hide it inside another prop on a generic component.

Keep the flexibility inside the module.

Give local reasoning to the outside.
