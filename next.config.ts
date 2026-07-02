import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.cibil.com",
        port: "",
        pathname: "/content/dam/cibil/content-fragments/header/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
