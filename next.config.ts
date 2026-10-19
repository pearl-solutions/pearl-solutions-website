import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    // On exFAT drives macOS writes "._" sidecar files into Turbopack's on-disk cache and corrupts it.
    turbopackFileSystemCacheForDev: false,
    turbopackFileSystemCacheForBuild: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // On exFAT drives macOS writes "._" sidecar files into the image cache, which breaks it.
    // Set NEXT_IMAGE_UNOPTIMIZED=1 when running locally from such a drive.
    unoptimized: process.env.NEXT_IMAGE_UNOPTIMIZED === "1",
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
