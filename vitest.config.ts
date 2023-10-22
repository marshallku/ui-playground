/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "../../setupTests.js",
        css: true,
        ...(process.env.CI && {
            minThreads: 4,
            maxThreads: 4,
        }),
    },
});
