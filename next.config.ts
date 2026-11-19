import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All photography will be self-hosted in /public/images. Only 90 is allowed, so every image (even without a quality prop) is served at 90.
    qualities: [90],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Old VIVUM routes that lived on the AYUSH site (see docs/SITEMAP.md → redirect matrix).
    // Temporary until the final domain strategy is approved.
    return [
      { source: "/vivum", destination: "/", permanent: false },
      { source: "/vivum/consulting", destination: "/consulting", permanent: false },
      { source: "/vivum/recruitment", destination: "/workforce", permanent: false },
    ];
  },
};

export default nextConfig;
