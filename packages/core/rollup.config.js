import { resolve } from "path";
import rollupResolve from "@rollup/plugin-node-resolve";
import image from "@rollup/plugin-image";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import typescript from "rollup-plugin-typescript2";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import pkg from "./package.json" assert { type: "json" };

const external = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})];

const options = [
    {
        input: "src/index.ts",
        output: [
            {
                file: pkg.types,
                format: "esm",
            },
        ],
        plugins: [dts()],
        external,
    },
    {
        input: "src/index.ts",
        output: [
            {
                dir: "dist",
                format: "esm",
                exports: "named",
                preserveModules: true,
                preserveModulesRoot: "src",
            },
        ],
        external,
        treeshake: {
            moduleSideEffects: false,
        },
        plugins: [
            peerDepsExternal(),
            image(),
            rollupResolve(),
            commonjs({
                include: /node_modules/,
            }),
            typescript({ useTsconfigDeclarationDir: true }),
            postcss({
                extract: false,
                modules: true,
                use: [
                    [
                        "sass",
                        {
                            data: '@import "styles/abstracts/_font.sass";',
                            includePaths: [resolve("./src/styles")],
                        },
                    ],
                ],
            }),
        ],
    },
];

export default options;
