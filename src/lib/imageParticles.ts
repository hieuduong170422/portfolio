export type ImageParticlePoint = {
  /** Normalized 0..1 position within the image bounds. */
  x: number;
  y: number;
  color: string;
};

/** Downsamples an image to a small grid and returns one particle target per opaque pixel. */
export function sampleImageToParticles(
  src: string,
  maxPoints: number
): Promise<ImageParticlePoint[]> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      const aspect = img.naturalWidth / img.naturalHeight || 1;
      const cols = Math.max(1, Math.round(Math.sqrt(maxPoints * aspect)));
      const rows = Math.max(1, Math.round(maxPoints / cols));

      const canvas = document.createElement("canvas");
      canvas.width = cols;
      canvas.height = rows;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) {
        reject(new Error("2D canvas context unavailable"));
        return;
      }
      ctx.drawImage(img, 0, 0, cols, rows);

      const { data } = ctx.getImageData(0, 0, cols, rows);
      const points: ImageParticlePoint[] = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = (row * cols + col) * 4;
          const a = data[idx + 3];
          if (a < 64) continue;
          points.push({
            x: (col + 0.5) / cols,
            y: (row + 0.5) / rows,
            color: `rgb(${data[idx]},${data[idx + 1]},${data[idx + 2]})`,
          });
        }
      }
      resolve(points);
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}
