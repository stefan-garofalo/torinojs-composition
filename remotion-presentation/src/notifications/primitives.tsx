import type { CSSProperties } from "react";
import {
  Avatar,
  AvatarFallback,
  Button,
  Card,
  TypographyMuted,
  TypographyP,
} from "../components/ui";
import { vw } from "../lib/viewport-units";
import type {
  ActionTone,
  NotificationAction,
  NotificationMedia,
  NotificationRowViewModel,
} from "./types";

export function createFakeAction(id: string, label: string) {
  return () => ({ ok: true, actionId: id, label }) as const;
}

export function createNotificationAction(
  id: string,
  label: string,
  tone: ActionTone,
): NotificationAction {
  return {
    id,
    label,
    tone,
    run: createFakeAction(id, label),
  };
}

type StyleWithVars = CSSProperties & Record<string, string | number>;

export const notificationThemeVars = {
  "--background": "hsl(240 10% 3.9%)",
  "--foreground": "hsl(0 0% 98%)",
  "--card": "hsl(240 10% 3.9%)",
  "--card-foreground": "hsl(0 0% 98%)",
  "--primary": "hsl(0 0% 98%)",
  "--primary-foreground": "hsl(240 5.9% 10%)",
  "--secondary": "hsl(240 3.7% 15.9%)",
  "--secondary-foreground": "hsl(0 0% 98%)",
  "--muted": "hsl(240 3.7% 15.9%)",
  "--muted-foreground": "hsl(240 5% 64.9%)",
  "--accent": "hsl(240 3.7% 15.9%)",
  "--accent-foreground": "hsl(0 0% 98%)",
  "--destructive": "hsl(0 62.8% 30.6%)",
  "--border": "hsl(240 3.7% 15.9%)",
  "--input": "hsl(240 3.7% 15.9%)",
  "--ring": "hsl(240 4.9% 83.9%)",
  "--radius": "0.5rem",
  "--radius-md": "calc(var(--radius) - 2px)",
  "--radius-lg": "var(--radius)",
  "--font-sans":
    'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
} satisfies StyleWithVars;

export function NotificationRow({ view }: { view: NotificationRowViewModel }) {
  const actions = view.actions ?? (view.action ? [view.action] : []);

  return (
    <Card style={rowStyle}>
      {view.actor ? (
        <Avatar
          aria-label={view.actor.name}
          style={{
            height: 44,
            width: 44,
          }}
        >
          <AvatarFallback>{view.actor.initials}</AvatarFallback>
        </Avatar>
      ) : (
        <Avatar
          aria-label="System notification"
          style={{
            height: 44,
            width: 44,
          }}
        >
          <AvatarFallback>{view.systemIcon ?? "!"}</AvatarFallback>
        </Avatar>
      )}

      <div style={copyStyle}>
        <TypographyP style={textStyle}>{view.text}</TypographyP>
        <TypographyMuted style={timeStyle}>{view.timestamp}</TypographyMuted>
      </div>

      {actions.length > 0 ? (
        <div style={actionsStyle}>
          {actions.map((action) => (
            <Button
              key={action.id}
              style={buttonStyle}
              variant={action.tone === "primary" ? "default" : "secondary"}
            >
              {action.label}
            </Button>
          ))}
        </div>
      ) : null}

      {view.media ? <Thumbnail media={view.media} /> : null}
    </Card>
  );
}

function Thumbnail({ media }: { media: NotificationMedia }) {
  return (
    <div
      aria-label={media.label}
      style={{ ...thumbStyle, background: mediaBackground[media.tone] }}
    />
  );
}

const rowStyle: StyleWithVars = {
  ...notificationThemeVars,
  alignItems: "center",
  boxShadow: "none",
  display: "flex",
  gap: 12,
  minHeight: 72,
  padding: "12px 14px",
};

const copyStyle: CSSProperties = {
  flex: "1 1 auto",
  minWidth: 0,
};

const textStyle: CSSProperties = {
  color: "var(--foreground)",
  fontSize: vw(15),
  lineHeight: 1.25,
};

const timeStyle: CSSProperties = {
  fontSize: vw(13),
  marginTop: 3,
};

const buttonStyle: CSSProperties = {
  flex: "0 0 auto",
  minHeight: 32,
  padding: "0 14px",
};

const actionsStyle: CSSProperties = {
  alignItems: "center",
  display: "flex",
  flex: "0 0 auto",
  gap: 8,
};

const thumbStyle: CSSProperties = {
  borderRadius: 3,
  flex: "0 0 auto",
  height: 44,
  width: 44,
};

const mediaBackground = {
  accent: "hsl(240 3.7% 15.9%)",
  neutral: "var(--muted)",
  warning: "hsl(240 3.7% 13%)",
} as const;

export const Notification = {
  Row: NotificationRow,
};
