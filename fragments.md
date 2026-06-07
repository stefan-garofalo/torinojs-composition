# Composition Is The API

Start with a component that looks normal.

Not absurd. Not obviously terrible. Just a React component that has been extended a few times.

The interesting part is that nobody did anything especially wrong. Someone needed a follow notification, then a like notification, then a story mention, then a DM request, then a report outcome. Each change was small. The API became hard to read anyway.

---

```tsx
<NotificationItem
  type="storyMention"
  showAvatar
  showThumbnail
  showInlinePreview
  showPrimaryAction
  showSecondaryAction={false}
  isUnread
  isSensitive={false}
  user={user}
  media={story}
  onOpen={openStory}
  onPrimaryAction={reply}
/>
```

The problem with this call site is not syntax. The problem is that the supported product states are now implicit.

Which combinations are valid?
Which ones are accidental?
Which prop wins when two modes disagree?
Where is that rule written?

Usually: in somebody's head, or inside a long conditional block.

---

Boolean props are cheap to add and expensive to understand later.

---

A boolean prop is fine when it represents an independent fact.

`disabled` is fine.
`checked` is fine.
`loading` is often fine.

The trouble starts when booleans represent mutually exclusive modes.

`showAvatar`, `showThumbnail`, `showInlinePreview`, `showPrimaryAction`, `isSensitive`, `isSystem`, `isMessageRequest`.

Those are not independent facts anymore. They are trying to describe a state model.

---

Once props become a small language, the component has become a parser.

---

I like compound components because they move the shape of the UI back into JSX.

Instead of passing a configuration object and hoping the component interprets it the same way you do, you write the structure directly.

---

```tsx
<StoryMentionNotification>
  <Notification.Actor />
  <Notification.Text />
  <Notification.StoryThumbnail />
  <Notification.Actions>
    <Notification.Reply />
  </Notification.Actions>
</StoryMentionNotification>
```

This is still abstraction, but the abstraction is readable from the outside.

---

The important shift is from "configure this object" to "compose these parts."

---

The exported primitives become the vocabulary of the component.

If a primitive is exported, it is supported.
If a variant exists, it has a name.
If a behavior is hidden, it lives behind a provider boundary with a clear contract.

---

The goal is not to remove props.

The goal is to stop using props as an undocumented mode system.

---

The provider boundary is where the component keeps its private life.

State, actions, refs, async behavior, platform differences, translations, tracking, data loading.

The primitives should not need to know how all of that works. They should consume a small contract and render their piece.

---

Context is useful when it makes related primitives work together without prop drilling.

Context becomes suspicious when it hides inputs that should be visible at the call site.

---

There is a nice tension here:

The composition should be explicit.
The implementation details should be private.

That is the pattern I like: explicit surface, private machinery.

---

TypeScript is not just there to check whether a prop exists.

The stronger use is to encode valid UI states.

If a component can be either a link or a button, the API should make it hard to pass both `href` and `onClick` in the wrong combination.

If an action can render its own child, the API should not require an action handler that will never be used.

---

Good TypeScript makes the IDE feel like part of the design system.

Autocomplete shows the available primitives.
Prop errors show invalid states.
The component API teaches itself while you write it.

---

The notifications example is useful because it is not a fake docs example.

There is a backend notification type.
There is a dispatcher.
Each notification type maps to a small explicit renderer.
Those renderers compose the same primitives in different shapes: aside, avatar, icon, content, context, actions, date.

That is exactly the point. Shared parts, named variants, no giant public mode prop.

---

The badge is a useful counterexample.

It still has a `disableNavigation` flag.
It is not terrible.
It probably does not need a whole compound API.

That matters because the talk should not sound like a religion. The pattern is valuable where variation is structural. For small independent behavior, a prop can be the right tool.

---

Composition does not make complexity disappear.

It decides where the complexity lives.

In a good version, complexity lives in named variants, exported primitives, and provider contracts.

In a bad version, complexity lives in hidden conditionals, context nobody can trace, and prop combinations nobody wants to test.

---

The Remotion angle should show the mental model, not decorate the slides.

Animate the boolean flags multiplying into combinations.
Animate the same behavior collapsing into named variants.
Animate primitives assembling into a notification row.
Animate an IDE autocomplete moment where the component vocabulary appears.
Animate a TypeScript error when an invalid combination is typed.

---

A good code animation should make the audience feel the API getting simpler.

Not "look, this moves."

"Look, the set of possible states is smaller now."

---

React's composition model gives us a few basic tools:

`children` for containment.
Element props for slots.
Specialized components for named use cases.
Context for shared dependencies inside a tree.

Compound components combine those tools into a component API.

---

React does not force a closed system.

A design system can choose to create one.

That is the useful idea: a small vocabulary of parts, predictable compositions, and fewer illegal states.

---

The FP analogy is useful if we keep it grounded.

Product types are combinations.
Sum types are choices.

Many boolean props pretend every combination is valid.
Explicit variants say which choices exist.

---

Maybe the simplest sentence:

When variation is structural, make the structure visible.

---

The opener should not present the bad component as obviously stupid.

It should feel familiar.

Something like: "This is the kind of component you end up with when every individual decision was reasonable."

That is the useful tension. The audience should recognize themselves in it, not feel like we are dunking on bad code.

---

Reject `Composer` as the opener.

It is too close to Fernando Rojo's talk territory. Even if the content is valid, the shape will feel borrowed. We need a different component where the same composition problem appears without triggering that association.

---

Possible monster component: `NotificationItem`.

It starts simple: avatar, text, date.

Then product adds notification types: follow, comment, like, poll, trip joined, new template.

Then some need actions. Some need an icon instead of an avatar. Some need quoted context. Some navigate to a profile, some to an itinerary, some open a modal.

The API can easily become:

```tsx
<NotificationItem
  type="poll"
  showAvatar={false}
  showIcon
  showActions
  showContext
  isUnread
  isSwipeable
  isWebActionsMenu
  onPrimaryAction={openPoll}
  onSecondaryAction={dismiss}
/>
```

This feels closer to the real implementation and less like a generic chat example.

---

Chosen opener domain: social-media notifications.

The component starts with the simplest row:

avatar, text, time.

Then the product grows:

- someone followed you
- someone liked your post
- someone commented on your post
- someone mentioned you in a story
- someone sent a DM request
- a report you submitted has an outcome
- a post was removed
- a story expired
- someone tagged you in a photo

These notifications do not only have different copy. They have different structure.

Some show an actor avatar.
Some show a post thumbnail.
Some show a story ring.
Some show a system icon.
Some need quick actions.
Some link to a profile.
Some link to media.
Some open a message thread.
Some should not expose the reported user's profile.

That is exactly where a generic `NotificationItem` starts lying.

---

Bad API sketch for the opener:

```tsx
<NotificationItem
  type="reportOutcome"
  actor={reportedUser}
  target={post}
  showActor={false}
  showSystemIcon
  showMediaThumbnail={false}
  showInlineReason
  showPrimaryAction
  primaryActionLabel="View decision"
  secondaryActionLabel="Appeal"
  isUnread
  isSensitive
  isActionable
  href="/support/reports/123"
  onPrimaryAction={openReport}
  onSecondaryAction={appeal}
/>
```

This is the moment where the component is no longer rendering a notification. It is interpreting a notification description language.

---

Cleaner social notification vocabulary:

```tsx
<ReportOutcomeNotification notification={notification}>
  <Notification.SystemIcon />
  <Notification.Body />
  <Notification.Reason />
  <Notification.Actions>
    <Notification.ViewDecision />
    <Notification.Appeal />
  </Notification.Actions>
  <Notification.Date />
</ReportOutcomeNotification>
```

The structure tells you what kind of notification this is before you inspect the implementation.

---

Possible primitive vocabulary for social notifications:

`Notification.Root`
`Notification.Actor`
`Notification.SystemIcon`
`Notification.Body`
`Notification.Context`
`Notification.PostThumbnail`
`Notification.StoryPreview`
`Notification.MessagePreview`
`Notification.Actions`
`Notification.FollowBack`
`Notification.Reply`
`Notification.ViewPost`
`Notification.ViewStory`
`Notification.ViewDecision`
`Notification.Appeal`
`Notification.Date`

This might be too many for a slide, but useful as raw material.

---

The key distinction for notifications:

Different notification types are not just different strings.

They imply different UI structure, different navigation, different permissions, and different actions.

That is why a prop-driven `NotificationItem` gets messy fast.

---

Possible monster component: `SearchResultCard`.

It sounds boring, which is good.

One card for users, trips, templates, destinations, recent searches, sponsored results, empty states.

At first it is just a card. Then it gets `isUser`, `isTrip`, `isTemplate`, `showAvatar`, `showImage`, `showCTA`, `isSponsored`, `isCompact`, `highlightMatch`, `onFollow`, `onSave`, `onOpen`.

This is a strong example if the talk wants a product/UI-system flavor instead of chat flavor.

---

Possible monster component: `OnboardingStep`.

Good because it naturally mixes state, layout, validation, actions, and async behavior.

A single component tries to handle welcome, permissions, profile setup, preferences, plan selection, success state.

The flags become lifecycle:

```tsx
<OnboardingStep
  isFirst
  isLast
  requiresPermission
  hasValidation
  isSubmitting
  showBackButton
  showSkipButton
  persistOnNext
/>
```

This is a good example for provider boundaries, but weaker for compound primitives unless we make the primitives explicit: `Onboarding.Frame`, `Onboarding.Progress`, `Onboarding.Body`, `Onboarding.Actions`, `Onboarding.Skip`, `Onboarding.Next`.

---

Possible monster component: `DataCard`.

This one is very common in dashboards: metric card, chart card, table card, empty card, loading card, error card, comparison card.

It becomes a pile of props because every product team wants a slightly different card.

Could be strong for an engineering audience because everyone has seen a design-system card become a dumping ground.

---

Opening sequence:

"We already have a notification component."

It supports:

- follow
- post like
- DM request
- tagged in photo

Then product asks for a moderation event.

Then product asks for post comment notifications.

This is better than starting with an already-broken component. The component becomes stressed in front of the audience.

---

Slide grammar for the first act:

Left panel: the outside shape.

Show the call site. Props. The API that product code sees.

Right panel: the inside shape.

Show the component body. Hooks, conditionals, derived behavior, routing decisions, action rendering.

The point is visual: every new prop on the left creates a new branch on the right.

---

Initial supported notification behaviors:

Follow notification:

- actor avatar
- actor name
- "started following you"
- primary action: Follow back
- link: actor profile

Post like notification:

- actor avatar
- actor name
- "liked your post"
- post thumbnail
- link: post detail

DM request notification:

- actor avatar
- actor name
- short message preview
- actions: Accept, Ignore
- link: message request inbox

Tagged in photo notification:

- actor avatar
- actor name
- "tagged you in a photo"
- photo thumbnail
- action: View photo
- maybe secondary action: Remove tag

This is already enough variation to make a generic `NotificationItem` start accumulating public knobs.

---

First product request:

"We need moderation events."

That sounds like another notification type, but it changes the rules:

- no actor profile link
- system icon instead of actor avatar
- sensitive copy
- support/decision link
- possible appeal action
- maybe no media thumbnail even if the target is a post
- different permissions around what can be shown

The component now needs behavior that is not just visual variation.

---

Second product request:

"We also need post comment notifications."

This one looks ordinary, but it adds another axis:

- actor avatar
- post thumbnail
- comment excerpt
- link to the comment inside the post
- quick reply action
- maybe moderation state if the comment was hidden

Post comment overlaps with post like, DM request, and moderation. That overlap is what makes generic props tempting and dangerous.

---

Bad two-panel slide idea:

Left:

```tsx
<NotificationItem
  type="moderation"
  actor={null}
  target={post}
  showAvatar={false}
  showSystemIcon
  showThumbnail={false}
  showInlineReason
  primaryAction="viewDecision"
  secondaryAction="appeal"
  href={reportUrl}
/>
```

Right:

```tsx
const icon = showSystemIcon ? <Shield /> : <Avatar user={actor} />
const thumbnail = showThumbnail ? <PostThumb post={target} /> : null
const href = type === "moderation" ? reportUrl : getTargetHref(target)
const canAppeal = type === "moderation" && report.status === "actioned"
```

The slide should feel like the left side is leaking into the right side.

---

Second two-panel slide idea:

Left:

```tsx
<NotificationItem
  type="postComment"
  actor={comment.author}
  target={post}
  comment={comment}
  showAvatar
  showThumbnail
  showInlinePreview
  primaryAction="reply"
  href={`/posts/${post.id}?comment=${comment.id}`}
/>
```

Right:

```tsx
const preview =
  type === "dmRequest" ? message.preview :
  type === "postComment" ? comment.text :
  type === "moderation" ? report.reason :
  null
```

The bug is not that this code is impossible. The bug is that every feature teaches the generic component another product concept.

---

Possible spoken line:

"At this point the component is not just rendering notifications. It knows what a report is, what a DM request is, what a comment permalink is, what actions are allowed, and which user links should disappear."

---

The refactor should not be introduced as cleanup.

It should be introduced as making the supported behaviors explicit.

Supported abstractions:

`FollowNotification`
`PostLikeNotification`
`DMRequestNotification`
`TaggedPhotoNotification`
`ModerationNotification`
`PostCommentNotification`

Each one composes the same notification primitives.

---

Better two-panel slide after refactor:

Left:

```tsx
<ModerationNotification notification={notification}>
  <Notification.SystemIcon />
  <Notification.Body />
  <Notification.ReportReason />
  <Notification.Actions>
    <Notification.ViewDecision />
    <Notification.Appeal />
  </Notification.Actions>
  <Notification.Date />
</ModerationNotification>
```

Right:

```tsx
function ModerationNotification({ notification, children }) {
  const model = useModerationNotification(notification)

  return (
    <Notification.Provider value={model}>
      <Notification.Row>{children}</Notification.Row>
    </Notification.Provider>
  )
}
```

The outside shape is now specific. The inside behavior is now contained.

---

First bad implementation should start from the four existing variants, before moderation and comments.

Supported today:

- follow
- post like
- DM request
- tagged in photo

The component is not a disaster yet. It is a plausible shared row.

---

Bad but reasonable public API:

```tsx
type NotificationItemProps = {
  type: "follow" | "postLike" | "dmRequest" | "taggedPhoto"
  actor: User
  post?: Post
  message?: MessageRequest
  photo?: Photo
  unread?: boolean
  showThumbnail?: boolean
  showPreview?: boolean
  primaryAction?: "followBack" | "accept" | "view"
  secondaryAction?: "ignore" | "removeTag"
  onPrimaryAction?: () => void
  onSecondaryAction?: () => void
}
```

This interface looks fine at first because every prop has a reason to exist.

The weakness is that the relationships between props live outside the type.

`post` only makes sense for `postLike`.
`message` only makes sense for `dmRequest`.
`photo` only makes sense for `taggedPhoto`.
`secondaryAction="ignore"` only makes sense for DM requests.
`secondaryAction="removeTag"` only makes sense for tagged photos.

The type allows too many sentences.

---

Bad but reasonable call sites:

```tsx
<NotificationItem
  type="follow"
  actor={user}
  unread
  primaryAction="followBack"
  onPrimaryAction={followBack}
/>

<NotificationItem
  type="postLike"
  actor={user}
  post={post}
  showThumbnail
/>

<NotificationItem
  type="dmRequest"
  actor={user}
  message={request}
  showPreview
  primaryAction="accept"
  secondaryAction="ignore"
/>

<NotificationItem
  type="taggedPhoto"
  actor={user}
  photo={photo}
  showThumbnail
  primaryAction="view"
  secondaryAction="removeTag"
/>
```

This should be the first two-panel slide: nothing here is shocking. The problem is already present, but still quiet.

---

Bad but reasonable inside shape:

```tsx
function NotificationItem(props: NotificationItemProps) {
  const router = useRouter()
  const t = useTranslations()
  const markAsRead = useMarkNotificationAsRead()

  const {
    type,
    actor,
    post,
    message,
    photo,
    unread,
    showThumbnail,
    showPreview,
    primaryAction,
    secondaryAction,
  } = props

  const href =
    type === "follow" ? `/users/${actor.id}` :
    type === "postLike" ? `/posts/${post?.id}` :
    type === "dmRequest" ? `/inbox/requests/${message?.id}` :
    type === "taggedPhoto" ? `/photos/${photo?.id}` :
    undefined

  const body =
    type === "follow" ? t("notifications.follow", { name: actor.name }) :
    type === "postLike" ? t("notifications.postLike", { name: actor.name }) :
    type === "dmRequest" ? t("notifications.dmRequest", { name: actor.name }) :
    t("notifications.taggedPhoto", { name: actor.name })

  const preview =
    showPreview && type === "dmRequest" ? message?.text :
    showThumbnail && type === "postLike" ? post?.caption :
    showThumbnail && type === "taggedPhoto" ? photo?.alt :
    null

  const thumbnail =
    showThumbnail && type === "postLike" ? <PostThumbnail post={post} /> :
    showThumbnail && type === "taggedPhoto" ? <PhotoThumbnail photo={photo} /> :
    null

  return (
    <Pressable
      onPress={() => {
        markAsRead()
        if (href) router.push(href)
      }}
      className={unread ? "bg-blue-50" : "bg-white"}
    >
      <Avatar user={actor} />
      <div>
        <p>{body}</p>
        {preview && <p>{preview}</p>}
      </div>
      {thumbnail}
      {primaryAction && <NotificationAction action={primaryAction} />}
      {secondaryAction && <NotificationAction action={secondaryAction} />}
    </Pressable>
  )
}
```

This is the exact kind of code that feels okay until the fifth variant arrives.

---

What makes the wrong version reasonable:

- the prop names are understandable
- the variants are real product states
- the hooks are normal hooks
- the branches are local and easy at first
- no single line looks outrageous

What makes it fragile:

- data shape is optional instead of variant-specific
- navigation is centralized in the generic component
- copy selection is centralized in the generic component
- preview logic is centralized in the generic component
- actions are strings instead of concrete components
- adding a variant means touching the same shared conditional areas again

---

Moderation event as the first stress test:

```tsx
type NotificationItemProps = {
  type:
    | "follow"
    | "postLike"
    | "dmRequest"
    | "taggedPhoto"
    | "moderation"
  actor?: User
  post?: Post
  message?: MessageRequest
  photo?: Photo
  report?: Report
  unread?: boolean
  showAvatar?: boolean
  showSystemIcon?: boolean
  showThumbnail?: boolean
  showPreview?: boolean
  primaryAction?: "followBack" | "accept" | "view" | "viewDecision"
  secondaryAction?: "ignore" | "removeTag" | "appeal"
  onPrimaryAction?: () => void
  onSecondaryAction?: () => void
}
```

Moderation makes the optional-prop model worse because `actor` is no longer guaranteed, the icon changes, the link is not a normal content link, and the actions depend on report state.

---

Post comment as the second stress test:

```tsx
type NotificationItemProps = {
  type:
    | "follow"
    | "postLike"
    | "dmRequest"
    | "taggedPhoto"
    | "moderation"
    | "postComment"
  actor?: User
  post?: Post
  comment?: Comment
  message?: MessageRequest
  photo?: Photo
  report?: Report
  unread?: boolean
  showAvatar?: boolean
  showSystemIcon?: boolean
  showThumbnail?: boolean
  showPreview?: boolean
  highlightComment?: boolean
  primaryAction?:
    | "followBack"
    | "accept"
    | "view"
    | "viewDecision"
    | "reply"
  secondaryAction?: "ignore" | "removeTag" | "appeal"
  onPrimaryAction?: () => void
  onSecondaryAction?: () => void
}
```

Post comment looks harmless because it resembles post like. That is exactly why it is dangerous: it encourages reuse of the same generic paths while adding another special case to preview, href, thumbnail, and action behavior.

---

Do not insert a long intermediate step where we only extract a registry.

For the talk, go from soup directly to composition.

The relief should be visible immediately: instead of reading props and then discovering behavior inside the component, the outside shape starts describing the notification.

---

Direct transition:

"The issue is not that this component has too much code. The issue is that the outside shape does not match the inside behavior."

Then show composition.

---

Clean composition reveal:

```tsx
export function FollowRequestNotification(props: NotificationProps) {
  return (
    <Notification.Container {...props}>
      <Notification.Actor />
      <Notification.Body />
      <Notification.Actions>
        <Notification.FollowBack />
      </Notification.Actions>
      <Notification.Date />
    </Notification.Container>
  )
}

export function PostLikeNotification(props: NotificationProps) {
  return (
    <Notification.Container {...props}>
      <Notification.Actor />
      <Notification.Body />
      <Notification.PostThumbnail />
      <Notification.Date />
    </Notification.Container>
  )
}

export function DMRequestNotification(props: NotificationProps) {
  return (
    <Notification.Container {...props}>
      <Notification.Actor />
      <Notification.Body />
      <Notification.MessagePreview />
      <Notification.Actions>
        <Notification.Accept />
        <Notification.Ignore />
      </Notification.Actions>
      <Notification.Date />
    </Notification.Container>
  )
}

export function PhotoTagNotification(props: NotificationProps) {
  return (
    <Notification.Container {...props}>
      <Notification.Actor />
      <Notification.Body />
      <Notification.PhotoThumbnail />
      <Notification.Actions>
        <Notification.ViewPhoto />
        <Notification.RemoveTag />
      </Notification.Actions>
      <Notification.Date />
    </Notification.Container>
  )
}
```

This is the first moment where the audience should feel the API breathing again.

---

The public API becomes a set of supported compositions.

Follow request supports actor, body, follow back, date.
Post like supports actor, body, post thumbnail, date.
DM request supports actor, body, message preview, accept, ignore, date.
Photo tag supports actor, body, photo thumbnail, view photo, remove tag, date.

The supported behavior is no longer hidden inside a generic prop interface.

---

Each variant is an explicit abstraction.

Not just a different `type` value.

An exported component whose implementation is a supported composition:

```tsx
export function DMRequestNotification(props: NotificationProps) {
  return (
    <Notification.Container {...props}>
      <Notification.Actor />
      <Notification.Body />
      <Notification.MessagePreview />
      <Notification.Actions>
        <Notification.Accept />
        <Notification.Ignore />
      </Notification.Actions>
      <Notification.Date />
    </Notification.Container>
  )
}
```

Then the module exports the supported abstractions:

```tsx
export {
  FollowRequestNotification,
  PostLikeNotification,
  DMRequestNotification,
  PhotoTagNotification,
}
```

That export list matters. It is the list of supported notification shapes.

If product asks for moderation, we add `ModerationNotification`.
If product asks for comments, we add `PostCommentNotification`.

The new behavior gets a name instead of becoming another combination of generic props.

---

Slide idea:

Four columns, one per supported abstraction:

`FollowRequestNotification`
`PostLikeNotification`
`DMRequestNotification`
`PhotoTagNotification`

Each column uses the same primitive vocabulary.

Shared primitives stay visually stable.
Variant-specific primitives appear only where they belong.

The audience should see that composition is not "anything goes." It is a supported set of named compositions.

---

Then moderation arrives:

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

Moderation does not add `showSystemIcon`, `showActor={false}`, `showInlineReason`, `primaryAction="viewDecision"`.

It adds a supported abstraction with the structure it actually needs.

---

Then post comment arrives:

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

Post comment can share primitives with post like and DM request without becoming either one.

---

Composition is not introduced as code cleanup.

It is introduced as API alignment.

The call site starts saying the same thing as the behavior.

---

The clean version should still acknowledge hidden behavior.

`Notification.Actor` can read the actor from context.
`Notification.PostThumbnail` can read the target post from context.
`Notification.Reply` can read the action from context.
`Notification.Date` can read timestamp and locale from context.

The composition is explicit.
The data plumbing is private.

---

Possible line:

"I do not want every consumer to pass the same actor, timestamp, href, locale, action handlers, and tracking metadata through every primitive. That would be explicit in the worst possible way."

---

The provider boundary is the answer to the obvious objection:

"But where did the data go?"

The data did not disappear. It moved into the variant provider.

Each variant owns the model for that notification type, then the primitives consume the model.

---

Slide copy draft v1.

Slide 1

Title: Composition Is The API

Content:

React compound components for UI that keeps growing.

Script:

I want to talk about a pattern I really like because it changes how a component feels from the outside. Not just how it is implemented. The API becomes visible. The supported states become visible. The component stops asking consumers to remember hidden rules.

Code content:

No code. Title slide.

---

Slide 2

Title: A Normal Component

Content:

It starts with one row.

avatar
text
time

Script:

This starts as a normal notification row. Nothing interesting yet. Someone followed you, someone liked a post, someone tagged you in a photo. A small component, easy to reason about.

Code content:

```tsx
<NotificationItem
  actor={user}
  text="started following you"
  date={date}
/>
```

---

Slide 3

Title: Then Product Keeps Going

Content:

Follow request
Post like
DM request
Photo tag

Same component. More behavior.

Script:

The component grows in a way that feels reasonable. Follow needs a follow-back action. Post like needs a thumbnail. DM request needs accept and ignore. Photo tag needs view photo and maybe remove tag. Every request makes sense by itself.

Code content:

```tsx
type NotificationType =
  | "followRequest"
  | "postLike"
  | "dmRequest"
  | "photoTag"
```

---

Slide 4

Title: The Outside Shape

Content:

The call site starts carrying product rules.

Script:

From the outside, this still looks like one flexible component. But the props are starting to describe different products inside the product. Some props belong to one notification type. Some belong to another. The component accepts all of them.

Code content:

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

Visual note:

Two panels begin here. Left panel is call site.

---

Slide 5

Title: The Inside Shape

Content:

One prop outside.
One branch inside.

Script:

Inside the component, every new prop needs interpretation. Where does it link? Which preview do we show? Which action means what? Which hook is needed? The component is not only rendering a row anymore. It is accumulating notification behavior.

Code content:

```tsx
const href =
  type === "followRequest" ? profileHref :
  type === "postLike" ? postHref :
  type === "dmRequest" ? requestHref :
  photoHref

const preview =
  type === "dmRequest" ? message.text :
  type === "photoTag" ? photo.caption :
  null
```

Visual note:

Right panel is internals: hooks, derived values, branches.

---

Slide 6

Title: The Component Becomes A Translator

Content:

Props in.
Product behavior out.

Script:

This is the part I care about. The component now translates a loose prop language into product behavior. It knows what a DM request is. It knows what a photo tag is. It knows how actions map to routes and mutations. That knowledge has no clear boundary.

Code content:

```tsx
if (primaryAction === "accept") acceptRequest()
if (primaryAction === "followBack") followUser(actor.id)
if (secondaryAction === "removeTag") removeTag(photo.id)
```

---

Slide 7

Title: The Next Feature Hurts More

Content:

Add moderation events.

No actor.
System icon.
Decision link.
Appeal action.
Sensitive copy.

Script:

Now product asks for moderation events. It sounds like just another notification type, but it changes the shape. There may be no actor. The icon is a system icon. The link goes to a decision. The action is appeal. The copy is sensitive. The generic API has to learn another set of exceptions.

Code content:

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

---

Slide 8

Title: When Variation Is Structural

Content:

Make the structure visible.

Script:

This is the first thesis slide. It comes after the two-panel prop-soup setup. These notification types are not just different text values. They have different structure, different actions, different navigation, sometimes different permissions.

When variation is structural, make the structure visible.

That line should be spoken slowly. It is the bridge from problem to pattern.

Code content:

No heavy code.

Animate four words from the previous slides:

structure
actions
navigation
permissions

---

Slide 9

Title: Make Supported Shapes Explicit

Content:

FollowRequestNotification
PostLikeNotification
DMRequestNotification
PhotoTagNotification

Script:

Instead of one component with a growing prop language, we expose the notification shapes we actually support. Each one is an abstraction. Each one has a name. The export list becomes part of the API contract.

Code content:

```tsx
export {
  FollowRequestNotification,
  PostLikeNotification,
  DMRequestNotification,
  PhotoTagNotification,
}
```

---

Slide 10

Title: Same Vocabulary, Different Shapes

Content:

Actor
Body
Preview
Thumbnail
Actions
Date

Script:

The point is not to duplicate everything. The point is to compose from the same primitive vocabulary. Shared parts stay shared. Variant-specific parts only appear where they belong.

Code content:

```tsx
export const DMRequestNotification = (
  <Notification.Container>
    <Notification.Actor />
    <Notification.Body />
    <Notification.MessagePreview />
    <Notification.Actions />
    <Notification.Date />
  </Notification.Container>
)
```

Visual note:

Four columns. Shared primitives highlighted consistently.

---

Slide 11

Title: The API Starts Reading Like UI

Content:

Before:
configure behavior

After:
compose structure

Script:

This is why I like the pattern. The API starts reading like the UI it produces. You do not need to mentally execute a generic component to understand the supported shape. The shape is there.

Code content:

Before left:

```tsx
<NotificationItem
  type="dmRequest"
  showPreview
  primaryAction="accept"
  secondaryAction="ignore"
/>
```

After right:

```tsx
export const DMRequestNotification = (
  <Notification.Container>
    <Notification.MessagePreview />
    <Notification.Accept />
    <Notification.Ignore />
  </Notification.Container>
)
```

---

Slide 12

Title: Private Machinery

Content:

The structure is explicit.
The plumbing stays private.

Script:

Composition does not mean passing every value through every primitive. That would be painful. The variant can own the model. The container can provide context. The primitives read what they need. We make the structure explicit without making the data plumbing noisy.

Code content:

```tsx
<Notification.Provider value={model}>
  <Notification.Container>
    {composition}
  </Notification.Container>
</Notification.Provider>
```

---

Slide 13

Title: Add Moderation

Content:

New behavior gets a name.

Script:

When moderation arrives, we do not add five props to the generic component. We add a supported abstraction with the structure moderation needs.

Code content:

```tsx
export const ModerationNotification = (
  <Notification.Container>
    <Notification.SystemIcon />
    <Notification.Body />
    <Notification.ReportReason />
    <Notification.ViewDecision />
    <Notification.Appeal />
    <Notification.Date />
  </Notification.Container>
)
```

---

Slide 14

Title: Add Post Comments

Content:

Reuse primitives.
Do not merge concepts.

Script:

Post comment can share pieces with post like and DM request: actor, post thumbnail, preview, reply action. But it does not need to pretend to be either one. It gets its own supported shape.

Code content:

```tsx
export const PostCommentNotification = (
  <Notification.Container>
    <Notification.Actor />
    <Notification.CommentPreview />
    <Notification.PostThumbnail />
    <Notification.Reply />
    <Notification.Date />
  </Notification.Container>
)
```

---

Slide 15

Title: TypeScript Joins The API

Content:

Autocomplete shows the vocabulary.
Types reject impossible states.

Script:

Once the abstractions and primitives are explicit, TypeScript can help the API teach itself. The IDE can suggest primitives. Props can be specific to the supported abstraction. Invalid combinations move from runtime knowledge to editor feedback.

Code content:

Generic placeholder:

```tsx
type NotificationPrimitive =
  | Actor
  | Body
  | MessagePreview
  | PostThumbnail
  | Actions
```

Remotion note:

Show IDE autocomplete animation here.

---

Slide 16

Title: The Rule I Use

Content:

When variation is structural,
make the structure visible.

Script:

That is the rule I reach for. If the difference is a small independent fact, a prop is fine. If the difference changes the shape, behavior, navigation, actions, or permissions, I want a named composition.

Code content:

No code. Big rule slide.

Placement correction:

This rule should probably not wait until slide 16.

Use it first as Slide 8, immediately after the component-soup section, then echo it near the end as a takeaway.

First use: thesis.

Final use: reminder.

---

Slide 17

Title: [Cut]

Content:

Flags multiplying.
Branches growing.
Shapes becoming explicit.
IDE helping.

Script:

Remotion is useful here because this is a visual mental model. We can animate props spreading into internal branches, then collapse the same behavior into named compositions. We can show the code and the UI changing together.

Code content:

Remove this as a standalone slide.

Remotion is not content. Remotion is the execution layer for every slide that contains code.

Use it to animate:

- prop soup accumulating
- internal branches appearing on the right panel
- the IDE cursor moving through code
- autocomplete revealing primitive vocabulary
- invalid combinations getting rejected
- old props collapsing into named compositions

The audience should experience animated code and animated IDE moments throughout the talk, without a slide that explains Remotion.

---

Deck title direction:

Make the shape visible through a composable API.

Short title candidate:

Make The Shape Visible

Subtitle candidate:

Through a composable React API

This is stronger than "Composition Is The API" because it tells the audience what the pattern does, not just what category it belongs to.

---

Remove generic feedback language like:

"Best slide title so far"
"Best rule slide"

Those are process notes, not content.

The content point is:

If the UI shape changes, the API should expose that shape.

If the behavior is supported, it should have a name.

If consumers need to guess a prop combination, the API is under-specified.

---

Slide 18

Title: Takeaway

Content:

Expose supported abstractions.
Compose them from primitives.
Hide plumbing behind providers.
Let types protect the shape.

Script:

The goal is not clever component APIs. The goal is a codebase where new behavior gets a clear place to live. Supported things have names. Shared pieces stay shared. The component surface tells the truth.

Code content:

No code.

---

Working deck structure correction.

Merge "The Outside Shape" and "The Inside Shape" into one two-panel slide.

Do not use "When variation is structural, make the structure visible" as slide 6 before the bad approach has been fully shown. It lands better after the audience sees moderation/post-comment pressure and understands why the current approach is not scaling.

Current opening sequence:

1. Title
2. A normal notification component
3. Existing supported behaviors
4. Two-panel prop soup: outside API vs inside implementation
5. Add moderation: first stress test
6. Add post comment: second stress test / overlap problem
7. Make supported shapes explicit

Iterate slide-by-slide from here.

---

Slide 2 copy fragments.

Title option:

A Notification Row

On-slide:

avatar
message
time

Script:

We start with a notification row. A user, a short message, a timestamp. Nothing here needs a pattern yet.

Code:

```tsx
<NotificationItem
  actor={user}
  message="started following you"
  time={createdAt}
/>
```

---

Slide 2 copy fragments.

Title option:

The First Shape

On-slide:

actor
body
date

Script:

At the beginning, the shape is small enough to fit in your head. There is an actor, a body, and a date. The component does not have many decisions to make.

Code:

```tsx
<NotificationItem actor={user} body={body} date={date} />
```

---

Slide 2 copy fragments.

Title option:

One Row, One Job

On-slide:

render the notification

Script:

The first version has one job: render a row. It receives the data, displays it, and gets out of the way.

Code:

```tsx
<NotificationItem notification={notification} />
```

---

Slide 2 copy fragments.

Title option:

The Shape Is Still Obvious

On-slide:

actor -> text -> time

Script:

At this stage, you do not need to inspect the implementation to understand the component. The outside shape and the UI shape are still basically the same thing.

Code:

```tsx
<NotificationItem
  actor={user}
  text={text}
  timestamp={timestamp}
/>
```

---

Preferred slide 2 direction:

Title:

The Shape Is Still Obvious

Reason:

It connects directly to the deck title. It also sets up the later break: the shape stops being obvious once the component starts encoding multiple notification behaviors.

---

Agreed shape of the talk so far:

The deck is not about "composition is nice."

It is about a component API telling the truth about the UI shapes the product actually supports.

The notification example should begin ordinary. A row with an actor, text, and time. Then product growth applies pressure. Follow requests, post likes, DM requests, and photo tags are already enough variation. Moderation and post comments are the stress tests that reveal the generic component is now interpreting a private language of props.

The solution is not arbitrary children composition at the call site.

The solution is a set of exported, supported notification abstractions composed internally from shared primitives.

---

Canonical title direction:

Make The Shape Visible

Through a composable React API.

This title works because it names the purpose of the pattern, not the category of the pattern.

---

The pattern should sound like engineering, not doctrine.

Props are not bad.
Booleans are not bad.
Context is not magic.
Composition does not remove complexity.

The actual claim:

When variation is structural, the API should expose structure.

When variation is an independent fact, a prop is often fine.

---

Remotion should never become the topic.

Remotion is the way the code moves.

Props accumulate.
Branches appear.
The right panel gets heavier.
The cursor asks the IDE for a primitive.
Autocomplete reveals the vocabulary.
Invalid combinations get rejected.
The messy generic call collapses into a named supported composition.

The audience should not think, "cool animation."

They should think, "I can feel the state space getting smaller."

---

Slide 2 sharper option:

Title:

The Shape Is Still Obvious

On-slide:

actor -> text -> time

Script:

At this point, the component does not need much explanation. You can look at the call site and picture the row. The outside shape and the rendered shape still match.

Code:

```tsx
<NotificationItem
  actor={user}
  text="started following you"
  timestamp={timestamp}
/>
```

Visual:

Show a calm, single code panel. If animated, only reveal the three props one by one and mirror them in the row: actor, text, time.

---

Slide 2 alternate title:

A Row You Can Read

Script:

The first version is almost boring in the useful way. There is no product model hidden in the API yet. The component receives the pieces you can see.

---

Slide 2 alternate title:

The API Still Matches The UI

Script:

This is the baseline we are going to lose. The public API still describes the shape the user sees.

---

Concept grill starting point:

The talk should explain a small set of concepts deeply instead of naming every React composition pattern.

The central concepts are probably:

- structural variation
- public API as supported shape
- named abstractions
- primitive vocabulary
- provider boundary
- type-guided composition
- local reasoning
- state-space reduction

The danger is turning this into a taxonomy talk.

The better version is a pressure story: one component grows, the visible shape disappears, then composition makes the supported shapes visible again.

---

Pinned concept:

Structural variation is the core concept.

The talk is about recognizing when a product change changes the shape of the UI, not just a value inside the same shape.

Some changes are prop changes.
Some changes are shape changes.

The mistake is treating shape changes as prop changes until the component becomes a private interpreter.

---

Remotion boundary:

Remotion is not a concept in the talk.

It is only the production tool for the deck.

Do not grill Remotion as content. Do not explain Remotion as a theme. Use it later to animate code, IDE feedback, and state-space collapse.

---

Structural variation definition:

A variation is structural when it changes the parts, layout, actions, navigation, permissions, or ownership boundaries of the component.

This is broader than visible layout.

A moderation notification may look like "just another row," but structurally it changes who can be linked, which icon appears, what action is allowed, where the user navigates, and what data can be shown.

That is why it should not be modeled as five more knobs on the same generic row.

---

Public API boundary:

App code should import named notification abstractions.

Module authors compose those abstractions from primitives.

The main API is not "build any notification from children."

The main API is "these are the notification shapes this module supports."

```tsx
export {
  FollowRequestNotification,
  PostLikeNotification,
  DMRequestNotification,
  PhotoTagNotification,
  ModerationNotification,
  PostCommentNotification,
}
```

The primitive vocabulary still matters, but it lives mostly inside the module boundary:

```tsx
function DMRequestNotification(props: NotificationProps) {
  return (
    <Notification.Container {...props}>
      <Notification.Actor />
      <Notification.Body />
      <Notification.MessagePreview />
      <Notification.Actions>
        <Notification.Accept />
        <Notification.Ignore />
      </Notification.Actions>
      <Notification.Date />
    </Notification.Container>
  )
}
```

This is composition as a supported API surface, not composition as arbitrary consumer freedom.

---

Primitive boundary wording:

Internal kit / public API.

The primitives are the internal kit.

The named notification abstractions are the public API.

That keeps the talk away from "let consumers build anything." The point is that module authors get a composable kit for creating explicit supported shapes, while app code gets a small, readable set of abstractions it can rely on.

---

Context layer wording:

Do not call it machinery if that feels vague.

The precise thing is the React context layer inside the composition.

Each named abstraction can establish the context for its shape: state, actions, derived model, permissions, routing callbacks, translation keys, refs, and metadata.

The primitives do not receive every value manually. They read the composition context and render the part they own.

The shape is explicit.
The state and actions are managed by the context layer within that shape.

---

Audience assumption:

The audience already knows React.

Do not explain `children`, context, props, or hooks from first principles.

Explain the API design pressure: when to use these tools, where the boundary sits, and why the pattern keeps structural variation readable.

---

Context contract:

Use the three-part contract from the Vercel composition skill:

`state`
`actions`
`meta`

State is what the primitives need to render.

Actions are what the primitives can trigger.

Meta is the supporting non-domain surface: refs, ids, labels, accessibility hooks, tracking metadata, feature flags, environment/platform details, or anything that helps the primitives operate without pretending to be core state.

This gives the composition an internal protocol without making every primitive prop-heavy.

---

Meta definition:

`meta` is operational context for primitives.

It is not render state.
It is not an action.
It is not a junk drawer.

In a notification composition:

`state` might contain the actor, body, read state, target, preview, timestamp, and variant-specific data.

`actions` might contain open, mark as read, follow back, accept request, ignore request, view decision, appeal, reply.

`meta` might contain generated ids, refs, locale/formatting helpers, accessibility labels, tracking metadata, platform/breakpoint info, and stable labels the primitives need to behave correctly.

---

TypeScript role:

Use TypeScript to help the IDE understand existing abstractions and the exact props each abstraction wants.

Do not make the talk about advanced type tricks.

Use the quality-types principle: make impossible states unrepresentable.

In this talk, that mostly means unions and records.

Discriminated unions describe the valid variants.

Records map notification types to supported renderers.

Variant-specific props prevent the app from passing `message` to a post-like notification or `appeal` to a DM request.

The goal is IDE help:

autocomplete the supported abstractions,
show the exact props for the selected abstraction,
reject invalid combinations early,
keep the export list and notification type map honest.

Types should encode the supported API, not document invalid combinations after the fact.

---

State-space nuance:

State-space reduction can stay mostly implicit.

But the sharper point is not only "fewer invalid combinations."

It is also fewer valid public combinations.

A generic prop API may technically support many valid combinations, but every valid combination becomes something a consumer, reviewer, and maintainer has to understand.

Named abstractions reduce the public set of choices.

Instead of asking "which combination of props describes this notification?" the consumer asks "which supported notification shape is this?"

That is a smaller question.

---

Local reasoning:

Local reasoning is an explicit concept in the talk.

You should be able to understand a notification shape from the exported abstraction, its props, and its internal composition.

You should not have to mentally execute a generic renderer to discover what the API means.

The bad version asks:

"Given this type and this prop combination, what does the component decide to render?"

The good version asks:

"Which supported notification abstraction is this?"

That is a much smaller cognitive loop.

---

Composition vs configuration:

Configuration is for values.

Composition is for shape.

The careful version:

Configuration is fine for independent facts inside an existing shape.

Composition is better when the product change alters the component's parts, actions, navigation, permissions, or ownership boundary.

The failure mode is not "props."

The failure mode is a prop API becoming a private language for structural variation.

---

Explicit abstraction:

Explicit means the supported behavior has a name, an export, and a local implementation.

For this talk, an abstraction is explicit when:

- it maps to a real product shape
- it is exported intentionally
- it composes known primitives
- it owns or establishes the context contract for that shape
- it can be found, reviewed, and tested as one unit

If a behavior is supported, it should have a place to live.

---

Registry as coverage:

The notification registry matters.

It is not just a router from `type` to component.

It is a coverage surface.

```tsx
const NOTIFICATIONS: Record<NotificationType, NotificationRenderer> = {
  followRequest: FollowRequestNotification,
  postLike: PostLikeNotification,
  dmRequest: DMRequestNotification,
  photoTag: PhotoTagNotification,
}
```

When the backend adds a notification type, or when the frontend introduces a new abstraction, the registry is where the baseline gets backtested.

If a primitive changes and a named abstraction no longer satisfies the expected contract, TypeScript can make that visible.

If a notification type exists but has no supported renderer, the record should fail before users find the missing shape.

This is practical, not theoretical. Registry typechecking catches real bugs because it forces the product taxonomy and the UI taxonomy to stay aligned.

---

Primitive definition:

A primitive is not just any small component.

In this talk, a primitive is a reusable piece of a supported shape with one local responsibility inside the composition.

Often that responsibility is visual:

`Notification.Actor`
`Notification.Body`
`Notification.MessagePreview`
`Notification.PostThumbnail`
`Notification.Date`

Sometimes that responsibility is behavioral:

`Notification.Actions`
`Notification.ActionGroup`
`Notification.FocusScope`
`Notification.TrackingBoundary`

A primitive can be a logic container if it provides inner context, refs, focus management, tracking, scoped state, or other React coordination for its subtree.

The key is that it belongs to the internal kit and participates in the composition contract.

It is not a random helper component.
It is not a full product abstraction by itself.

---

Composition contract clarification:

This term may be too abstract unless explained carefully.

What it means:

When a named abstraction composes primitives, those primitives assume a certain context exists.

`Notification.Actor` assumes there is an actor in `state`.

`Notification.Accept` assumes there is an accept action in `actions`.

`Notification.Date` assumes there is a timestamp in `state` and maybe formatting/locale support in `meta`.

The composition contract is that agreement:

what the abstraction provides,
what the context exposes,
what each primitive is allowed to read or trigger.

If `DMRequestNotification` renders `Notification.Accept`, then its context must provide the accept action.

If `PostLikeNotification` does not provide message request actions, it should not render `Notification.Accept`.

This is why the internal kit can stay composable without becoming arbitrary.

Maybe the simpler term is `context contract`.

The important idea is not the name. The important idea is that primitives are not magic. They rely on a typed context supplied by the abstraction that uses them.

---

Preferred term:

Context structure.

Use `context structure` instead of `composition contract` in the talk.

It sounds less formal and points to the thing React developers will actually see:

```tsx
type NotificationContext = {
  state: NotificationState
  actions: NotificationActions
  meta: NotificationMeta
}
```

The context structure is the internal shape each named abstraction provides to its primitives.

If a primitive reads `state.actor`, the abstraction that renders it needs to provide actor state.

If a primitive triggers `actions.accept`, that action needs to exist in the context structure for that composition.

The stricter word `contract` can stay in the speaker's head for type-safety explanation, but `context structure` is the phrase for slides.

---

Context structure should not become a long explanation.

The audience already knows React. It is obvious enough that a parent abstraction/container provides data for its inner primitives through context.

Mention the structure once:

`state`
`actions`
`meta`

Then move on.

The important content is not "how context works."

The important content is that each named abstraction owns the context structure required by the primitives it renders.

---

Compound components can be named upfront.

The talk can say early:

This is about React compound components.

Then immediately narrow the claim:

Not as an open-ended children API for consumers, but as a way to build explicit supported abstractions from an internal kit of primitives.

The category is compound components.

The thesis is structural variation should become visible API shape.

---

Open composition vs closed supported API:

React composition is open by default.

A component API can choose to be closed around supported shapes.

That is the boundary here.

Internally, the module uses composition freely to build and evolve notification shapes.

Externally, app code gets the shapes the module supports.

This keeps React's flexibility where it helps maintainers, while keeping the public API small enough for consumers to reason about.

Possible line:

Open by default.
Closed by design.

---

Very important line:

Flexibility inside, local reasoning outside.

That may be the cleanest description of the boundary.

Inside the module, maintainers keep the power to compose primitives, add behavior, introduce new abstractions, and evolve the context structure.

Outside the module, consumers get named supported shapes that are easy to read and hard to misuse.

---

Where product rules live:

Product rules should live in named abstractions and their context structure, not in generic renderer conditionals.

Moderation rules belong in `ModerationNotification`.

DM request rules belong in `DMRequestNotification`.

Post comment rules belong in `PostCommentNotification`.

The generic renderer should not slowly become the place that knows every product rule: who can be linked, which route opens, which action is legal, which thumbnail appears, which sensitive data is hidden.

If a product rule changes the shape, give it a named place to live.

---

Anti-pattern wording:

Use `prop soup` as the visible problem.

Prop soup means many props on the outside and many inner `if`s / conditionals on the inside.

The sharper explanation:

The props become a private language, and the component becomes its interpreter.

This is not only about quantity.

Five props can already be soup if their combinations encode structural variation.

Twenty props can be fine if they are independent values inside a stable shape.

The smell is when the call site describes a product behavior indirectly, and the component has to decode it.

---

Conditionals nuance:

The issue is not `if`.

The issue is where the branch lives.

Conditionals are fine at boundaries.

The problem is conditionals that hide supported product shapes inside a generic component.

The pattern does not remove branching.

It moves branching into named abstractions where each branch has a place, a name, and a local context structure.

---

Concept set feels nearly complete.

The pinned concepts are:

- structural variation
- compound components as the pattern category
- internal kit / public API
- open React composition vs closed supported API
- flexibility inside, local reasoning outside
- named abstractions as supported shapes
- primitives as internal kit
- context structure: state, actions, meta
- registry as coverage surface
- TypeScript via unions and records
- prop soup as the anti-pattern
- conditionals at boundaries, not hidden inside a generic renderer

That is enough.

More concepts would probably dilute the talk.

The remaining work is not discovering new ideas. It is deciding sequence, slide weight, and which code examples carry each idea.

---

Theory role:

FP and type theory should motivate the assumptions, not become a separate section.

The useful assumption is:

UI APIs have state spaces.

Every public prop combination is a reachable state the team has to reason about.

Many boolean props imply a wide product type: lots of possible combinations.

Named variants behave more like a sum type: one supported shape selected from a known set.

Records then force the known set to be covered.

This is why the talk can claim:

Types should encode supported shapes.

The registry should backtest the supported set.

Composition should make structural variation visible.

Keep the theory as a short motivation for why fewer public valid combinations matter.
