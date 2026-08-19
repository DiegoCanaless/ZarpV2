import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["shared"],
  images: {
    // Permitimos SVG local (nuestro logo) con un CSP seguro
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
