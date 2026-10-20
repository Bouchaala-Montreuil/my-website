import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    host: true,
    allowedHosts: true,
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  build: {
    outDir: "dist",
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    target: "es2020",
  },
  ssr: {
    noExternal: [],
  },
});
