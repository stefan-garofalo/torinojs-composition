export type TalkSlideFamily = "narrative" | "code-only" | "code-dx";

export type TalkSlideId = string;

export type CodeLanguage = "tsx";

export type CodeSnippet = {
  readonly language: CodeLanguage;
  readonly fileName: string;
  readonly code: string;
};

export type NarrativeContent = {
  readonly layout?: "default" | "yellow" | "right-column";
  readonly eyebrow?: string;
  readonly subtitle?: string;
  readonly bullets?: readonly string[];
  readonly leftItems?: readonly string[];
  readonly rightText?: string;
  readonly emphasis?: readonly string[];
  readonly claim?: string;
  readonly code?: CodeSnippet;
};

export type CodeContent = {
  readonly bullets?: readonly string[];
  readonly subtitle?: string;
  readonly codeFontSize?: number;
  readonly codeHeight?: number;
  readonly codeWidth?: number;
  readonly code: CodeSnippet;
};

export type CodeDxContent = CodeContent & {
  readonly codeBodyMinHeight?: number;
  readonly codeFontSize?: number;
  readonly codeMaxWidth?: number;
  readonly leftItems?: readonly string[];
  readonly previewMode?: "progressive" | "final";
  readonly previewSteps?: readonly PreviewStep[];
  readonly rightText?: string;
  readonly previewFocus: readonly string[];
};

export type PreviewStep = {
  readonly afterLine: number;
  readonly variantId?: string;
  readonly message: string;
  readonly compact?: boolean;
  readonly previewAll?: boolean;
  readonly showActions?: boolean;
  readonly reviewed?: boolean;
};

type BaseTalkSlide = {
  readonly id: TalkSlideId;
  readonly title: string;
  readonly family: TalkSlideFamily;
  readonly durationInFrames: number;
};

export type NarrativeTalkSlide = BaseTalkSlide & {
  readonly family: "narrative";
  readonly content: NarrativeContent;
};

export type CodeOnlyTalkSlide = BaseTalkSlide & {
  readonly family: "code-only";
  readonly content: CodeContent;
};

export type CodeDxTalkSlide = BaseTalkSlide & {
  readonly family: "code-dx";
  readonly content: CodeDxContent;
};

export type TalkSlide =
  | NarrativeTalkSlide
  | CodeOnlyTalkSlide
  | CodeDxTalkSlide;
