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
};

export default withNextIntl(nextConfig);
