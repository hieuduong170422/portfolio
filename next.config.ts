import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Phone previews need sizes between 256 and 640px, especially at 2x/3x DPR.
    imageSizes: [32, 48, 64, 96, 128, 160, 192, 256, 288, 320, 384, 480, 512],
  },
};

export default nextConfig;
