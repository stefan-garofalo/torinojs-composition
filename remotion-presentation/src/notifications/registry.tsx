import type { ReactNode } from "react";
import type {
  NotificationData,
  NotificationRenderer,
  NotificationType,
} from "./types";
import {
  DMRequestNotification,
  FollowRequestNotification,
  ModerationNotification,
  PhotoTagNotification,
  PostCommentNotification,
  PostLikeNotification,
} from "./variants";

type NotificationComponent<TType extends NotificationType> = (props: {
  notification: Extract<NotificationData, { type: TType }>;
}) => ReactNode;

function rendererFor<TType extends NotificationType>(
  type: TType,
  Component: NotificationComponent<TType>,
): NotificationRenderer {
  return ({ notification }) => {
    if (notification.type !== type) {
      throw new Error(
        `Notification renderer expected ${type}, received ${notification.type}.`,
      );
    }

    return (
      <Component
        notification={notification as Extract<NotificationData, { type: TType }>}
      />
    );
  };
}

export const notificationRenderers = {
  "follow-request": rendererFor("follow-request", FollowRequestNotification),
  "post-like": rendererFor("post-like", PostLikeNotification),
  "dm-request": rendererFor("dm-request", DMRequestNotification),
  "photo-tag": rendererFor("photo-tag", PhotoTagNotification),
  moderation: rendererFor("moderation", ModerationNotification),
  "post-comment": rendererFor("post-comment", PostCommentNotification),
} satisfies Record<NotificationType, NotificationRenderer>;

export function renderNotification(notification: NotificationData) {
  const Renderer = notificationRenderers[notification.type];
  return <Renderer notification={notification} />;
}
