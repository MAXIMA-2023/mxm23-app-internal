/** @type {import('next').NextConfig} */

const withNextEnv = require("next-env");
const dotenv = require("dotenv");
const webpack = require("webpack");

dotenv.config();

const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

module.exports = withNextEnv({
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));

    return config;
  },
});

module.exports = nextConfig;
