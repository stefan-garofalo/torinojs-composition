import { MockNotificationPreview } from "../components/preview/mock-notification-preview";
import type { LiveCodeCompilationProps } from "../components/remocn/live-code-compilation";

export const renderDeckPreview: LiveCodeCompilationProps["renderPreview"] = ({
  accentColor,
  frame,
  ui,
}) => (
  <MockNotificationPreview accentColor={accentColor} frame={frame} ui={ui} />
);
