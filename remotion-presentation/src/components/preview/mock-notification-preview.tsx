import { interpolate } from "remotion";
import { presenterTheme } from "../../theme/presenter-theme";

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
        borderRadius: 8,
        border: `1px solid ${presenterTheme.colors.line}`,
        background: "#0c0c10",
        boxShadow: "0 30px 90px rgba(0,0,0,0.5)",
        overflow: "hidden",
        color: presenterTheme.colors.paper,
      }}
    >
      <div
        style={{
          height: 54,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          borderBottom: `1px solid ${presenterTheme.colors.line}`,
          background: "#121217",
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 650 }}>Notifications</div>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            background: presenterTheme.colors.green,
            boxShadow: `0 0 18px ${presenterTheme.colors.green}`,
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
            borderRadius: 8,
            background: "#18181f",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 8,
              display: "grid",
              placeItems: "center",
              background: "rgba(250,204,21,0.14)",
              color: presenterTheme.colors.yellow,
              fontWeight: 800,
            }}
          >
            !
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>
              Moderation decision
            </div>
            <div style={{ marginTop: 5, fontSize: 14, color: "#a1a1aa" }}>
              System event, appeal available
            </div>
          </div>
          <button
            type="button"
            style={{
              padding: "10px 14px",
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "#22222b",
              color: presenterTheme.colors.paper,
              font: `600 14px ${presenterTheme.fontSans}`,
            }}
          >
            Review
          </button>
        </div>

        <div
          style={{
            opacity: detailOpacity,
            padding: 16,
            borderRadius: 8,
            background: "#101014",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            style={{
              fontFamily: presenterTheme.fontMono,
              fontSize: 13,
              color: presenterTheme.colors.cyan,
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
              color: "#d4d4d8",
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
        borderRadius: 6,
        background: "rgba(255,255,255,0.04)",
      }}
    >
      <div style={{ color: "#71717a", fontSize: 11 }}>{label}</div>
      <div style={{ marginTop: 5, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
