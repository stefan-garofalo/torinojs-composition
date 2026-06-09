# Make The Shape Visible - Speaker Script

## 1. Make The Shape Visible

I want to talk about React composition, but not as a cute `children` trick.

I want to talk about what happens when a useful component has to support more product shapes than its public API can honestly describe.

The version of this that hurts is rarely dramatic at first.

Nobody wakes up and says: today I will build an impossible component.

Usually the component is useful. It gets reused. Product asks for one more case. Then another. Each change is small. Each change is reasonable. And then, a few months later, the API has become a little language that nobody remembers designing.

So the frame for this talk is simple:

When variation is structural, make the structure visible.

## 2. A Useful Component Under Pressure

Start with a notification row.

Nothing exotic. Avatar, text, maybe a timestamp. The kind of thing every app has.

Then the row gets used for follow requests. That needs an actor and a follow-back action.

Then post likes. That needs an actor, a post thumbnail, and a link to the post.

Then DM requests. That needs a message preview and two decisions: accept or ignore.

Then photo tags. That needs media, and maybe a remove-tag behavior.

None of these features are unreasonable.

The important part is that they all fit inside the phrase "notification row", but they are not the same shape.

At the call site, this still looks fine:

`type="dmRequest"`, actor, message, preview, primary action, secondary action.

But the component has started to expose a mode language.

It is still quiet. Still manageable. But the shape problem is already there.

## 3. One Clean Shape

If we look at one case by itself, it is clean.

A post-like notification has one job.

Render the actor. Render the body. Render the post media.

There is no deep architecture problem here. A single component that owns one product shape can stay boring, and boring is good.

The trouble starts when this one clean shape becomes the shared place where every future shape has to live.

That is the pressure point.

The component is not wrong yet. It is just becoming attractive as a place to put the next thing.

## 4. Add Interaction

Now follow requests arrive.

Still reasonable.

We add a follow-back hook. We render a button only when the type is `followRequest`.

This is the first branch that says: the row is no longer just rendering notification data. It knows about one product behavior.

That may be completely fine. A branch is not a crime.

The question is: is this branch representing a small value difference, or is it the first sign that different shapes are being pushed through one surface?

At this point, the answer is still ambiguous.

And that is why this pattern sneaks in.

## 5. Then Two Actions

Then DM request shows up.

Now the row needs accept and ignore.

It needs different hooks, different buttons, and maybe a different destination.

Again, each line has a reason to exist.

But the shared row is getting wider. It now knows about follow-back, accept, ignore, message request navigation, media rendering, and the conditions for each.

This is the moment where the component starts becoming a parser.

The public API gives it a description, and inside the component we decode which product shape that description was trying to mean.

## 6. The Outside Still Looks Fine

The annoying part is that the outside still looks acceptable.

Follow request usage looks small.

DM request usage looks small.

If you review only one call site, you probably approve it.

But APIs do not fail one call site at a time. They fail as a set.

The set of possible prop combinations is growing, and the valid combinations are mostly living in our heads.

Which actions are legal for which type?

Which fields are required?

Which fields are ignored?

Which prop wins when two modes disagree?

Usually the answer is: somewhere in the component body.

## 7. More Branches

Now product asks for moderation.

This is where the abstraction starts to tell the truth badly.

Supporting moderation means teaching the generic item another product.

There is a decision href. Actor identity might disappear. The avatar becomes a system icon. Appeal and view-decision handlers move inside the shared component.

The row now knows what a report is, what a DM request is, what a follow request is, what route each one opens, and which actions are allowed.

The issue is not that the code has conditionals.

The issue is that supported product shapes are hidden inside one generic renderer.

Many props outside. Many branches inside.

That is prop soup.

## 8. Then Moderation Breaks It

At the call site, moderation looks like another notification type.

But look at what we have to say:

No actor. Hide actor. Show system icon. Show inline reason. Primary action is view decision. Secondary action is appeal.

This is not just a different label inside the same row.

It changes identity, navigation, copy sensitivity, actions, and permissions.

That is a shape change.

And when a product change is a shape change, another prop is usually the wrong level of expression.

The API is pretending we are configuring values.

But really we are describing structure.

## 9. Props Outside, Branches Inside

This is the pattern in miniature.

`showSystemIcon` becomes an icon branch.

`type` becomes an href branch.

`primaryAction` becomes an action branch.

Soon there is a permission branch too, because moderation copy has different visibility rules.

Again: branches are fine.

But here the branches are not just implementation details. They are the real list of supported product states.

The component API says: pass me props.

The component body says: I know the product taxonomy.

That mismatch is where the maintenance cost comes from.

## 10. Structural Variation

This is the lens I reach for.

Some changes are values.

Some changes are shapes.

A label changes? Fine, that is a value.

A loading state changes? Fine, that is probably a value.

But if the parts change, if the actions change, if the navigation changes, if the ownership boundary changes, or if permissions change what can be shown, that is structural variation.

And when variation is structural, make the structure visible.

Not clever.

Visible.

## 11. Configuration Is For Values

So the rule becomes:

Configuration is for values.

Composition is for shape.

Props are not bad. Boolean props are not automatically bad.

`disabled` is fine. `checked` is fine. `loading` is often fine.

Those are independent facts inside a stable shape.

The trouble starts when props become a hidden mode system.

`showActor`, `showSystemIcon`, `showInlineReason`, `primaryAction`, `secondaryAction`, `type`.

Together, those are not simple values anymore. They are trying to describe what kind of thing this component is.

That description belongs in visible structure.

## 12. Extract The Row

So the refactor does not start by inventing a huge framework.

Start by extracting the row.

The shared container becomes a primitive.

Now a variant can compose the row instead of configuring it.

This matters because the row is stable. The row is the frame.

But the contents of that row are not always stable.

So we keep the boring shared shell, and we stop asking that shell to understand every product behavior.

The variant owns the composition.

The primitive owns the shared rendering contract.

## 13. Extract Identity

Next, identity becomes explicit.

In an actor-based notification, render `Notification.Actor`.

In moderation, render `Notification.SystemIcon`.

No `showActor={false}`.

No actor prop that is technically optional but only for one mode.

No generic component deciding whether this is a person, a system event, or something else.

The moderation shape chooses a system icon directly.

That is a tiny change, but it changes the reading experience.

You can now see the product rule in the JSX.

## 14. Extract Copy

Then copy becomes a primitive.

Body. Timestamp. Maybe later reason, preview, primary detail.

The point is not to make everything into a tiny component for fun.

The point is to name the slots that are stable across the family.

The component kit gives us vocabulary.

The variant decides which words in that vocabulary are part of this shape.

So instead of a generic item branching internally on which copy to show, the shape says:

system icon, body, timestamp.

Small, readable, local.

## 15. Extract Media

Media is a good example because not every notification has it.

Photo tags need it.

Post likes need it.

Moderation may deliberately not show it, even if the underlying target had media.

So media should not be a flag that every notification carries around.

It should be a primitive used by shapes that actually need media.

This is where composition starts to feel practical.

Shared parts, but no requirement that every shape pretend to have every part.

## 16. Extract Actions

Actions are even more important.

DM request has accept and ignore.

Follow request has follow back.

Moderation has view decision and appeal.

Those are not just buttons.

They are product behaviors with different hooks, routes, permissions, labels, and tracking.

So the shape should own them.

The action primitive can still provide shared layout and shared styling.

But the list of actions belongs to the variant.

That keeps behavior near the product shape that explains it.

## 17. The Shape Is In The Code

Open moderation now and the shape is right there.

It derives a view model.

It renders a row.

Then system icon, body, timestamp, actions.

No `showActor={false}`.

No `primaryAction="viewDecision"`.

No generic moderation branch hiding inside a giant row.

The supported behavior has a name.

The supported shape is visible.

This is still abstraction, but it is abstraction you can read from the outside.

## 18. Make The Variants Explicit

Now the public API changes.

Instead of one generic component with a growing mode language, the module exports the notification shapes it supports.

`FollowRequestNotification`.

`PostLikeNotification`.

`DMRequestNotification`.

`PhotoTagNotification`.

`ModerationNotification`.

`PostCommentNotification`.

Each export is a product shape with a name.

The app no longer asks: which prop combination describes this notification?

It asks: which supported notification shape is this?

And the registry matters here.

The registry is not just plumbing. It is a coverage surface.

If the backend has a notification type, the frontend needs a supported renderer for it.

The product taxonomy and the UI taxonomy stay aligned.

## 19. Internal Kit / Public API

This is the boundary I like.

The primitives are the internal kit.

The named variants are the public API.

App code should not need to assemble every notification by hand. That would just move complexity to every call site.

Instead, app code imports supported shapes.

Module authors still get the flexibility of composition when a new shape arrives.

So the split is:

Flexibility inside.

Local reasoning outside.

That is the balance.

Compound components are useful here because they let the module keep a small vocabulary of parts without making the whole app speak in raw primitives all the time.

## 20. The Inner Context

The data did not disappear.

It moved behind a provider boundary.

Each named variant owns the provider contract its primitives need.

I like the `state`, `actions`, `meta` split because it gives the context a shape that is boring and predictable.

`state` is what primitives render.

`actions` are what primitives can trigger.

`meta` is the operational context around them: refs, ids, labels, formatting, tracking, platform details.

The important rule is that primitives consume the interface, not the implementation.

`Notification.Actions` does not need to know whether moderation state came from a hook, a server payload, local state, or a global store.

The provider is the only place that knows how the state is managed.

That is how the implementation stays private while the composition stays explicit.

## 21. New Behavior, New Place

Now product asks for post comment notifications.

In the old API, this would be another overlap problem.

It looks a bit like post like because there is a post thumbnail.

It looks a bit like DM request because there is a text preview.

It may have its own reply action and comment permalink.

With the new shape, it gets a name.

`PostCommentNotification`.

It can share actor, body, media, and actions primitives without pretending to be a post like, a DM request, or a moderation event.

That is the nice part.

Composition does not make complexity disappear.

It decides where the complexity lives.

Here, the complexity lives in named variants, exported primitives, provider contracts, and a registry we can check.

Not in accidental prop combinations.

## 22. Shrink The Public State Space

This is the small theory behind the pattern.

A component API has a public state space.

Every public prop combination is a state someone can write, review, test, and maintain.

A bag of flags widens that space.

It suggests more combinations than the product actually supports.

Explicit variants narrow the public set.

They say: these are the shapes we support.

The goal is not fewer characters.

Sometimes the composed version has more lines.

The goal is fewer public modes to reason about.

The IDE can autocomplete the supported shapes.

TypeScript can check the registry.

A reviewer can read the JSX and see what the component is.

Good TypeScript makes the IDE feel like part of the design system.

## 23. Make The Shape Visible

So this is the rule I want to leave with.

Configuration is for values.

Composition is for shape.

If a behavior is supported, give it a name.

If a shape is supported, make it visible.

If a rule changes the parts, actions, navigation, permissions, or ownership boundary, do not hide it inside one more prop on a generic component.

Props are still useful.

Composition is not a religion.

For small independent behavior, a prop can be exactly right.

But when the public API starts becoming a little undocumented language, that is the signal.

Move the shape into code people can see.

Keep the flexibility inside the module.

Give local reasoning to the outside.

---

My point of view is stronger than "composition is a nice React pattern."

Composition is the only sane way to architect React components once a component has to survive real product pressure.

Props are fine for values, but they are a terrible place to hide architecture.

If the API is mostly flags, the component is asking every caller to participate in its internal state machine.

That is not reuse. That is outsourcing confusion.

---

The failure mode is the big spaghetti component with multiple behaviors hidden behind outside props.

From the call site, you cannot reconstruct what it actually does.

You see `type`, `showSomething`, `primaryAction`, maybe `variant`, maybe three optional objects, and the only honest next move is to `ctrl+f` around the codebase looking for usage examples.

That is the smell: the component API does not teach you the component anymore.

The real documentation is scattered across call sites and conditionals.

---

There is a resigned version of this that every React developer knows.

You open the component. The prop list does not tell you the behavior.

So you search the repo.

Not because you are doing deep research. Because the API has stopped being readable on its own.

You are looking for someone else's call site that happens to use the same combination of props you need.

That is the moment composition is supposed to prevent.

---

Stop managing behavior with props.

Behavior is composition-bound.

Values and configuration are prop-bound.

A prop can say what the label is.

A prop can say whether the button is disabled.

A prop can pass the date, the count, the href, the loading state.

But if the question is "what behavior exists here?", that should be visible in the composition.

The parts you render are the behavior contract.

---

Possible boundary examples.

`disabled` is a prop.

`loading` is a prop.

`children` is composition.

`label` is a prop.

`timestamp` is a prop.

`FollowBack` versus `Appeal` is composition.

The difference is not syntax. The difference is whether the choice changes the kind of thing being rendered.

---

This should not feel like a refactor recipe.

The refactor is the example.

The real subject is React API design.

A component API is not just a list of inputs. It is the vocabulary you give other developers for thinking about the UI.

If the vocabulary is flags, people think in flag combinations.

If the vocabulary is named shapes and composable parts, people think in supported behaviors.

That is the design choice.

---

Possible opener revision:

This is a talk about React API design.

The example is compound components, but the point is not the syntax.

The point is how you decide what belongs in props and what belongs in composition.

Because the public API of a component becomes the way the rest of the codebase thinks about that component.

---

Prop soup is when props stop being inputs and start being a programming language.

One prop selects the mode.

Another prop patches an exception.

Another prop disables a thing that only exists in one mode.

Another prop changes behavior because the mode was not specific enough.

At that point, the component API is not simpler than composition.

It is just composition encoded badly.

---

Do not soften the thesis too much.

The point is not "composition can be nice sometimes."

The point is that behavior belongs in composition.

If behavior is managed through props, you have probably built an implicit component inside the component.

Make that implicit component real.

Give it a name.

Render its parts.

---

Composition is not only "use compound components."

And it is not only "make named variants."

It is the combination.

Split each behavior into smaller primitives, whether that behavior is visual UI or actual UX behavior.

Each primitive owns a small reusable scope.

Then those primitives co-operate with their siblings to form the final abstraction.

The final abstraction should explicitly report which UX it supports.

That is the reason composition is readable: the supported behavior is not inferred from props, it is reported by the parts that appear in the tree.
