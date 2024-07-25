import { RadialVector } from './types';
import { degToRad } from './utils';

export const drawWindVector = (
  canvas: HTMLCanvasElement | null,
  wind: RadialVector
) => {
  if (canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const [heading, speed] = wind;

    ctx.beginPath();
    // Position wind vector in the corner
    ctx.translate(50, 50);
    ctx.moveTo(0, 0);

    // Since headings are typically from north and norths should be up, subtract 90deg
    ctx.rotate(degToRad(heading - 90));
    ctx.lineTo(speed, 0);

    // Draw an arrow head for style
    ctx.rotate(-0.15);
    ctx.lineTo(speed * 0.8, 0);
    ctx.rotate(0.3);
    ctx.lineTo(speed * 0.8, 0);
    ctx.rotate(-0.15);
    ctx.lineTo(speed, 0);

    // Fill/stroke
    ctx.strokeStyle = '#fff';
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.fill();
  }
};
