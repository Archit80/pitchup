import type { NextConfig } from "next";
import {unstable_after as after} from 'next/server';

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
    after: true,
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
