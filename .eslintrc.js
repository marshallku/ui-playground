module.exports = {
    root: true,
    // This tells ESLint to load the config from the package `eslint-config-marshallku`
    extends: ["marshallku"],
    settings: {
        next: {
            rootDir: ["apps/*/"],
        },
    },
};
