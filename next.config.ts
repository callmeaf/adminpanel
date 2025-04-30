import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: process.env.REACT_RESTRICT_MODE === "true",
  async rewrites() {
    return [
      {
        source: `${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/:path*`,
        destination: `${process.env.API_URL?.replace("/admin/v1", "")}/:path*`,
      },
      {
        source: `${process.env.NEXT_PUBLIC_LOCAL_BACKEND_API_URL}/:path*`,
        destination: `${process.env.API_URL}/:path*`,
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withNextIntl(nextConfig);
