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
        "one product shape",
        "actor + body + media",
        "simple because singular",
      ],
      previewSteps: [
        {
          afterLine: 1,
          message: "One notification shape can stay simple.",
          variantId: "post-like",
        },
        {
          afterLine: 5,
          compact: true,
          message: "The trouble starts when this shape becomes the shared container.",
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
        "follow request arrives",
        "one branch feels reasonable",
        "behavior starts entering the surface",
      ],
      previewSteps: [
        {
          afterLine: 2,
          message: "A follow request adds one reasonable action.",
          variantId: "follow-request",
        },
        {
          afterLine: 9,
          compact: true,
          message: "The branch is still small enough to feel harmless.",
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
        "DM request arrives",
        "accept + ignore",
        "the renderer starts parsing shape",
      ],
      previewSteps: [
        {
          afterLine: 4,
          message: "DM request adds decisions, hooks, and routes.",
          variantId: "dm-request",
        },
        {
          afterLine: 15,
          compact: true,
          message: "The shared item now knows which actions are legal.",
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
        "short follow usage",
        "short DM usage",
        "complexity hides as a set",
      ],
      previewSteps: [
        {
          afterLine: 1,
          message: "A single call site still looks reviewable.",
          variantId: "follow-request",
        },
        {
          afterLine: 7,
          compact: true,
          message: "But the API fails as combinations grow.",
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
      codeMaxWidth: 851,
      leftItems: [
        "decision href",
        "actor removal",
        "system icon",
        "appeal handlers",
      ],
      previewMode: "final",
      rightText: "The generic item is learning another product concept.",
      previewFocus: [
        "moderation adds product rules",
        "actor identity becomes conditional",
        "decision and appeal move inside",
      ],
      previewSteps: [
        {
          afterLine: 4,
          message: "Moderation looks like another type, but changes the rules.",
          variantId: "moderation",
        },
        {
          afterLine: 11,
          compact: true,
          message: "Navigation now depends on the hidden product shape.",
          variantId: "moderation",
        },
        {
          afterLine: 17,
          compact: true,
          message: "Identity is no longer always an actor.",
          variantId: "moderation",
        },
        {
          afterLine: 22,
          compact: true,
          message: "The renderer now owns product behavior.",
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
        "showActor encodes identity",
        "system icon changes the shape",
        "decision and appeal encode behavior",
      ],
      previewSteps: [
        {
          afterLine: 2,
          compact: false,
          message: "We are no longer configuring details of the same row.",
          variantId: "moderation",
        },
        {
          afterLine: 5,
          compact: true,
          message: "Identity, navigation, copy, actions, and permissions changed.",
          variantId: "moderation",
        },
        {
          afterLine: 8,
          compact: true,
          message: "Another prop is the wrong level of expression.",
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
        "one prop chooses icon",
        "one prop chooses href",
        "one prop chooses action",
        "one prop patches a mode",
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
      claim: "Configuration is for values. Composition is for shape.",
      bullets: [
        "Stable shape, new label: prop",
        "Stable shape, loading state: prop",
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
        "row becomes a primitive",
        "shared frame stays boring",
        "variant owns behavior",
      ],
      previewSteps: [
        {
          afterLine: 1,
          message: "Start by extracting the shared row as a stable primitive.",
          variantId: "moderation",
        },
        {
          afterLine: 6,
          compact: true,
          message: "The row renders; the variant decides the product shape.",
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
        "identity becomes explicit",
        "system icon is chosen in JSX",
        "no optional actor fiction",
      ],
      previewSteps: [
        {
          afterLine: 6,
          message: "Moderation renders system identity directly.",
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
      previewFocus: ["named body slot", "named timestamp slot", "copy belongs to shape"],
      previewSteps: [
        {
          afterLine: 8,
          message: "Copy stops being a special case inside a generic renderer.",
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
      previewFocus: ["media as a visible part", "only shapes that need media render it"],
      previewSteps: [
        {
          afterLine: 8,
          message: "Media appears only in the shapes that truly need it.",
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
      previewFocus: ["actions as behavior", "two DM decisions", "behavior belongs to the shape"],
      previewSteps: [
        {
          afterLine: 8,
          message: "Accept and ignore become visible behavior primitives.",
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
          message: "The supported behavior has a name.",
          variantId: "moderation",
        },
        {
          afterLine: 5,
          compact: true,
          message: "The row is still an abstraction, but it is readable.",
          variantId: "moderation",
        },
        {
          afterLine: 8,
          compact: true,
          message: "Reason and visibility are explicit parts of this shape.",
          variantId: "moderation",
        },
        {
          afterLine: 10,
          compact: true,
          message: "Actions are visible in the composed shape.",
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
      codeMaxWidth: 851,
      bullets: [
        "FollowRequestNotification",
        "PostLikeNotification",
        "DMRequestNotification",
        "PhotoTagNotification",
        "ModerationNotification",
        "PostCommentNotification",
      ],
      previewFocus: [
        "named variants",
        "supported shapes",
        "local reasoning",
      ],
      previewSteps: [
        {
          afterLine: 2,
          message: "The module exports supported shapes by name.",
          previewAll: true,
          variantId: "follow-request",
        },
        {
          afterLine: 3,
          compact: true,
          message: "Post like stops being a prop combination.",
          previewAll: true,
          variantId: "post-like",
        },
        {
          afterLine: 4,
          compact: true,
          message: "DM request becomes the shape you render.",
          previewAll: true,
          variantId: "dm-request",
        },
        {
          afterLine: 5,
          compact: true,
          message: "Photo tag owns media and remove-tag behavior.",
          previewAll: true,
          variantId: "photo-tag",
        },
        {
          afterLine: 6,
          compact: true,
          message: "Moderation gets a real place in the API.",
          previewAll: true,
          variantId: "moderation",
        },
        {
          afterLine: 20,
          compact: true,
          message: "The public question becomes: which supported shape is this?",
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
        "visual primitives",
        "behavior primitives",
        "provider contracts",
        "named variants",
        "supported shapes",
        "local reasoning",
      ],
    },
  },
  {
    id: "inner-context",
    title: "The inner context",
    family: "code-only",
    durationInFrames: codeOnlyDuration,
    content: {
      subtitle: "primitives consume an interface",
      codeFontSize: 16,
      codeHeight: 790,
      codeWidth: 1500,
      bullets: [
        "`state`: what primitives render",
        "`actions`: what primitives trigger",
        "`meta`: refs, ids, labels, tracking",
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
      subtitle: "New complexity gets a new place.",
      bullets: [
        "reuses actor / body / media",
        "owns comment preview",
        "owns reply behavior",
      ],
      previewFocus: [
        "reused actor primitive",
        "comment preview",
        "post thumbnail",
        "reply action",
      ],
      previewSteps: [
        {
          afterLine: 1,
          message: "Composition does not remove complexity; it gives it a home.",
          variantId: "post-comment",
        },
        {
          afterLine: 8,
          compact: true,
          message: "The comment preview is not hidden behind a mode.",
          variantId: "post-comment",
        },
        {
          afterLine: 9,
          compact: true,
          message: "Media is reused without pretending every shape has it.",
          variantId: "post-comment",
        },
        {
          afterLine: 10,
          compact: true,
          message: "Reply behavior is owned by the post-comment shape.",
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
      subtitle: "Fewer public modes to keep in your head.",
      claim: "Every public prop combination is a state someone can write, review, test, and maintain.",
      bullets: [
        "flag bags widen the state space",
        "explicit variants narrow the public set",
        "TypeScript helps with named shapes",
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
        "No archeology required.",
      ],
    },
  },
] as const satisfies readonly TalkSlide[];
