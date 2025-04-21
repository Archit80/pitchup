const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
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
    // after: true,
    // ppr: "incremental", // )
    // incrementalCacheHandlerPath: "incremental", // Example experimental feature
  },
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: "bottom-right",
  },
};

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);