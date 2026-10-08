import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Phone previews need sizes between 256 and 640px, especially at 2x/3x DPR.
    imageSizes: [32, 48, 64, 96, 128, 160, 192, 256, 288, 320, 384, 480, 512],
    // UI screenshots are mostly text; 75 leaves visible artifacts, so every image is served at 90.
    qualities: [90],
    // Keep optimized images for 31 days on the CDN and in browsers (default is 4 hours).
    // There is no purge: when replacing a screenshot, give the file a new name.
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
