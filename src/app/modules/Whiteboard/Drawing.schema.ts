import { model, Schema } from 'mongoose';
import { IDrawing, ILine, IShape, IText } from './Drawing.interfaces';

// Line sub schema
const LineSchema = new Schema<ILine>({
  startX: { type: Number, required: true },
  startY: { type: Number, required: true },
  endX: { type: Number, required: true },
  endY: { type: Number, required: true },
  color: { type: String, required: true },
  width: { type: Number, required: true },
});

// shape sub schema
const ShapeSchema = new Schema<IShape>({
  type: { type: String, required: true }, // "rectangle" or "circle"
  startX: { type: Number, required: true },
  startY: { type: Number, required: true },
  endX: { type: Number }, // Only for rectangles
  endY: { type: Number }, // Only for rectangles
  radius: { type: Number }, // Only for circles
  color: { type: String, required: true },
  borderWidth: { type: Number },
});

// sub schema for text anotation
const TextAnnotationSchema = new Schema<IText>({
  text: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  fontSize: { type: Number, required: true },
  color: { type: String, required: true },
});

// Main Drawing Schema
const drawingSchema = new Schema<IDrawing>(
  {
    title: { type: String, required: true },
    lines: [LineSchema],
    shapes: [ShapeSchema],
    textAnnotations: [TextAnnotationSchema],
  },
  { timestamps: true },
);

export const DrawingModel = model<IDrawing>('Drawing', drawingSchema);
