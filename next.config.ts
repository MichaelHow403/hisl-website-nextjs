import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tell Turbopack the project root (silences the warning)
  turbopack: { root: "." },

  // Keep any flags you actually use here
  experimental: {
    optimizeCss: true
  }
};

export default nextConfig;
