import {
  createNotificationAction,
  Notification,
} from "../index";
import type { DMRequestNotificationData, NotificationRowViewModel } from "../types";

export function useDMRequestNotification(
  notification: DMRequestNotificationData,
): NotificationRowViewModel {
  return {
    actor: notification.actor,
    actions: [
      createNotificationAction(`accept-${notification.id}`, "Accept", "primary"),
      createNotificationAction(`ignore-${notification.id}`, "Ignore", "secondary"),
    ],
    text: `${notification.actor.name}: ${notification.messagePreview}`,
    timestamp: notification.timestamp,
  };
}

export function DMRequestNotification({
  notification,
}: {
  notification: DMRequestNotificationData;
}) {
  return <Notification.Row view={useDMRequestNotification(notification)} />;
}
