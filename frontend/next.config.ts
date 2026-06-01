import type { NextConfig } from "next";
import path from "path";

const backendUrl =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:4000";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, ".."),
  },
  async rewrites() {
    const base = backendUrl.replace(/\/$/, "");
    return [
      {
        source: "/api/backend/:path*",
        destination: `${base}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
