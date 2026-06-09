import type { ReactNode } from "react";

export const notificationTypes = [
  "follow-request",
  "post-like",
  "dm-request",
  "photo-tag",
  "moderation",
  "post-comment",
] as const;

export type NotificationType = (typeof notificationTypes)[number];

export type ActionTone = "primary" | "secondary" | "destructive";

export type NotificationAction = {
  readonly id: string;
  readonly label: string;
  readonly tone: ActionTone;
  readonly run: () => FakeActionResult;
};

export type FakeActionResult = {
  readonly ok: true;
  readonly actionId: string;
  readonly label: string;
};

export type NotificationActor = {
  readonly name: string;
  readonly initials: string;
  readonly avatarGradient: string;
  readonly subtitle?: string;
};

export type NotificationMedia = {
  readonly label: string;
  readonly description: string;
  readonly tone: "neutral" | "accent" | "warning";
};

export type BaseNotification = {
  readonly id: string;
  readonly type: NotificationType;
  readonly title: string;
  readonly body: string;
  readonly timestamp: string;
  readonly badge?: string;
};

export type FollowRequestNotificationData = BaseNotification & {
  readonly type: "follow-request";
  readonly actor: NotificationActor;
  readonly mutualContext: string;
};

export type PostLikeNotificationData = BaseNotification & {
  readonly type: "post-like";
  readonly actor: NotificationActor;
  readonly post: NotificationMedia;
};

export type DMRequestNotificationData = BaseNotification & {
  readonly type: "dm-request";
  readonly actor: NotificationActor;
  readonly messagePreview: string;
};

export type PhotoTagNotificationData = BaseNotification & {
  readonly type: "photo-tag";
  readonly actor: NotificationActor;
  readonly photo: NotificationMedia;
};

export type ModerationNotificationData = BaseNotification & {
  readonly type: "moderation";
  readonly reportReason: string;
  readonly visibility: string;
};

export type PostCommentNotificationData = BaseNotification & {
  readonly type: "post-comment";
  readonly actor: NotificationActor;
  readonly commentPreview: string;
  readonly post: NotificationMedia;
};

export type NotificationData =
  | FollowRequestNotificationData
  | PostLikeNotificationData
  | DMRequestNotificationData
  | PhotoTagNotificationData
  | ModerationNotificationData
  | PostCommentNotificationData;

export type NotificationViewModel = {
  readonly type: NotificationType;
  readonly title: string;
  readonly body: string;
  readonly actor?: NotificationActor;
  readonly systemIcon?: string;
  readonly timestamp: string;
  readonly badge?: string;
  readonly primaryDetail?: string;
  readonly secondaryDetail?: string;
  readonly media?: NotificationMedia;
  readonly actions: readonly NotificationAction[];
  readonly meta: {
    readonly id: string;
    readonly type: NotificationType;
  };
};

export type NotificationRowViewModel = {
  readonly actor?: NotificationActor;
  readonly action?: NotificationAction;
  readonly actions?: readonly NotificationAction[];
  readonly media?: NotificationMedia;
  readonly systemIcon?: string;
  readonly text: string;
  readonly timestamp: string;
};

export type NotificationRenderer<T extends NotificationData = NotificationData> =
  (props: { notification: T }) => ReactNode;
