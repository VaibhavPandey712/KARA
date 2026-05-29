import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      // Explicitly use the JSX transform so rollup/rolldown never treats JSX as plain JS
      jsxRuntime: "automatic",
    }),
  ],
  // Ensure Vite behaves as an SPA so '/' serves the index.html entrypoint.
  appType: "spa",
});


