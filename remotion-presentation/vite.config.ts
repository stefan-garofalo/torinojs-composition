import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    dedupe: ["@remotion/player", "react", "react-dom", "remotion"],
  },
});
