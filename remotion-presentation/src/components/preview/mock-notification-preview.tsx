import {
  getNotificationFixture,
  notificationFixtures,
  notificationRenderers,
  notificationTypes,
  type NotificationType,
} from "../../notifications";
import type { UIState } from "../remocn/live-code-compilation";

export interface MockNotificationPreviewProps {
  accentColor?: string;
  frame?: number;
  ui?: UIState;
}

export function MockNotificationPreview({
  frame = 0,
  ui = {},
}: MockNotificationPreviewProps) {
  const variantId = resolveVariantId(ui);
  const compact = ui.compact === true;
  const entrance = Math.min(1, Math.max(0, (frame - 18) / 18));

  if (ui.previewAll === true) {
    return (
      <div
        style={{
          display: "grid",
          gap: 8,
          opacity: 0.72 + entrance * 0.28,
          transform: `translateY(${Math.round((1 - entrance) * 18)}px)`,
          width: 560,
        }}
      >
        {notificationFixtures.map((notification) => {
          const Renderer = notificationRenderers[notification.type];

          return <Renderer key={notification.id} notification={notification} />;
        })}
      </div>
    );
  }

  const notification =
    getNotificationFixture(variantId) ?? getNotificationFixture("moderation");

  if (!notification) {
    return null;
  }

  const Renderer = notificationRenderers[notification.type];

  return (
    <div
      style={{
        opacity: 0.72 + entrance * 0.28,
        transform: `translateY(${Math.round((1 - entrance) * 18)}px)`,
        width: compact ? 440 : 520,
      }}
    >
      <Renderer notification={notification} />
    </div>
  );
}

function resolveVariantId(ui: UIState): NotificationType {
  const value = ui.variantId;
  if (typeof value === "string" && isNotificationType(value)) {
    return value;
  }
  return "moderation";
}

function isNotificationType(value: string): value is NotificationType {
  return notificationTypes.includes(value as NotificationType);
}
