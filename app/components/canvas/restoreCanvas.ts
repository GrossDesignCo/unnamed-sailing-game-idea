export const restoreCanvas = (canvas: HTMLCanvasElement | null) => {
  if (canvas) {
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Clear previous visuals
    ctx.restore();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
  }
};
