import { Notification } from "../index";
import type { PostLikeNotificationData } from "../types";

export function usePostLikeNotification(notification: PostLikeNotificationData) {
  return {
    actor: notification.actor,
    media: notification.post,
    text: `${notification.actor.name} liked your post.`,
    timestamp: notification.timestamp,
  } as const;
}

export function PostLikeNotification({
  notification,
}: {
  notification: PostLikeNotificationData;
}) {
  return <Notification.Row view={usePostLikeNotification(notification)} />;
}
