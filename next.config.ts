import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow large image uploads (up to 50 MB) through the middleware proxy
  experimental: {
    proxyClientMaxBodySize: 52428800, // 50 MB in bytes
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
