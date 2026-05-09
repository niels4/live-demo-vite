/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import { playwright } from "@vitest/browser-playwright"
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import wtr from "vite-plugin-websocket-text-relay"

const allSourceFiles = ["src/**/*.{ts,tsx}", "scripts/**/*.{ts,tsx}"]
const browserTestFiles = "src/**/*.test.{ts,tsx}"
const nodeTestFiles = "scripts/**/*.test.{ts,tsx}"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    wtr()
  ],

  test: {
    coverage: {
      include: allSourceFiles,
      exclude: ["src/test/*.{ts,tsx}", "scripts/**/*.script.ts", ".local"],
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
