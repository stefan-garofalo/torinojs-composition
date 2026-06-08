import type { UIState } from "../remocn/live-code-compilation";

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";
const MONO_FAMILY =
  "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace";

export interface MockNotificationPreviewProps {
  accentColor?: string;
  frame?: number;
  ui?: UIState;
}

export function MockNotificationPreview({
  accentColor = "#f0db4f",
  frame = 0,
  ui = {},
}: MockNotificationPreviewProps) {
  const tone = String(ui.tone ?? "neutral");
  const title = String(ui.title ?? "Queued for review");
  const message = String(
    ui.message ?? "A policy check is waiting for moderator context.",
  );
  const source = String(ui.source ?? "composition.review");
  const compact = ui.compact === true;
  const showActions = ui.showActions === true;
  const reviewed = ui.reviewed === true;
  const entrance = Math.min(1, Math.max(0, (frame - 18) / 18));

  return (
    <div
      style={{
        width: compact ? 520 : 610,
        borderRadius: compact ? 18 : 26,
        border: "1px solid rgba(255,255,255,0.1)",
        background:
          "linear-gradient(180deg, rgba(24,24,27,0.94), rgba(10,10,12,0.96))",
        boxShadow: "0 26px 70px rgba(0,0,0,0.45)",
        color: "#f8fafc",
        fontFamily: FONT_FAMILY,
        opacity: 0.72 + entrance * 0.28,
        padding: compact ? 22 : 30,
        transform: `translateY(${Math.round((1 - entrance) * 18)}px)`,
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          gap: 12,
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            color: "rgba(248,250,252,0.58)",
            fontFamily: MONO_FAMILY,
            fontSize: 13,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Moderation event
        </div>
        <StatusPill
          accentColor={accentColor}
          label={reviewed ? "Resolved" : tone}
          reviewed={reviewed}
        />
      </div>
      <div
        style={{
          display: "grid",
          gap: compact ? 10 : 14,
          marginTop: compact ? 18 : 24,
        }}
      >
        <h3
          style={{
            fontSize: compact ? 30 : 38,
            fontWeight: 650,
            letterSpacing: 0,
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            color: "rgba(248,250,252,0.68)",
            fontSize: compact ? 18 : 21,
            lineHeight: 1.35,
            margin: 0,
          }}
        >
          {message}
        </p>
      </div>
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "grid",
          gap: 12,
          gridTemplateColumns: "1fr auto",
          marginTop: compact ? 20 : 28,
          paddingTop: compact ? 16 : 20,
        }}
      >
        <div>
          <div
            style={{
              color: "rgba(248,250,252,0.45)",
              fontFamily: MONO_FAMILY,
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Source
          </div>
          <div
            style={{
              color: "rgba(248,250,252,0.82)",
              fontFamily: MONO_FAMILY,
              fontSize: 17,
              marginTop: 7,
            }}
          >
            {source}
          </div>
        </div>
        {showActions ? (
          <div style={{ display: "flex", gap: 10 }}>
            <ActionButton label="Hold" tone="neutral" />
            <ActionButton label="Approve" tone="accent" />
          </div>
        ) : (
          <div
            style={{
              alignSelf: "center",
              borderRadius: 999,
              color: "rgba(248,250,252,0.5)",
              fontFamily: MONO_FAMILY,
              fontSize: 13,
            }}
          >
            Shape pending
          </div>
        )}
      </div>
    </div>
  );
}

function StatusPill({
  accentColor,
  label,
  reviewed,
}: {
  accentColor: string;
  label: string;
  reviewed: boolean;
}) {
  return (
    <div
      style={{
        alignItems: "center",
        background: reviewed ? `${accentColor}22` : "rgba(255,255,255,0.06)",
        border: `1px solid ${reviewed ? `${accentColor}66` : "rgba(255,255,255,0.1)"}`,
        borderRadius: 999,
        color: reviewed ? "#f8fafc" : "rgba(248,250,252,0.64)",
        display: "flex",
        fontFamily: MONO_FAMILY,
        fontSize: 13,
        gap: 8,
        padding: "8px 12px",
        textTransform: "uppercase",
      }}
    >
      <span
        style={{
          background: reviewed ? accentColor : "rgba(248,250,252,0.36)",
          borderRadius: 5,
          height: 9,
          width: 9,
        }}
      />
      {label}
    </div>
  );
}

function ActionButton({
  label,
  tone,
}: {
  label: string;
  tone: "accent" | "neutral";
}) {
  return (
    <div
      style={{
        background: tone === "accent" ? "#f0db4f" : "rgba(255,255,255,0.08)",
        borderRadius: 12,
        color: tone === "accent" ? "#1f1f1f" : "rgba(248,250,252,0.78)",
        fontSize: 15,
        fontWeight: 650,
        padding: "12px 16px",
      }}
    >
      {label}
    </div>
  );
}
