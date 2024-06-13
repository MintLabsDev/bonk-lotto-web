import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import path from "path";

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  build: {
    outDir: path.join(__dirname, "_static"),
  },
});
