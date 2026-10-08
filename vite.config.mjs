import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
  },
  // Expose GITHUB_* env vars (matching existing Netlify variable names)
  // in addition to the default VITE_* prefix.
  envPrefix: ["VITE_", "GITHUB_"],
});
