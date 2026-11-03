import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/downloads/minipick.apk",
        destination: "/api/download/apk",
        permanent: false,
      },
      {
        source: "/downloads/rovy-store.apk",
        destination: "/api/download/apk",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
