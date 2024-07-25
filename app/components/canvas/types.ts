export type RadialVector = [angleInDegrees: number, length: number];
export type Vector = [x: number, y: number];

export type ShipState = {
  course: RadialVector;
  position: Vector;
};
