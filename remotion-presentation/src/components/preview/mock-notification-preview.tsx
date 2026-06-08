import { interpolate } from "remotion";
import { stageTokens } from "../stage";

type MockNotificationPreviewProps = {
  frame: number;
  revealStartFrame: number;
};

export function MockNotificationPreview({
  frame,
  revealStartFrame,
}: MockNotificationPreviewProps) {
  const localFrame = frame - revealStartFrame;
  const shellOpacity = interpolate(localFrame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shellY = interpolate(localFrame, [0, 18], [22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rowOpacity = interpolate(localFrame, [16, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const detailOpacity = interpolate(localFrame, [36, 54], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity: shellOpacity,
        transform: `translateY(${shellY}px)`,
        width: 560,
        borderRadius: stageTokens.radius.card,
        border: `1px solid ${stageTokens.color.border}`,
        background: stageTokens.color.surfaceCode,
        boxShadow: "0 30px 90px rgba(0,0,0,0.5)",
        overflow: "hidden",
        color: stageTokens.color.text,
      }}
    >
      <div
        style={{
          height: 54,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          borderBottom: `1px solid ${stageTokens.color.border}`,
          background: stageTokens.color.surface,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 650 }}>Notifications</div>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            background: "#62d26f",
            boxShadow: "0 0 18px #62d26f",
          }}
        />
      </div>

      <div style={{ padding: 18, display: "grid", gap: 14 }}>
        <div
          style={{
            opacity: rowOpacity,
            display: "grid",
            gridTemplateColumns: "44px minmax(0, 1fr) auto",
            gap: 14,
            alignItems: "center",
            padding: 14,
            borderRadius: stageTokens.radius.card,
            background: stageTokens.color.surfaceElevated,
            border: `1px solid ${stageTokens.color.border}`,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: stageTokens.radius.control,
              display: "grid",
              placeItems: "center",
              background: "rgba(250,204,21,0.14)",
              color: stageTokens.color.jsYellow,
              fontWeight: 800,
            }}
          >
            !
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>
              Moderation decision
            </div>
            <div
              style={{ marginTop: 5, fontSize: 14, color: stageTokens.color.textMuted }}
            >
              System event, appeal available
            </div>
          </div>
          <button
            type="button"
            style={{
              padding: "10px 14px",
              borderRadius: stageTokens.radius.control,
              border: `1px solid ${stageTokens.color.border}`,
              background: stageTokens.color.surface,
              color: stageTokens.color.text,
              font: `600 14px ${stageTokens.font.sans}`,
            }}
          >
            Review
          </button>
        </div>

        <div
          style={{
            opacity: detailOpacity,
            padding: 16,
            borderRadius: stageTokens.radius.card,
            background: stageTokens.color.surface,
            border: `1px solid ${stageTokens.color.border}`,
          }}
        >
          <div
            style={{
              fontFamily: stageTokens.font.mono,
              fontSize: 13,
              color: stageTokens.color.codeString,
            }}
          >
            shape-specific slots
          </div>
          <div
            style={{
              marginTop: 12,
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 10,
              fontSize: 13,
              color: stageTokens.color.text,
            }}
          >
            <Slot label="icon" value="system" />
            <Slot label="actor" value="none" />
            <Slot label="actions" value="2" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Slot({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        padding: "10px 12px",
        borderRadius: stageTokens.radius.control,
        background: "rgba(255,255,255,0.04)",
      }}
    >
      <div style={{ color: stageTokens.color.textSubtle, fontSize: 11 }}>
        {label}
      </div>
      <div style={{ marginTop: 5, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
