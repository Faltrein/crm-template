import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   async rewrites() {
    return [
      {
        source: "/login",
        destination: "/pages/user-handle/login",
      },
      {
        source: "/signup",
        destination: "/pages/user-handle/signup",
      },
      {
        source: "/confirmAccount",
        destination: "/pages/user-handle/confirm-acc",
      },
    ];
  },
};

export default nextConfig;
