import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server build — required for the Docker image.
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
