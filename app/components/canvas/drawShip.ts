import { RadialVector, ShipState } from './types';
import { degToRad, radialToVector } from './utils';

export const drawShip = (
  canvas: HTMLCanvasElement | null,
  ship: ShipState,
  wind: RadialVector,
  sun: RadialVector
) => {
  if (canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { course, position } = ship;
    const [heading] = course;

    // Counteract ship rotation to get relative wind direction/speed
    const [windHeading, windSpeed] = wind;
    const [windX, windY] = radialToVector([windHeading - heading, windSpeed]);
    const [sunHeading, sunDistance] = sun;
    const [sunX, sunY] = radialToVector([sunHeading - heading, sunDistance]);

    ctx.resetTransform();

    ctx.translate(
      canvas.width / 2 - position[0],
      canvas.height / 2 - position[1]
    );

    // DEBUG: Magnify for drawing :)
    // ctx.scale(4,4);

    ctx.rotate(degToRad(heading));

    const drawHullPath = () => {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(5, 5, 15, 40, 5, 60);
      ctx.lineTo(0, 0);
      ctx.bezierCurveTo(-5, 5, -15, 40, -5, 60);
      ctx.lineTo(5, 60);
      ctx.closePath();
    };

    // Shadow on the water
    ctx.translate(-sunX, -sunY);
    drawHullPath();
    ctx.translate(sunX, sunY);

    ctx.fillStyle = 'lch(0 0 0 / 10%)';
    ctx.fill();

    // Outer shell in white
    drawHullPath();

    ctx.strokeStyle = '#fff';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.fill();

    // Inner deck in tan/wood
    ctx.beginPath();
    ctx.moveTo(0, 5);
    ctx.bezierCurveTo(6, 6, 14, 50, 2.5, 62);
    ctx.moveTo(0, 5);
    ctx.bezierCurveTo(-6, 6, -14, 50, -2.5, 62);
    ctx.lineTo(2.5, 62);
    ctx.closePath();

    ctx.strokeStyle = 'lch(60 30 55)';
    ctx.stroke();
    ctx.fillStyle = 'lch(60 30 55)';
    ctx.fill();

    const drawSailPath = () => {
      ctx.beginPath();
      ctx.moveTo(0, -5);
      // Bottom edge
      ctx.bezierCurveTo(windX, 6 + windY, windX, 20 + windY, -15, 45);
      // Back vertical edge
      ctx.bezierCurveTo(
        -7.5 + windX / 2,
        32.5 + windY / 2,
        windX / 2,
        20 + windY / 2,
        0,
        20
      );
      // Front vertical edge
      ctx.bezierCurveTo(
        windX / 2,
        20 + windY / 2,
        windX / 2,
        7.5 + windY / 2,
        0,
        -5
      );
      ctx.closePath();
    };

    // Sail shadow
    ctx.translate(-sunX, -sunY);
    drawSailPath();
    ctx.translate(sunX, sunY);

    ctx.fillStyle = 'lch(0 0 0 / 10%)';
    ctx.fill();

    // Lines for rigging?
    ctx.beginPath();
    ctx.moveTo(0, -5);
    ctx.lineTo(0, 20);
    ctx.lineTo(-15, 45);
    ctx.strokeStyle = 'lch(50 30 55)';
    ctx.stroke();

    // Sail in white
    drawSailPath();

    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.stroke();

    // DEBUG: Wind representation (red line)
    // ctx.moveTo(0, 0);
    // ctx.lineTo(x, y);
    // ctx.strokeStyle = 'red';
    // ctx.stroke();
  }
};
