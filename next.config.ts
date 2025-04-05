import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  experimental: {
    // ppr: "incremental", // )
    // incrementalCacheHandlerPath: "incremental", // Example experimental feature
    },
  devIndicators: {
      buildActivity: true,
      buildActivityPosition: "bottom-right",
      appIsrStatus: true,
    },

};

export default nextConfig;
