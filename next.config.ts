import type { NextConfig } from "next";

const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath,
  assetPrefix: basePath,
  // skip strict mode
  reactStrictMode: false,
  images: {
    unoptimized: true,
    qualities: [75, 90],
  },
  env: {
    nextPublicBasePath: basePath,
    googleAnalyticsId: process.env.NODE_ENV === "production" ? process.env.GA_MEASUREMENT_ID : "",
  }
};

export default nextConfig;
