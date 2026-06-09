import { createNotificationAction, Notification } from "../primitives";
import type {
  FollowRequestNotificationData,
  NotificationRowViewModel,
} from "../types";

export function useFollowRequestNotification(
  notification: FollowRequestNotificationData,
): NotificationRowViewModel {
  const action = createNotificationAction("follow-back", "Follow", "primary");

  return {
    actor: notification.actor,
    action,
    text: `${notification.actor.name} is following you now.`,
    timestamp: notification.timestamp,
  };
}

export function FollowRequestNotification({
  notification,
}: {
  notification: FollowRequestNotificationData;
}) {
  return <Notification.Row view={useFollowRequestNotification(notification)} />;
}
