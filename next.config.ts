import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      { protocol: "https", hostname: "commons.wikimedia.org" },
      { protocol: "https", hostname: "media.fastly.sohohousedigital.com" },
      { protocol: "https", hostname: "thehoxton.com" },
      { protocol: "https", hostname: "www.memmohotels.com" },
      { protocol: "https", hostname: "www.bairroaltohotel.com" },
      { protocol: "https", hostname: "media.ffycdn.net" },
      { protocol: "https", hostname: "www.maisonsouquet.com" },
      { protocol: "https", hostname: "www.katikies.com" },
      { protocol: "https", hostname: "canaves.com" },
      { protocol: "https", hostname: "dreffui1gbt6t.cloudfront.net" },
    ],
  },
};

export default nextConfig;
