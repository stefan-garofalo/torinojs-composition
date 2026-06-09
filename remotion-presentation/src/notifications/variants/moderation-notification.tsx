import { createNotificationAction, Notification } from "../primitives";
import type { ModerationNotificationData, NotificationRowViewModel } from "../types";

export function useModerationNotification(
  notification: ModerationNotificationData,
): NotificationRowViewModel {
  return {
    action: createNotificationAction("appeal", "Appeal", "primary"),
    systemIcon: "!",
    timestamp: notification.timestamp,
    text: `Your post was flagged: ${notification.reportReason}.`,
  };
}

export function ModerationNotification({
  notification,
}: {
  notification: ModerationNotificationData;
}) {
  return <Notification.Row view={useModerationNotification(notification)} />;
}
