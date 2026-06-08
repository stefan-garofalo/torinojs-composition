"use client";

import type {
  CodeEvent,
  LiveCodeCompilationProps,
} from "../components/remocn/live-code-compilation";
import { LiveCodeCompilation } from "../components/remocn/live-code-compilation";
import { MockNotificationPreview } from "../components/preview/mock-notification-preview";

export interface CodeDxTalkSlideProps extends Omit<
  LiveCodeCompilationProps,
  "codeEvents" | "renderPreview"
> {
  codeEvents?: readonly CodeEvent[];
  renderPreview?: LiveCodeCompilationProps["renderPreview"];
}

export const notificationCodeEvents = [
  {
    code: "export function notifyModerators(event) {\n  return {",
    ui: {
      title: "Queued for review",
      message: "A policy check is waiting for moderator context.",
      source: "composition.review",
      tone: "queued",
    },
  },
  {
    code: '\n    tone: "warning",',
    ui: { tone: "warning" },
  },
  {
    code: '\n    title: "Risk changed shape",',
    ui: { title: "Risk changed shape" },
  },
  {
    code: '\n    message: "Same intent, new UI surface.",',
    ui: { message: "Same intent, new UI surface." },
  },
  {
    code: "\n    compact: true,",
    ui: { compact: true },
  },
  {
    code: "\n    showActions: true,",
    ui: { showActions: true },
  },
  {
    code: "\n    reviewed: true,\n  };\n}",
    ui: { reviewed: true, tone: "approved" },
  },
] satisfies readonly CodeEvent[];

export function CodeDxTalkSlide({
  accentColor = "#f0db4f",
  codeEvents = notificationCodeEvents,
  codeTitle = "moderation-notification.tsx",
  codeMaxWidth = 700,
  codeFontSize = 16,
  codeBodyMinHeight = 500,
  previewLabel = "DX panel · live preview",
  leftFlex = 1.08,
  rightFlex = 0.92,
  renderPreview = ({ frame, ui }) => (
    <MockNotificationPreview accentColor={accentColor} frame={frame} ui={ui} />
  ),
  ...props
}: CodeDxTalkSlideProps) {
  return (
    <LiveCodeCompilation
      accentColor={accentColor}
      codeBodyMinHeight={codeBodyMinHeight}
      codeEvents={codeEvents}
      codeFontSize={codeFontSize}
      codeMaxWidth={codeMaxWidth}
      codeTitle={codeTitle}
      leftFlex={leftFlex}
      previewLabel={previewLabel}
      renderPreview={renderPreview}
      rightFlex={rightFlex}
      {...props}
    />
  );
}
