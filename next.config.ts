import { withSaltyCss } from "@salty-css/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md/,
      use: "raw-loader",
    });
    return config;
  },
};

export default withSaltyCss(nextConfig);
