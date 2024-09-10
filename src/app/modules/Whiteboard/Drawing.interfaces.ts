export type ILine = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  width: number;
};

export type IShape = {
  type: string; 
  startX: number;
  startY: number;
  endX?: number; // Only for rectangle, not used in circles
  endY?: number; // Only for rectangle
  radius?: number; // Only for circle
  color: string;
  borderWidth?: number;
};

export type IText = {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
};

export type IDrawing = {
  title: string;
  lines: ILine[];
  shapes: IShape[];
  textAnnotations: IText[];
};
