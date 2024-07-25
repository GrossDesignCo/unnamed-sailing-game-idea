'use client';
import { useRef, useEffect } from 'react';
import { resizeCanvas } from './resizeCanvas';
import { drawSea } from './drawSea';
import styles from './canvas.module.css';
import { restoreCanvas } from './restoreCanvas';
import { drawWindVector } from './drawWindVector';
import { RadialVector, ShipState } from './types';
import { drawShip } from './drawShip';

export default function Canvas() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvas.current) {
      let wind: RadialVector = [280, 30];
      let sun: RadialVector = [100, 10];
      let ship: ShipState = {
        course: [30, 0],
        position: [0, 0],
      };

      const render = () => {
        restoreCanvas(canvas.current);
        drawSea(canvas.current);
        drawWindVector(canvas.current, wind);
        drawShip(canvas.current, ship, wind, sun);
      };

      render();

      const play = () => {
        render();
        // Randomly adjust wind
        wind[0] = wind[0] + Math.random() - 0.5;
        wind[1] = wind[1] + Math.random() - 0.5;

        // Adjust boat's position based on wind (update to based on wind + sail + rudder later)
        ship.position[0] = ship.position[0] + wind[0] / 100;
        ship.position[1] = ship.position[1] + wind[1] / 100;
        // Handle keys

        requestAnimationFrame(play);
      };

      play();

      // Handle window resizing & re-render
      const cleanup = resizeCanvas(canvas.current, render);

      return () => {
        cleanup?.();
      };
    }
    // }, [canvas]);
  }); // remove dep for now to always re-render canvas on HMR

  return (
    <>
      <canvas ref={canvas} className={styles.canvas} width="100" height="100" />
    </>
  );
}
