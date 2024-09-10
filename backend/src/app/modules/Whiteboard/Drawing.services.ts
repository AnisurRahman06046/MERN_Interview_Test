import { IDrawing } from './Drawing.interfaces';
import { DrawingModel } from './Drawing.schema';

// create a drawing
const createDrawing = async (payload: IDrawing) => {
  const result = await DrawingModel.create(payload);
  return result;
};

// retrieve all drawings
const getAllDrawings = async () => {
  const drawings = await DrawingModel.find();
  return drawings;
};

// retrieve a single drawing by id
const getDrawingById = async (id: string) => {
  const drawing = await DrawingModel.findById(id);
  return drawing;
};

// update a single drawing
const updateDrawing = async (id: string, payload: Partial<IDrawing>) => {
  const updatedDrawing = await DrawingModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedDrawing;
};

// delete a drawing
const deleteDrawing = async (id: string) => {
  const deletedDrawing = await DrawingModel.findByIdAndDelete(id);
  return deletedDrawing;
};
export const drawingServices = {
  createDrawing,
  getAllDrawings,
  getDrawingById,
  updateDrawing,
  deleteDrawing,
};
