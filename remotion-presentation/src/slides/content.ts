import type { TalkSlide } from "./types";

const narrativeDuration = 420;
const codeOnlyDuration = 480;
const codeDxDuration = 540;

export const talkSlides = [
  {
    id: "make-the-shape-visible",
    title: "Make The Shape Visible",
    family: "narrative",
    durationInFrames: narrativeDuration,
    content: {
      subtitle: "Through a composable React API",
    },
  },
  {
    id: "component-earned-place",
    title: "A component that earned its place",
    family: "narrative",
    durationInFrames: narrativeDuration,
    content: {
      leftItems: [
        "Follow requests",
        "Post likes",
        "DM requests",
        "Photo tags",
      ],
      rightText: "Useful, but already carrying product rules.",
      code: {
        language: "tsx",
        fileName: "notification-item.tsx",
        code: `<NotificationItem
  type="dmRequest"
  actor={user}
  message={request}
  showPreview
  primaryAction="accept"
  secondaryAction="ignore"
/>`,
      },
    },
  },
  {
    id: "same-surface-different-shapes",
    title: "Same surface, different shapes",
    family: "narrative",
    durationInFrames: narrativeDuration,
    content: {
      bullets: [
        "Follow request: actor + follow back",
        "Post like: actor + thumbnail + post link",
        "DM request: preview + accept / ignore",
        "Photo tag: thumbnail + remove tag",
      ],
    },
  },
  {
    id: "fifth-shape",
    title: "The fifth shape",
    family: "code-dx",
    durationInFrames: codeDxDuration,
    content: {
      leftItems: [
        "no actor link",
        "system icon",
        "sensitive copy",
        "decision / appeal",
      ],
      rightText: "Looks like another notification.\nBehaves like a new shape.",
      previewFocus: [
        "showActor changes the row contract",
        "system icon replaces actor identity",
        "decision and appeal actions alter behavior",
      ],
      code: {
        language: "tsx",
        fileName: "moderation-before.tsx",
        code: `<NotificationItem
  type="moderation"
  showActor={false}
  showSystemIcon
  showInlineReason
  primaryAction="viewDecision"
  secondaryAction="appeal"
/>`,
      },
    },
  },
  {
    id: "props-outside-branches-inside",
    title: "Props outside, branches inside",
    family: "code-only",
    durationInFrames: codeOnlyDuration,
    content: {
      bullets: [
        "icon branch",
        "href branch",
        "action branch",
        "permission branch",
      ],
      code: {
        language: "tsx",
        fileName: "notification-branches.tsx",
        code: `const icon =
  showSystemIcon ? <SystemIcon /> : <Avatar user={actor} />

const href =
  type === "moderation" ? decisionHref :
  type === "dmRequest" ? requestHref :
  profileHref

const primary =
  primaryAction === "appeal" ? appeal :
  primaryAction === "accept" ? acceptRequest :
  undefined`,
      },
    },
  },
  {
    id: "structural-variation",
    title: "Structural variation",
    family: "narrative",
    durationInFrames: narrativeDuration,
    content: {
      subtitle: "Some changes are values.\nSome changes are shapes.",
      emphasis: [
        "When variation is structural,",
        "make the structure visible.",
      ],
    },
  },
  {
    id: "configuration-is-for-values",
    title: "Configuration is for values",
    family: "narrative",
    durationInFrames: narrativeDuration,
    content: {
      subtitle: "Composition is for shape",
      bullets: [
        "Same surface, new label: prop",
        "Same surface, loading state: prop",
        "New parts / actions / navigation: composition",
      ],
    },
  },
  {
    id: "make-supported-shapes-explicit",
    title: "Make supported shapes explicit",
    family: "code-only",
    durationInFrames: codeOnlyDuration,
    content: {
      bullets: [
        "FollowRequestNotification",
        "PostLikeNotification",
        "DMRequestNotification",
        "PhotoTagNotification",
        "ModerationNotification",
      ],
      code: {
        language: "tsx",
        fileName: "notifications.ts",
        code: `export {
  FollowRequestNotification,
  PostLikeNotification,
  DMRequestNotification,
  PhotoTagNotification,
  ModerationNotification,
}`,
      },
    },
  },
  {
    id: "shape-is-in-the-code",
    title: "The shape is in the code",
    family: "code-dx",
    durationInFrames: codeDxDuration,
    content: {
      bullets: [
        "no `showActor={false}`",
        "no `primaryAction=\"viewDecision\"`",
        "no generic moderation branch",
      ],
      previewFocus: [
        "system icon",
        "body",
        "report reason",
        "actions",
        "date",
      ],
      code: {
        language: "tsx",
        fileName: "moderation-notification.tsx",
        code: `export function ModerationNotification(props) {
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
}`,
      },
    },
  },
  {
    id: "internal-kit-public-api",
    title: "Internal kit / public API",
    family: "narrative",
    durationInFrames: narrativeDuration,
    content: {
      leftItems: ["primitives", "context structure", "variant logic"],
      rightText: "named abstractions\nsupported shapes\nstable imports",
      emphasis: ["Flexibility inside.", "Local reasoning outside."],
    },
  },
  {
    id: "inner-context",
    title: "The inner context",
    family: "code-only",
    durationInFrames: codeOnlyDuration,
    content: {
      subtitle: "state / actions / meta",
      bullets: [
        "`state`: what primitives render",
        "`actions`: what primitives trigger",
        "`meta`: refs, ids, labels, formatting",
      ],
      code: {
        language: "tsx",
        fileName: "notification-context.ts",
        code: `type NotificationContext = {
  state: NotificationState
  actions: NotificationActions
  meta: NotificationMeta
}`,
      },
    },
  },
  {
    id: "registry-backtests-api",
    title: "The registry backtests the API",
    family: "code-only",
    durationInFrames: codeOnlyDuration,
    content: {
      subtitle: "product type -> supported shape",
      bullets: ["product taxonomy", "UI taxonomy", "type coverage"],
      code: {
        language: "tsx",
        fileName: "notification-registry.ts",
        code: `const NOTIFICATIONS: Record<
  NotificationType,
  NotificationRenderer
> = {
  followRequest: FollowRequestNotification,
  postLike: PostLikeNotification,
  dmRequest: DMRequestNotification,
  photoTag: PhotoTagNotification,
  moderation: ModerationNotification,
}`,
      },
    },
  },
  {
    id: "ide-knows-shapes",
    title: "The IDE knows the shapes",
    family: "code-only",
    durationInFrames: codeOnlyDuration,
    content: {
      bullets: ["unions", "records", "exact props"],
      code: {
        language: "tsx",
        fileName: "notification-type.ts",
        code: `type NotificationType =
  | "followRequest"
  | "postLike"
  | "dmRequest"
  | "photoTag"
  | "moderation"`,
      },
    },
  },
  {
    id: "new-behavior-new-place",
    title: "New behavior, new place",
    family: "code-dx",
    durationInFrames: codeDxDuration,
    content: {
      subtitle: "Post comments do not become more props.",
      bullets: [
        "shares post thumbnail",
        "shares text preview",
        "owns reply behavior",
      ],
      previewFocus: [
        "shared actor primitive",
        "comment preview",
        "post thumbnail",
        "reply action",
      ],
      code: {
        language: "tsx",
        fileName: "post-comment-notification.tsx",
        code: `export function PostCommentNotification(props) {
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
}`,
      },
    },
  },
  {
    id: "every-public-combination-counts",
    title: "Every public combination counts",
    family: "narrative",
    durationInFrames: narrativeDuration,
    content: {
      subtitle: "Fewer shapes to reason about.",
      bullets: [
        "flag bags widen the space",
        "named shapes narrow the public set",
        "fewer valid combinations to understand",
      ],
    },
  },
  {
    id: "make-the-shape-visible-final",
    title: "Make The Shape Visible",
    family: "narrative",
    durationInFrames: narrativeDuration,
    content: {
      subtitle: "Configuration is for values.\nComposition is for shape.",
      bullets: [
        "Supported behavior gets a name.",
        "Supported shape becomes visible.",
        "Flexibility inside. Local reasoning outside.",
      ],
    },
  },
] as const satisfies readonly TalkSlide[];
