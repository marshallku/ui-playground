const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ["@marshallku/ui"],
    output: "standalone",
    experimental: {
        outputFileTracingRoot: path.join(__dirname, "../../"),
    },
    sassOptions: {
        prependData: '@import "@marshallku/ui/dist/palette.scss";',
    },
};

module.exports = nextConfig;
