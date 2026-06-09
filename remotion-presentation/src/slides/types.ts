import type { NotificationType } from "../notifications";

export type TalkSlideFamily = "narrative" | "code-only" | "code-dx";

export type TalkSlideId =
  | "make-the-shape-visible"
  | "component-earned-place"
  | "same-surface-different-shapes"
  | "post-like-clean"
  | "follow-behavior-branch"
  | "dm-behavior-branch"
  | "request-usage-before-moderation"
  | "moderation-internals"
  | "fifth-shape"
  | "props-outside-branches-inside"
  | "structural-variation"
  | "configuration-is-for-values"
  | "extract-row-primitive"
  | "extract-actor-primitive"
  | "extract-body-primitive"
  | "extract-media-primitive"
  | "extract-actions-primitive"
  | "make-supported-shapes-explicit"
  | "shape-is-in-the-code"
  | "internal-kit-public-api"
  | "inner-context"
  | "new-behavior-new-place"
  | "every-public-combination-counts"
  | "make-the-shape-visible-final";

export type CodeLanguage = "tsx";

export type CodeSnippet = {
  readonly language: CodeLanguage;
  readonly fileName: string;
  readonly code: string;
};

export type NarrativeContent = {
  readonly eyebrow?: string;
  readonly subtitle?: string;
  readonly bullets?: readonly string[];
  readonly leftItems?: readonly string[];
  readonly rightText?: string;
  readonly emphasis?: readonly string[];
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
  readonly variantId?: NotificationType;
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
