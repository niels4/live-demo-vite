/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react-swc"
import { playwright } from "@vitest/browser-playwright"
import { defineConfig } from "vite"
import websocketTextRelay from "vite-plugin-websocket-text-relay"

const allSourceFiles = ["src/**/*.{ts,tsx}", "scripts/**/*.{ts,tsx}"]
const browserTestFiles = "src/**/*.test.{ts,tsx}"
const nodeTestFiles = "scripts/**/*.test.{ts,tsx}"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), websocketTextRelay()],

  test: {
    coverage: {
      include: allSourceFiles,
      exclude: ["src/test/*.{ts,tsx}", "scripts/**/*.script.ts"],
    },

    projects: [
      {
        test: {
          name: "browser",
          include: [browserTestFiles],
          setupFiles: ["src/test/browser-setup.ts"],
          browser: {
            provider: playwright(),
            enabled: true,
            headless: true,
            instances: [{ browser: "chromium" }],
          },
        },
      },

      {
        test: {
          name: "jsdom",
          include: [browserTestFiles, nodeTestFiles],
          setupFiles: ["src/test/jsdom-setup.ts"],
          environment: "jsdom",
        },
      },
    ],
  },
})
