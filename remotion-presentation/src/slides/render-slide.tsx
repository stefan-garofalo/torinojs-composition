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
          codeFontSize={slide.content.codeFontSize}
          codeHeight={slide.content.codeHeight}
          codeTitle={slide.content.code.fileName}
          codeWidth={slide.content.codeWidth}
          subtitle={
            slide.content.subtitle ?? slide.content.bullets?.join(" · ")
          }
          title={slide.title}
        />
      );
    case "code-dx":
      return (
        <CodeDxTalkSlide
          codeBodyMinHeight={slide.content.codeBodyMinHeight}
          codeEvents={buildCodeEvents(slide.title, slide.content)}
          codeFontSize={slide.content.codeFontSize}
          codeMaxWidth={slide.content.codeMaxWidth}
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
  const previewSteps = [...(content.previewSteps ?? [])].sort(
    (a, b) => a.afterLine - b.afterLine,
  );

  const events = lines.map((line, index) => {
    const isFinalLine = index === lines.length - 1;
    const step = findPreviewStep(previewSteps, index + 1);
    const focus =
      step?.message ?? focusItems[Math.min(index, focusItems.length - 1)];
    const ui: UIState = {
      compact: step?.compact ?? index > 2,
      message: focus,
      previewAll: step?.previewAll,
      reviewed: step?.reviewed ?? isFinalLine,
      showActions: step?.showActions ?? isFinalLine,
      source: content.code.fileName,
      title,
      tone: isFinalLine ? "approved" : "warning",
    };

    if (step?.variantId) {
      ui.variantId = step.variantId;
    }

    return {
      code: `${index === 0 ? "" : "\n"}${line}`,
      ui,
    };
  });

  const finalUi = events[events.length - 1]?.ui ?? {};

  return events.map((event) => ({
    ...event,
    ui: finalUi,
  }));
}

function findPreviewStep(
  steps: readonly NonNullable<CodeDxContent["previewSteps"]>[number][],
  lineNumber: number,
) {
  for (let index = steps.length - 1; index >= 0; index -= 1) {
    if (lineNumber >= steps[index].afterLine) {
      return steps[index];
    }
  }

  return undefined;
}
