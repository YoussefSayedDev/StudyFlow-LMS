/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add domin images.pexels.com
  images: {
    remotePatterns: [
      {
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
