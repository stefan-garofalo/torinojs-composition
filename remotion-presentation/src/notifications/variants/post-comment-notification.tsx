import {
  createNotificationAction,
  Notification,
} from "../index";
import type { NotificationRowViewModel, PostCommentNotificationData } from "../types";

export function usePostCommentNotification(
  notification: PostCommentNotificationData,
): NotificationRowViewModel {
  return {
    actor: notification.actor,
    action: createNotificationAction("reply-to-comment", "Reply", "primary"),
    media: notification.post,
    text: `${notification.actor.name} commented: ${notification.commentPreview}`,
    timestamp: notification.timestamp,
  };
}

export function PostCommentNotification({
  notification,
}: {
  notification: PostCommentNotificationData;
}) {
  return <Notification.Row view={usePostCommentNotification(notification)} />;
}
