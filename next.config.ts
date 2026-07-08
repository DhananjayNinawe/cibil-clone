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
      {
        protocol: "https",
        hostname: "www.cibil.com",
        port: "",
        pathname: "/contact-us/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "www.cibil.com",
        port: "",
        pathname: "/faq/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "www.cibil.com",
        port: "",
        pathname: "/content/dam/cibil/consumer/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "www.transunioncibil.com",
        port: "",
        pathname: "/content/dam/transunion-cibil/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/vi/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/vi_webp/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
