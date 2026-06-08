import type {
  CodeEvent,
  UIState,
} from "../components/remocn/live-code-compilation";
import { CodeDxTalkSlide } from "./code-dx-slide";
import { CodeOnlyTalkSlide } from "./code-only-slide";
import { NarrativeTalkSlide } from "./narrative-slide";
import type { CodeDxContent, TalkSlide } from "./types";

export function renderTalkSlide(slide: TalkSlide) {
  switch (slide.family) {
    case "narrative":
      return (
        <NarrativeTalkSlide
          bullets={[
            ...(slide.content.bullets ?? []),
            ...(slide.content.leftItems ?? []),
          ]}
          emphasisLines={[
            ...(slide.content.emphasis ?? []),
            ...(slide.content.rightText?.split("\n") ?? []),
          ]}
          eyebrow={slide.content.eyebrow}
          subtitle={slide.content.subtitle}
          title={slide.title}
        />
      );
    case "code-only":
      return (
        <CodeOnlyTalkSlide
          code={slide.content.code.code}
          codeTitle={slide.content.code.fileName}
          subtitle={
            slide.content.subtitle ?? slide.content.bullets?.join(" · ")
          }
          title={slide.title}
        />
      );
    case "code-dx":
      return (
        <CodeDxTalkSlide
          codeEvents={buildCodeEvents(slide.title, slide.content)}
          codeTitle={slide.content.code.fileName}
          previewLabel={slide.content.previewFocus.join(" · ")}
        />
      );
  }
}

function buildCodeEvents(title: string, content: CodeDxContent): CodeEvent[] {
  const lines = content.code.code.split("\n");
  const focusItems =
    content.previewFocus.length > 0 ? content.previewFocus : [title];

  return lines.map((line, index) => {
    const isFinalLine = index === lines.length - 1;
    const focus = focusItems[Math.min(index, focusItems.length - 1)];
    const variantId = resolvePreviewVariant(line, content.code.fileName);
    const ui: UIState = {
      compact: index > 2,
      message: focus,
      reviewed: isFinalLine,
      showActions: isFinalLine,
      source: content.code.fileName,
      title,
      tone: isFinalLine ? "approved" : "warning",
    };

    if (variantId) {
      ui.variantId = variantId;
    }

    return {
      code: `${index === 0 ? "" : "\n"}${line}`,
      ui,
    };
  });
}

function resolvePreviewVariant(line: string, fileName: string) {
  if (line.includes("FollowRequestNotification")) return "follow-request";
  if (line.includes("PostLikeNotification")) return "post-like";
  if (line.includes("DMRequestNotification")) return "dm-request";
  if (line.includes("PhotoTagNotification")) return "photo-tag";
  if (line.includes("PostCommentNotification")) return "post-comment";
  if (
    line.includes("ModerationNotification") ||
    fileName.includes("moderation")
  ) {
    return "moderation";
  }
  if (fileName.includes("post-comment")) return "post-comment";
  return undefined;
}
