import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "minimagroup.nyc",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
