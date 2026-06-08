export const notificationPreviewVariantIds = [
  "follow-request",
  "post-like",
  "dm-request",
  "photo-tag",
  "moderation",
  "post-comment",
] as const;

export type NotificationPreviewVariantId =
  (typeof notificationPreviewVariantIds)[number];

export type NotificationPreviewTone = "default" | "accent" | "warning";

export interface NotificationPreviewAction {
  label: string;
  tone: "primary" | "secondary";
}

export interface NotificationPreviewAvatar {
  initials: string;
  label: string;
  background: string;
}

export interface NotificationPreviewMedia {
  label: string;
  tone: NotificationPreviewTone;
}

export interface NotificationPreviewData {
  variantId: NotificationPreviewVariantId;
  eyebrow: string;
  title: string;
  actor: string;
  body: string;
  timestamp: string;
  avatar: NotificationPreviewAvatar;
  systemIcon?: string;
  badge?: string;
  meta?: string;
  quote?: string;
  actions?: readonly NotificationPreviewAction[];
  media?: NotificationPreviewMedia;
}

export const notificationPreviewByVariant = {
  "follow-request": {
    variantId: "follow-request",
    eyebrow: "Follow request",
    title: "Marta Velasquez wants to follow you",
    actor: "Marta Velasquez",
    body: "Designer at North Pier, followed by Elise and 4 others.",
    timestamp: "2m ago",
    avatar: {
      initials: "MV",
      label: "Marta Velasquez",
      background: "linear-gradient(135deg, #3b3d3f, #7b6f45)",
    },
    badge: "Private",
    meta: "6 mutual signals",
    actions: [
      { label: "Follow back", tone: "primary" },
      { label: "Ignore", tone: "secondary" },
    ],
  },
  "post-like": {
    variantId: "post-like",
    eyebrow: "Post like",
    title: "Tomas Iversen liked your post",
    actor: "Tomas Iversen",
    body: "Your note on composable interface previews is getting traction.",
    timestamp: "8m ago",
    avatar: {
      initials: "TI",
      label: "Tomas Iversen",
      background: "linear-gradient(135deg, #253238, #52736b)",
    },
    badge: "New",
    media: {
      label: "Post thumbnail",
      tone: "accent",
    },
    actions: [{ label: "View post", tone: "secondary" }],
  },
  "dm-request": {
    variantId: "dm-request",
    eyebrow: "DM request",
    title: "New message request from Lina Okafor",
    actor: "Lina Okafor",
    body: "I saw your prototype deck and had a question about the preview layer.",
    timestamp: "17m ago",
    avatar: {
      initials: "LO",
      label: "Lina Okafor",
      background: "linear-gradient(135deg, #3b2f3a, #75616f)",
    },
    badge: "Request",
    quote: "Can I send over two screenshots?",
    actions: [
      { label: "Accept", tone: "primary" },
      { label: "Ignore", tone: "secondary" },
    ],
  },
  "photo-tag": {
    variantId: "photo-tag",
    eyebrow: "Photo tag",
    title: "Nico Hart tagged you in a photo",
    actor: "Nico Hart",
    body: "Review the tag before it appears on your profile.",
    timestamp: "24m ago",
    avatar: {
      initials: "NH",
      label: "Nico Hart",
      background: "linear-gradient(135deg, #2f343b, #516a88)",
    },
    badge: "Needs review",
    media: {
      label: "Tagged photo",
      tone: "default",
    },
    actions: [
      { label: "View photo", tone: "primary" },
      { label: "Remove tag", tone: "secondary" },
    ],
  },
  moderation: {
    variantId: "moderation",
    eyebrow: "Moderation",
    title: "Your post was flagged for review",
    actor: "Policy review",
    body: "Automated review found a possible community guideline match.",
    timestamp: "41m ago",
    avatar: {
      initials: "!",
      label: "Policy review",
      background: "linear-gradient(135deg, #3f3327, #8a6a3f)",
    },
    systemIcon: "!",
    badge: "Action needed",
    meta: "Visibility limited",
    quote: "Add context or request a human review.",
    actions: [
      { label: "View decision", tone: "primary" },
      { label: "Appeal", tone: "secondary" },
    ],
  },
  "post-comment": {
    variantId: "post-comment",
    eyebrow: "Post comment",
    title: "Ari Benassi commented on your post",
    actor: "Ari Benassi",
    body: "The state diagram made the edge case much easier to understand.",
    timestamp: "1h ago",
    avatar: {
      initials: "AB",
      label: "Ari Benassi",
      background: "linear-gradient(135deg, #273a34, #6f7b49)",
    },
    badge: "Comment",
    quote: "This is the missing piece.",
    media: {
      label: "Thread preview",
      tone: "accent",
    },
    actions: [{ label: "Reply", tone: "primary" }],
  },
} satisfies Record<NotificationPreviewVariantId, NotificationPreviewData>;

export const notificationPreviewVariants = notificationPreviewVariantIds.map(
  (variantId) => notificationPreviewByVariant[variantId],
);
