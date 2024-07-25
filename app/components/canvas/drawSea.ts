export const drawSea = (canvas: HTMLCanvasElement | null) => {
  if (canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    // ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'lch(60 50 250)';
    ctx.fill();

    // Fake destination point
    ctx.beginPath();
    ctx.arc(100, 100, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'lch(60 50 30)';
    ctx.fill();
    ctx.strokeStyle = 'lch(100 0 30)';
    ctx.stroke();
  }
};
