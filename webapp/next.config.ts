import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    BASE_API_URL: process.env.BASE_API_URL
  }
};

export default nextConfig;
