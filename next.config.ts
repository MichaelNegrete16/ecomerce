import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  env: {
    ECOMERCE_TOKEN: process.env.ECOMERCE_TOKEN,
    ECOMERCE_API_URL: process.env.ECOMERCE_API_URL,
  },
  devIndicators: {
    position: "bottom-left",
  },
};

export default nextConfig;
