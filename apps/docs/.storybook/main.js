import { resolve } from "path";

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
    stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    async viteFinal(config, { configType }) {
        return {
            ...config,
            resolve: {
                alias: [
                    {
                        find: "@core",
                        replacement: resolve("../../packages/core/src"),
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
        };
    },
};

export default config;
