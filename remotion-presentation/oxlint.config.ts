import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import ultraciteReact from "ultracite/oxlint/react";
import ultraciteVitest from "ultracite/oxlint/vitest";

const localConfig = {
  "jsPlugins": [
    {
      "name": "react-you-might-not-need-an-effect-js",
      "specifier": "eslint-plugin-react-you-might-not-need-an-effect"
    }
  ],
  "rules": {
    "react-you-might-not-need-an-effect-js/no-adjust-state-on-prop-change": "error",
    "react-you-might-not-need-an-effect-js/no-chain-state-updates": "error",
    "react-you-might-not-need-an-effect-js/no-derived-state": "error",
    "react-you-might-not-need-an-effect-js/no-event-handler": "error",
    "react-you-might-not-need-an-effect-js/no-initialize-state": "error",
    "react-you-might-not-need-an-effect-js/no-pass-data-to-parent": "error",
    "react-you-might-not-need-an-effect-js/no-pass-live-state-to-parent": "error",
    "react-you-might-not-need-an-effect-js/no-reset-all-state-on-prop-change": "error"
  }
};

export default defineConfig({
  extends: [core, ultraciteReact, ultraciteVitest],
  ignorePatterns: core.ignorePatterns,
  ...localConfig,
});
