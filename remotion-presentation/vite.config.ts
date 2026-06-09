import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    dedupe: ["@remotion/player", "react", "react-dom", "remotion"],
  },
  server: {
    port: 3001,
    strictPort: true,
  },
});
