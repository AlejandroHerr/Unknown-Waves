export const generateNoise = (amplitude: number, noiseFactor: number) =>
  (amplitude / noiseFactor) * (Math.random() - 1 / 2);
