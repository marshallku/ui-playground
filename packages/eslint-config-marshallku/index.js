module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "next",
        "turbo",
        "eslint-config-prettier",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
    ],
    plugins: ["@typescript-eslint", "eslint-plugin-prettier"],
    settings: { react: { version: "detect" } },
    rules: {
        "prettier/prettier": "error",
        "no-implicit-coercion": "error",
        "no-console": "error",

        "@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }],
        "@typescript-eslint/naming-convention": [
            "error",
            { format: ["camelCase", "PascalCase"], selector: "function" },
            { format: ["PascalCase"], selector: ["interface", "typeAlias"] },
            {
                format: ["camelCase", "PascalCase", "UPPER_CASE"],
                selector: "variable",
                leadingUnderscore: "allow",
            },
        ],

        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "react/display-name": "off",

        "@next/next/no-html-link-for-pages": "off",
    },
    parserOptions: {
        ecmaFeatures: { jsx: true },
        jsx: true,
        useJSXTextNode: true,
        babelOptions: {
            presets: [require.resolve("next/babel")],
        },
    },
};
