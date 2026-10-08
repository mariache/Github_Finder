import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
  },
  // Explicitly embed GitHub credentials at build time.
  // envPrefix alone may not pick up Netlify shell env vars reliably.
  define: {
    "import.meta.env.GITHUB_CLIENT_ID": JSON.stringify(
      process.env.GITHUB_CLIENT_ID
    ),
    "import.meta.env.GITHUB_CLIENT_SECRET": JSON.stringify(
      process.env.GITHUB_CLIENT_SECRET
    ),
  },
});
