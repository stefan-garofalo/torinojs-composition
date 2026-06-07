import { Series } from "remotion";
import {
  CodeOnlyStage,
  CodePlusDxStage,
  NarrativeStage,
} from "./components/stage";
import { PresenterDeck } from "./presenter/deck";

export const VISUAL_SYSTEM_FPS = 60;
export const VISUAL_SYSTEM_WIDTH = 1920;
export const VISUAL_SYSTEM_HEIGHT = 1080;
export const STAGE_FAMILY_DURATION_IN_FRAMES = VISUAL_SYSTEM_FPS * 3;
export const VISUAL_SYSTEM_DURATION_IN_FRAMES =
  STAGE_FAMILY_DURATION_IN_FRAMES * 3;

const themeCode = `import { stageTheme } from "./theme";

export const slide = {
  background: stageTheme.colors.background,
  accent: stageTheme.colors.javascriptYellow,
  fps: 60,
};`;

const dxCode = `export function createDxPanel(state: StageState) {
  return {
    label: "Preview health",
    status: state.framesDropped === 0,
    accent: "#F0DB4F",
  };
}`;

export const MyComposition = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={STAGE_FAMILY_DURATION_IN_FRAMES}>
        <NarrativeStage
          eyebrow="Visual system"
          title="Dark JavaScript slides with one stage rhythm"
          body="Narrative, code, and DX panels share the same dark neutral canvas, compact surfaces, and restrained JavaScript-yellow accents."
          metrics={[
            { label: "Output", value: "1920 x 1080" },
            { label: "Playback", value: "60fps" },
          ]}
          points={[
            "High-contrast text stays legible from the back row.",
            "Yellow marks the active idea without flooding the slide.",
            "Neutral shadcn-style panels keep the system crisp.",
          ]}
        />
      </Series.Sequence>
      <Series.Sequence durationInFrames={STAGE_FAMILY_DURATION_IN_FRAMES}>
        <CodeOnlyStage
          eyebrow="Code only"
          title="The code surface carries a complete idea"
          code={themeCode}
          codeTitle="theme-sample.ts"
          caption="A single large code block, generous inset, and JS-yellow syntax anchors make the API shape readable at stage scale."
        />
      </Series.Sequence>
      <Series.Sequence durationInFrames={STAGE_FAMILY_DURATION_IN_FRAMES}>
        <CodePlusDxStage
          eyebrow="Code + DX panel"
          title="Preview context supports the implementation"
          code={dxCode}
          codeTitle="dx-panel.ts"
          panelTitle="Stage preview"
          panelSubtitle="Compact neutral cards summarize runtime confidence while the code remains primary."
          items={[
            {
              label: "Family",
              value: "Code plus DX",
              detail: "Split stage with a supporting panel",
            },
            {
              label: "Accent",
              value: "#F0DB4F",
              detail: "Used for focus and syntax",
            },
            {
              label: "Surface",
              value: "#323330",
              detail: "Dark base with raised neutral cards",
            },
          ]}
        />
      </Series.Sequence>
    </Series>
  );
};

export const PresenterComposition = () => {
  return <PresenterDeck />;
};
