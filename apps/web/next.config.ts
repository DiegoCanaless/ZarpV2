import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Permitimos SVG local (nuestro logo) con un CSP seguro
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
