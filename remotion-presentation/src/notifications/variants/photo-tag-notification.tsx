import { createNotificationAction, Notification } from "../primitives";
import type { NotificationRowViewModel, PhotoTagNotificationData } from "../types";

export function usePhotoTagNotification(
  notification: PhotoTagNotificationData,
): NotificationRowViewModel {
  return {
    actor: notification.actor,
    action: createNotificationAction("remove-tag", "Remove", "secondary"),
    media: notification.photo,
    text: `${notification.actor.name} tagged you in a photo.`,
    timestamp: notification.timestamp,
  };
}

export function PhotoTagNotification({
  notification,
}: {
  notification: PhotoTagNotificationData;
}) {
  return <Notification.Row view={usePhotoTagNotification(notification)} />;
}
