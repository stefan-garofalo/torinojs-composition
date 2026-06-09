import { notificationCodeSnippets } from "./notification-code-snippets";
import type { TalkSlide } from "../slides/types";

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
      layout: "yellow",
      subtitle: "Through a composable React API",
    },
  },
  {
    id: "component-earned-place",
    title: "A useful component under pressure",
    family: "narrative",
    durationInFrames: narrativeDuration,
    content: {
      subtitle: "One row.\nSeveral product shapes.",
      leftItems: [
        "Follow request: actor + follow back",
        "Post like: actor + thumbnail + post link",
        "DM request: preview + accept / ignore",
        "Photo tag: thumbnail + remove tag",
      ],
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
    id: "post-like-clean",
    title: "One clean shape",
    family: "code-dx",
    durationInFrames: codeDxDuration,
    content: {
      previewMode: "final",
      previewFocus: [
        "one lean post-like component",
        "actor plus body plus media",
        "single responsibility",
      ],
      previewSteps: [
        {
          afterLine: 1,
          message: "Start with one notification shape that owns one job.",
          variantId: "post-like",
        },
        {
          afterLine: 5,
          compact: true,
          message: "The component can stay lean while the behavior is singular.",
          reviewed: true,
          showActions: true,
          variantId: "post-like",
        },
      ],
      code: {
        language: "tsx",
        fileName: "post-like-notification.tsx",
        code: notificationCodeSnippets.postLikeClean,
      },
    },
  },
  {
    id: "follow-behavior-branch",
    title: "Add interaction",
    family: "code-dx",
    durationInFrames: codeDxDuration,
    content: {
      previewMode: "final",
      previewFocus: [
        "follow behavior arrives",
        "generic item gets first action hook",
        "type check enters the row",
      ],
      previewSteps: [
        {
          afterLine: 2,
          message: "Follow request adds the first interactive behavior.",
          variantId: "follow-request",
        },
        {
          afterLine: 9,
          compact: true,
          message: "A type check decides whether the row owns follow-back.",
          reviewed: true,
          showActions: true,
          variantId: "follow-request",
        },
      ],
      code: {
        language: "tsx",
        fileName: "notification-item.tsx",
        code: notificationCodeSnippets.followBranch,
      },
    },
  },
  {
    id: "dm-behavior-branch",
    title: "Then two actions",
    family: "code-dx",
    durationInFrames: codeDxDuration,
    content: {
      previewMode: "final",
      previewFocus: [
        "message request arrives",
        "accept and ignore hooks",
        "the shared row gets wider",
      ],
      previewSteps: [
        {
          afterLine: 4,
          message: "DM request adds two handlers to the shared item.",
          variantId: "dm-request",
        },
        {
          afterLine: 15,
          compact: true,
          message: "Accept and ignore now live beside the previous branches.",
          reviewed: true,
          showActions: true,
          variantId: "dm-request",
        },
      ],
      code: {
        language: "tsx",
        fileName: "notification-item.tsx",
        code: notificationCodeSnippets.dmBranch,
      },
    },
  },
  {
    id: "request-usage-before-moderation",
    title: "The outside still looks fine",
    family: "code-dx",
    durationInFrames: codeDxDuration,
    content: {
      previewMode: "final",
      previewFocus: [
        "follow request usage",
        "dm request usage",
        "the call sites still look acceptable",
      ],
      previewSteps: [
        {
          afterLine: 1,
          message: "From the outside, follow still looks like a small variation.",
          variantId: "follow-request",
        },
        {
          afterLine: 7,
          compact: true,
          message: "DM request still fits the same generic surface.",
          reviewed: true,
          showActions: true,
          variantId: "dm-request",
        },
      ],
      code: {
        language: "tsx",
        fileName: "notification-usage.tsx",
        code: notificationCodeSnippets.requestUsageBeforeModeration,
      },
    },
  },
  {
    id: "moderation-internals",
    title: "More branches",
    family: "code-dx",
    durationInFrames: codeDxDuration,
    content: {
      codeBodyMinHeight: 860,
      codeFontSize: 13,
      codeMaxWidth: 740,
      leftItems: [
        "decision href",
        "actor removal",
        "system icon",
        "appeal handlers",
      ],
      previewMode: "final",
      rightText: "Supporting moderation means teaching the generic item another product.",
      previewFocus: [
        "moderation adds a new href branch",
        "actor identity becomes optional",
        "decision and appeal handlers move inside",
      ],
      previewSteps: [
        {
          afterLine: 4,
          message: "Moderation adds decision hooks to the generic item.",
          variantId: "moderation",
        },
        {
          afterLine: 11,
          compact: true,
          message: "The row contract now branches on moderation navigation.",
          variantId: "moderation",
        },
        {
          afterLine: 17,
          compact: true,
          message: "Actor rendering becomes a system-icon branch.",
          variantId: "moderation",
        },
        {
          afterLine: 22,
          compact: true,
          message: "Decision and appeal handlers live in the shared component.",
          reviewed: true,
          showActions: true,
          variantId: "moderation",
        },
      ],
      code: {
        language: "tsx",
        fileName: "notification-item.tsx",
        code: notificationCodeSnippets.moderationInternals,
      },
    },
  },
  {
    id: "fifth-shape",
    title: "Then moderation breaks it",
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
      previewSteps: [
        {
          afterLine: 2,
          compact: false,
          message: "A generic item is now carrying moderation shape.",
          variantId: "moderation",
        },
        {
          afterLine: 5,
          compact: true,
          message: "System icon replaces actor identity.",
          variantId: "moderation",
        },
        {
          afterLine: 8,
          compact: true,
          message: "Decision and appeal behavior leak into props.",
          reviewed: true,
          showActions: true,
          variantId: "moderation",
        },
      ],
      code: {
        language: "tsx",
        fileName: "moderation-before.tsx",
        code: notificationCodeSnippets.moderationBefore,
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
      layout: "right-column",
      subtitle: "Some changes are values.\nSome changes are shapes.",
      claim: "When variation is structural, make the structure visible.",
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
      layout: "right-column",
      subtitle: "Composition is for shape",
      claim: "Configuration handles stable values. Composition exposes new parts, actions, and navigation.",
      bullets: [
        "Stable row, new label: prop",
        "Stable row, loading state: prop",
        "New parts / actions / navigation: composition",
      ],
    },
  },
  {
    id: "extract-row-primitive",
    title: "Extract the row",
    family: "code-dx",
    durationInFrames: codeDxDuration,
    content: {
      previewMode: "final",
      previewFocus: [
        "container becomes a primitive",
        "row shape moves inside",
        "variant owns composition",
      ],
      previewSteps: [
        {
          afterLine: 1,
          message: "First pull the shared row surface into a primitive.",
          variantId: "moderation",
        },
        {
          afterLine: 6,
          compact: true,
          message: "The variant composes the row instead of configuring it.",
          reviewed: true,
          showActions: true,
          variantId: "moderation",
        },
      ],
      code: {
        language: "tsx",
        fileName: "moderation-notification.tsx",
        code: notificationCodeSnippets.extractContainer,
      },
    },
  },
  {
    id: "extract-actor-primitive",
    title: "Extract identity",
    family: "code-dx",
    durationInFrames: codeDxDuration,
    content: {
      previewMode: "final",
      previewFocus: [
        "actor becomes a primitive",
        "system icon is local",
        "no showActor flag",
      ],
      previewSteps: [
        {
          afterLine: 6,
          message: "Moderation chooses a system icon directly.",
          reviewed: true,
          showActions: true,
          variantId: "moderation",
        },
      ],
      code: {
        language: "tsx",
        fileName: "moderation-notification.tsx",
        code: notificationCodeSnippets.extractActor,
      },
    },
  },
  {
    id: "extract-body-primitive",
    title: "Extract copy",
    family: "code-dx",
    durationInFrames: codeDxDuration,
    content: {
      previewMode: "final",
      previewFocus: ["body primitive", "timestamp primitive", "copy lives with shape"],
      previewSteps: [
        {
          afterLine: 8,
          message: "The copy and timestamp are named slots, not prop branches.",
          reviewed: true,
          showActions: true,
          variantId: "moderation",
        },
      ],
      code: {
        language: "tsx",
        fileName: "moderation-notification.tsx",
        code: notificationCodeSnippets.extractBody,
      },
    },
  },
  {
    id: "extract-media-primitive",
    title: "Extract media",
    family: "code-dx",
    durationInFrames: codeDxDuration,
    content: {
      previewMode: "final",
      previewFocus: ["media primitive", "only shapes that need it render it"],
      previewSteps: [
        {
          afterLine: 8,
          message: "Media is a primitive used by shapes that actually need media.",
          reviewed: true,
          showActions: true,
          variantId: "photo-tag",
        },
      ],
      code: {
        language: "tsx",
        fileName: "photo-tag-notification.tsx",
        code: notificationCodeSnippets.extractMedia,
      },
    },
  },
  {
    id: "extract-actions-primitive",
    title: "Extract actions",
    family: "code-dx",
    durationInFrames: codeDxDuration,
    content: {
      previewMode: "final",
      previewFocus: ["actions primitive", "two DM actions", "behavior belongs to the variant"],
      previewSteps: [
        {
          afterLine: 8,
          message: "The two DM actions become a local composition choice.",
          reviewed: true,
          showActions: true,
          variantId: "dm-request",
        },
      ],
      code: {
        language: "tsx",
        fileName: "dm-request-notification.tsx",
        code: notificationCodeSnippets.extractActions,
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
        'no `primaryAction="viewDecision"`',
        "no generic moderation branch",
      ],
      previewFocus: ["system icon", "body", "report reason", "actions", "date"],
      previewSteps: [
        {
          afterLine: 1,
          message: "The shape has a name.",
          variantId: "moderation",
        },
        {
          afterLine: 5,
          compact: true,
          message: "The container receives an already-derived view model.",
          variantId: "moderation",
        },
        {
          afterLine: 8,
          compact: true,
          message: "Reason and visibility are local primitives.",
          variantId: "moderation",
        },
        {
          afterLine: 10,
          compact: true,
          message: "Actions are part of the moderation composition.",
          reviewed: true,
          showActions: true,
          variantId: "moderation",
        },
      ],
      code: {
        language: "tsx",
        fileName: "moderation-notification.tsx",
        code: notificationCodeSnippets.moderationNotification,
      },
    },
  },
  {
    id: "make-supported-shapes-explicit",
    title: "Make the variants explicit",
    family: "code-dx",
    durationInFrames: codeDxDuration,
    content: {
      codeBodyMinHeight: 820,
      codeFontSize: 12,
      codeMaxWidth: 740,
      bullets: [
        "FollowRequestNotification",
        "PostLikeNotification",
        "DMRequestNotification",
        "PhotoTagNotification",
        "ModerationNotification",
        "PostCommentNotification",
      ],
      previewFocus: [
        "follow back action",
        "post thumbnail",
        "message preview and actions",
        "photo thumbnail and remove tag",
        "system icon and appeal",
        "comment preview and reply",
      ],
      previewSteps: [
        {
          afterLine: 2,
          message: "After one good abstraction, the exports stay named.",
          previewAll: true,
          variantId: "follow-request",
        },
        {
          afterLine: 3,
          compact: true,
          message: "Post like keeps thumbnail behavior local.",
          previewAll: true,
          variantId: "post-like",
        },
        {
          afterLine: 4,
          compact: true,
          message: "DM request owns accept and ignore actions.",
          previewAll: true,
          variantId: "dm-request",
        },
        {
          afterLine: 5,
          compact: true,
          message: "Photo tag owns review media and remove tag.",
          previewAll: true,
          variantId: "photo-tag",
        },
        {
          afterLine: 6,
          compact: true,
          message: "Moderation owns system review shape.",
          previewAll: true,
          variantId: "moderation",
        },
        {
          afterLine: 20,
          compact: true,
          message: "The registry backtests the supported shape set.",
          previewAll: true,
          reviewed: true,
          showActions: true,
          variantId: "post-comment",
        },
      ],
      code: {
        language: "tsx",
        fileName: "notifications.ts",
        code: notificationCodeSnippets.supportedShapes,
      },
    },
  },
  {
    id: "internal-kit-public-api",
    title: "Internal kit / public API",
    family: "narrative",
    durationInFrames: narrativeDuration,
    content: {
      layout: "yellow",
      subtitle: "Flexibility inside.\nLocal reasoning outside.",
      bullets: [
        "primitives",
        "context structure",
        "variant logic",
        "named variants",
        "supported shapes",
        "stable imports",
      ],
    },
  },
  {
    id: "inner-context",
    title: "The inner context",
    family: "code-only",
    durationInFrames: codeOnlyDuration,
    content: {
      subtitle: "the primitives read one derived view",
      codeFontSize: 20,
      codeHeight: 790,
      codeWidth: 1500,
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
}

function NotificationProvider({ notification, children }) {
  const state = deriveNotificationState(notification)
  const actions = useNotificationActions(notification)
  const meta = useNotificationMeta(notification)

  return (
    <NotificationContext.Provider value={{ state, actions, meta }}>
      {children}
    </NotificationContext.Provider>
  )
}

function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) throw new Error("Missing NotificationProvider")
  return context
}`,
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
      previewSteps: [
        {
          afterLine: 1,
          message: "New behavior gets a new named place.",
          variantId: "post-comment",
        },
        {
          afterLine: 8,
          compact: true,
          message: "Comment preview is explicit in the composition.",
          variantId: "post-comment",
        },
        {
          afterLine: 9,
          compact: true,
          message: "Post/thread media stays local to this shape.",
          variantId: "post-comment",
        },
        {
          afterLine: 10,
          compact: true,
          message: "Reply is a fake action owned by the variant.",
          reviewed: true,
          showActions: true,
          variantId: "post-comment",
        },
      ],
      code: {
        language: "tsx",
        fileName: "post-comment-notification.tsx",
        code: notificationCodeSnippets.postCommentNotification,
      },
    },
  },
  {
    id: "every-public-combination-counts",
    title: "Shrink the public state space",
    family: "narrative",
    durationInFrames: narrativeDuration,
    content: {
      layout: "right-column",
      subtitle: "Fewer shapes to reason about.",
      claim: "Named variants keep the public surface small while the internal kit stays flexible.",
      bullets: [
        "flag bags widen the space",
        "explicit variants narrow the public set",
        "fewer public modes to understand",
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
