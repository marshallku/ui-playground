const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ["@marshallku/ui"],
    output: "standalone",
    experimental: {
        outputFileTracingRoot: path.join(__dirname, "../../"),
    },
};

module.exports = nextConfig;
