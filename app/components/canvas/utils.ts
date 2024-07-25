import { RadialVector, Vector } from './types';

// Utils
export const degToRad = (deg: number) => deg * (Math.PI / 180);
export const radToDeg = (rad: number) => rad * (180 / Math.PI);
export const lerp = (start: number, end: number, delta: number) =>
  (1 - delta) * start + delta * end;

/**
 * Converts a RadialVector to a Vector
 * @param v - The RadialVector to convert [degrees, length]
 * @returns The converted Vector [x, y]
 */
export const radialToVector = (v: RadialVector): Vector => {
  const [deg, length] = v;
  const rad = ((deg - 90) * Math.PI) / 180;

  const x = length * Math.cos(rad);
  const y = length * Math.sin(rad);

  return [x, y];
};

/**
 * Converts a Vector to a RadialVector
 * @param v - The Vector to convert [x, y]
 * @returns The converted RadialVector [degrees, length]
 */
export const vectorToRadial = (v: Vector): RadialVector => {
  const [x, y] = v;
  const length = Math.sqrt(x * x + y * y);

  const rad = Math.atan2(y, x);
  const deg = (rad * 180) / Math.PI;

  return [deg, length];
};
