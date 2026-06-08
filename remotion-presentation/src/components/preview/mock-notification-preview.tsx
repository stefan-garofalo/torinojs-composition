import type { CSSProperties } from "react";
import type { UIState } from "../remocn/live-code-compilation";
import { stageTokens } from "../stage/tokens";
import {
  notificationPreviewByVariant,
  type NotificationPreviewAction,
  type NotificationPreviewData,
  type NotificationPreviewMedia,
  type NotificationPreviewVariantId,
} from "./notification-preview-data";

export interface MockNotificationPreviewProps {
  accentColor?: string;
  frame?: number;
  ui?: UIState;
}

export function MockNotificationPreview({
  accentColor = stageTokens.color.jsYellow,
  frame = 0,
  ui = {},
}: MockNotificationPreviewProps) {
  const variantId = resolveVariantId(ui);
  const notification = notificationPreviewByVariant[variantId];
  const compact = ui.compact === true;
  const entrance = Math.min(1, Math.max(0, (frame - 18) / 18));

  return (
    <section
      style={{
        ...shellStyle,
        gap: compact ? 14 : 18,
        opacity: 0.72 + entrance * 0.28,
        padding: compact ? 24 : 30,
        transform: `translateY(${Math.round((1 - entrance) * 18)}px)`,
        width: compact ? 520 : 620,
      }}
    >
      <header style={headerStyle}>
        <div>
          <p style={eyebrowStyle}>{notification.eyebrow}</p>
          <h3 style={{ ...titleStyle, fontSize: compact ? 30 : 36 }}>
            {String(ui.title ?? notification.eyebrow)}
          </h3>
        </div>
        {notification.badge ? <Badge label={notification.badge} /> : null}
      </header>
      <p style={{ ...subtitleStyle, fontSize: compact ? 20 : 23 }}>
        {String(ui.message ?? notification.title)}
      </p>
      <div style={separatorStyle} />
      <NotificationCard
        accentColor={accentColor}
        compact={compact}
        data={notification}
      />
    </section>
  );
}

function resolveVariantId(ui: UIState): NotificationPreviewVariantId {
  const value = ui.variantId;
  if (
    value === "follow-request" ||
    value === "post-like" ||
    value === "dm-request" ||
    value === "photo-tag" ||
    value === "moderation" ||
    value === "post-comment"
  ) {
    return value;
  }
  return "moderation";
}

function NotificationCard({
  accentColor,
  compact,
  data,
}: {
  accentColor: string;
  compact: boolean;
  data: NotificationPreviewData;
}) {
  return (
    <article
      style={{
        ...cardStyle,
        gap: compact ? 18 : 22,
        padding: compact ? 22 : 28,
      }}
    >
      <div style={rowStyle}>
        {data.systemIcon ? (
          <SystemIcon accentColor={accentColor} compact={compact}>
            {data.systemIcon}
          </SystemIcon>
        ) : (
          <Avatar compact={compact} data={data} />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={notificationHeaderStyle}>
            <p style={{ ...actorStyle, fontSize: compact ? 23 : 27 }}>
              {data.actor}
            </p>
            <span style={timeStyle}>{data.timestamp}</span>
          </div>
          <h4
            style={{ ...notificationTitleStyle, fontSize: compact ? 26 : 31 }}
          >
            {data.title}
          </h4>
        </div>
      </div>

      <p style={{ ...bodyStyle, fontSize: compact ? 20 : 23 }}>{data.body}</p>
      {data.quote ? (
        <blockquote style={quoteStyle}>{data.quote}</blockquote>
      ) : null}
      {data.media ? (
        <MediaPreview compact={compact} media={data.media} />
      ) : null}
      {data.meta ? <p style={metaStyle}>{data.meta}</p> : null}
      {data.actions ? <ActionRow actions={data.actions} /> : null}
    </article>
  );
}

function Avatar({
  compact,
  data,
}: {
  compact: boolean;
  data: NotificationPreviewData;
}) {
  const size = compact ? 58 : 70;

  return (
    <div
      aria-label={data.avatar.label}
      style={{
        ...avatarStyle,
        background: data.avatar.background,
        fontSize: compact ? 19 : 22,
        height: size,
        width: size,
      }}
    >
      {data.avatar.initials}
    </div>
  );
}

function SystemIcon({
  accentColor,
  children,
  compact,
}: {
  accentColor: string;
  children: string;
  compact: boolean;
}) {
  const size = compact ? 58 : 70;

  return (
    <div
      aria-label="System icon"
      style={{
        ...avatarStyle,
        background: `${accentColor}22`,
        border: `1px solid ${stageTokens.color.borderStrong}`,
        color: accentColor,
        fontSize: compact ? 28 : 34,
        height: size,
        width: size,
      }}
    >
      {children}
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return <span style={badgeStyle}>{label}</span>;
}

function MediaPreview({
  compact,
  media,
}: {
  compact: boolean;
  media: NotificationPreviewMedia;
}) {
  const isAccent = media.tone === "accent";
  const isWarning = media.tone === "warning";

  return (
    <div
      aria-label={media.label}
      style={{
        ...mediaStyle,
        background: isWarning
          ? "linear-gradient(135deg, rgba(240, 219, 79, 0.28), rgba(78, 61, 33, 0.5))"
          : isAccent
            ? "linear-gradient(135deg, rgba(240, 219, 79, 0.42), rgba(70, 73, 65, 0.72))"
            : "linear-gradient(135deg, rgba(88, 94, 99, 0.72), rgba(45, 47, 49, 0.92))",
        minHeight: compact ? 118 : 148,
      }}
    >
      <div style={mediaGridStyle}>
        <span style={mediaChipStyle} />
        <span style={{ ...mediaChipStyle, opacity: 0.58 }} />
        <span style={{ ...mediaChipStyle, opacity: 0.34 }} />
      </div>
    </div>
  );
}

function ActionRow({
  actions,
}: {
  actions: readonly NotificationPreviewAction[];
}) {
  return (
    <div style={actionsStyle}>
      {actions.map((action) => (
        <span
          key={action.label}
          style={
            action.tone === "primary"
              ? primaryActionStyle
              : secondaryActionStyle
          }
        >
          {action.label}
        </span>
      ))}
    </div>
  );
}

const shellStyle: CSSProperties = {
  background: stageTokens.color.surfaceElevated,
  border: `1px solid ${stageTokens.color.border}`,
  borderRadius: stageTokens.radius.card,
  boxShadow: "0 24px 70px rgba(0, 0, 0, 0.34)",
  boxSizing: "border-box",
  color: stageTokens.color.text,
  display: "grid",
  fontFamily: stageTokens.font.sans,
};

const headerStyle: CSSProperties = {
  alignItems: "start",
  display: "flex",
  gap: 18,
  justifyContent: "space-between",
};

const eyebrowStyle: CSSProperties = {
  color: stageTokens.color.jsYellow,
  fontFamily: stageTokens.font.mono,
  fontSize: 18,
  letterSpacing: 0,
  lineHeight: 1.1,
  margin: "0 0 10px",
  textTransform: "uppercase",
};

const titleStyle: CSSProperties = {
  color: stageTokens.color.text,
  fontWeight: 720,
  letterSpacing: 0,
  lineHeight: 1.04,
  margin: 0,
};

const subtitleStyle: CSSProperties = {
  color: stageTokens.color.textMuted,
  lineHeight: 1.34,
  margin: 0,
};

const separatorStyle: CSSProperties = {
  background: stageTokens.color.border,
  height: 1,
  width: "100%",
};

const cardStyle: CSSProperties = {
  background: "rgba(27, 28, 29, 0.74)",
  border: `1px solid ${stageTokens.color.border}`,
  borderRadius: stageTokens.radius.card,
  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.04)",
  display: "grid",
};

const rowStyle: CSSProperties = {
  alignItems: "start",
  display: "flex",
  gap: 18,
};

const avatarStyle: CSSProperties = {
  alignItems: "center",
  border: `1px solid ${stageTokens.color.border}`,
  borderRadius: 999,
  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.14)",
  color: stageTokens.color.codeText,
  display: "flex",
  flex: "0 0 auto",
  fontFamily: stageTokens.font.mono,
  fontWeight: 700,
  justifyContent: "center",
  lineHeight: 1,
};

const notificationHeaderStyle: CSSProperties = {
  alignItems: "baseline",
  display: "flex",
  gap: 14,
  justifyContent: "space-between",
};

const actorStyle: CSSProperties = {
  color: stageTokens.color.textSubtle,
  fontFamily: stageTokens.font.mono,
  lineHeight: 1.1,
  margin: 0,
};

const timeStyle: CSSProperties = {
  color: stageTokens.color.textMuted,
  flex: "0 0 auto",
  fontFamily: stageTokens.font.mono,
  fontSize: 17,
  lineHeight: 1,
};

const notificationTitleStyle: CSSProperties = {
  color: stageTokens.color.text,
  fontWeight: 690,
  letterSpacing: 0,
  lineHeight: 1.12,
  margin: "8px 0 0",
};

const bodyStyle: CSSProperties = {
  color: stageTokens.color.textMuted,
  lineHeight: 1.36,
  margin: 0,
};

const quoteStyle: CSSProperties = {
  borderLeft: `3px solid ${stageTokens.color.borderStrong}`,
  color: stageTokens.color.codeText,
  fontFamily: stageTokens.font.mono,
  fontSize: 20,
  lineHeight: 1.35,
  margin: 0,
  padding: "2px 0 2px 18px",
};

const metaStyle: CSSProperties = {
  color: stageTokens.color.jsYellow,
  fontFamily: stageTokens.font.mono,
  fontSize: 18,
  lineHeight: 1.2,
  margin: 0,
};

const badgeStyle: CSSProperties = {
  background: "rgba(240, 219, 79, 0.12)",
  border: `1px solid ${stageTokens.color.borderStrong}`,
  borderRadius: stageTokens.radius.control,
  color: stageTokens.color.jsYellow,
  flex: "0 0 auto",
  fontFamily: stageTokens.font.mono,
  fontSize: 16,
  lineHeight: 1,
  padding: "9px 11px",
};

const mediaStyle: CSSProperties = {
  border: `1px solid ${stageTokens.color.border}`,
  borderRadius: stageTokens.radius.card,
  boxSizing: "border-box",
  overflow: "hidden",
  padding: 16,
};

const mediaGridStyle: CSSProperties = {
  display: "grid",
  gap: 10,
  gridTemplateColumns: "1.2fr 0.8fr",
  height: "100%",
};

const mediaChipStyle: CSSProperties = {
  background: "rgba(244, 244, 239, 0.18)",
  borderRadius: stageTokens.radius.control,
  display: "block",
  minHeight: 36,
};

const actionsStyle: CSSProperties = {
  display: "flex",
  gap: 12,
  marginTop: 2,
};

const actionBaseStyle: CSSProperties = {
  borderRadius: stageTokens.radius.control,
  boxSizing: "border-box",
  display: "inline-flex",
  fontSize: 19,
  fontWeight: 680,
  justifyContent: "center",
  lineHeight: 1,
  minWidth: 128,
  padding: "14px 18px",
};

const primaryActionStyle: CSSProperties = {
  ...actionBaseStyle,
  background: stageTokens.color.jsYellow,
  color: stageTokens.color.darkBase,
};

const secondaryActionStyle: CSSProperties = {
  ...actionBaseStyle,
  background: "rgba(245, 245, 244, 0.04)",
  border: `1px solid ${stageTokens.color.border}`,
  color: stageTokens.color.text,
};
