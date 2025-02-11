import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add domin images.pexels.com
  images: {
    remotePatterns: [
      {
        // Add host images.pexels.com, videos.pexels.com
        hostname: "**",
        protocol: "https",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://studyflow.runasp.net/:path*", // Proxy to backend
      },
    ];
  }
};

export default withNextIntl(nextConfig);
