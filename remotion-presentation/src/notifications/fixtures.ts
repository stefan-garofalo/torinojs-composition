import type { NotificationData, NotificationType } from "./types";

export const notificationFixtures = [
  {
    id: "follow-request-marta",
    type: "follow-request",
    title: "Marta Velasquez wants to follow you",
    body: "Designer at North Pier, followed by Elise and 4 others.",
    timestamp: "2m ago",
    badge: "Private",
    actor: {
      name: "Marta Velasquez",
      initials: "MV",
      avatarGradient: "linear-gradient(135deg, #3b3d3f, #7b6f45)",
      subtitle: "6 mutual signals",
    },
    mutualContext: "Followed by Elise and 4 others",
  },
  {
    id: "post-like-tomas",
    type: "post-like",
    title: "Tomas Iversen liked your post",
    body: "Your note on composable interface previews is getting traction.",
    timestamp: "8m ago",
    badge: "New",
    actor: {
      name: "Tomas Iversen",
      initials: "TI",
      avatarGradient: "linear-gradient(135deg, #253238, #52736b)",
    },
    post: {
      label: "Post thumbnail",
      description: "Composable interface preview",
      tone: "accent",
    },
  },
  {
    id: "dm-request-lina",
    type: "dm-request",
    title: "New message request from Lina Okafor",
    body: "I saw your prototype deck and had a question about the preview layer.",
    timestamp: "17m ago",
    badge: "Request",
    actor: {
      name: "Lina Okafor",
      initials: "LO",
      avatarGradient: "linear-gradient(135deg, #3b2f3a, #75616f)",
    },
    messagePreview: "Can I send over two screenshots?",
  },
  {
    id: "photo-tag-nico",
    type: "photo-tag",
    title: "Nico Hart tagged you in a photo",
    body: "Review the tag before it appears on your profile.",
    timestamp: "24m ago",
    badge: "Needs review",
    actor: {
      name: "Nico Hart",
      initials: "NH",
      avatarGradient: "linear-gradient(135deg, #2f343b, #516a88)",
    },
    photo: {
      label: "Tagged photo",
      description: "Conference hallway snapshot",
      tone: "neutral",
    },
  },
  {
    id: "moderation-policy",
    type: "moderation",
    title: "Your post was flagged for review",
    body: "Automated review found a possible community guideline match.",
    timestamp: "41m ago",
    badge: "Action needed",
    reportReason: "Potential sensitive claim",
    visibility: "Visibility limited",
  },
  {
    id: "post-comment-ari",
    type: "post-comment",
    title: "Ari Benassi commented on your post",
    body: "The state diagram made the edge case much easier to understand.",
    timestamp: "1h ago",
    badge: "Comment",
    actor: {
      name: "Ari Benassi",
      initials: "AB",
      avatarGradient: "linear-gradient(135deg, #273a34, #6f7b49)",
    },
    commentPreview: "This is the missing piece.",
    post: {
      label: "Thread preview",
      description: "Composition notes",
      tone: "accent",
    },
  },
] as const satisfies readonly NotificationData[];

export function getNotificationFixture(type: NotificationType) {
  return notificationFixtures.find((notification) => notification.type === type);
}
