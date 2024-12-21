/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dmart.in",
      },
      {
        protocol: "https",
        hostname: "cdn.zeptonow.com",
      },
      {
        protocol: "https",
        hostname: "cdn.grofers.com",
      },
      {
        protocol: "https",
        hostname: "*.grofers.com",
      },
    ],
  },
};

export default nextConfig;
