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

export default nextConfig;
