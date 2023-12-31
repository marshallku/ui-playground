import { resolve } from "path";

const STYLE_ROOT = resolve("../../packages/ui/src");

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
    stories: ["../stories/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)"],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    docs: {
        autodocs: true,
    },
    async viteFinal(config, { configType }) {
        return {
            ...config,
            resolve: {
                alias: [
                    {
                        find: "@ui",
                        replacement: resolve("../../packages/ui/src"),
                    },
                    {
                        find: "@dist",
                        replacement: resolve("../../packages/ui/dist"),
                    },
                    {
                        find: /#/,
                        replacement: `${resolve("../../packages/ui/src")}/`,
                    },
                    {
                        find: "@icon",
                        replacement: resolve("../../packages/icon/dist"),
                    },
                ],
            },
            define: {
                "process.env": {},
            },
            css: {
                postcss: null,
                preprocessorOptions: {
                    scss: {
                        additionalData: `
                            @import "${STYLE_ROOT}/styles/abstracts/_font.scss";
                            @import "${STYLE_ROOT}/theme/palette.scss";
                        `,
                    },
                },
            },
        };
    },
};

export default config;
