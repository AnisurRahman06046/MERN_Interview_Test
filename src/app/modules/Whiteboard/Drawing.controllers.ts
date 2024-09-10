import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendApiResponse from '../../utils/sendApiResponse';
import { drawingServices } from './Drawing.services';

const createDrawing = catchAsync(async (req, res) => {
  const result = await drawingServices.createDrawing(req.body);
  sendApiResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Drawing is created successfully',
    data: result,
  });
});

// fetch all drawings
const getAllDrawings = catchAsync(async (req, res) => {
  const result = await drawingServices.getAllDrawings();
  sendApiResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All drawings fetched successfully',
    data: result,
  });
});

// fetch a single drawing
const getDrawingById = catchAsync(async (req, res) => {
  const result = await drawingServices.getDrawingById(req.params.id);

  sendApiResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Drawing fetched successfully',
    data: result,
  });
});

// update a drawing
const updateDrawing = catchAsync(async (req, res) => {
  const result = await drawingServices.updateDrawing(
    req.params.id,
    req.body,
  );

  sendApiResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Drawing updated successfully',
    data: result,
  });
});

// delete a drawing
const deleteDrawing = catchAsync(async (req, res) => {
  const result = await drawingServices.deleteDrawing(req.params.id);

  sendApiResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Drawing deleted successfully',
    data:result
  });
});
export const drawingControllers = {
  createDrawing,
  getAllDrawings,
  getDrawingById,
  updateDrawing,
  deleteDrawing,
};
