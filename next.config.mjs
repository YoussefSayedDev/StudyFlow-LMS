import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add domain images.pexels.com
  images: {
    remotePatterns: [
      {
        // Add host images.pexels.com, videos.pexels.com
        hostname: "**",
        protocol: "https",
      },
    ],
  },

  // Modify rewrites to avoid conflicts with API routes
  async rewrites() {
    return [
      {
        // Only rewrite paths that don't start with /api/proxy
        source: "/api/:path*",
        destination: "http://studyflow.runasp.net/:path*", // Proxy to backend
        has: [
          {
            type: 'header',
            key: 'x-use-rewrite',
            value: 'true',
          },
        ],
      },
    ];
  }
};

export default withNextIntl(nextConfig);