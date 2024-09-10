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
  const drawings = await drawingServices.getAllDrawings();
  sendApiResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All drawings fetched successfully',
    data: drawings,
  });
});

// fetch a single drawing
const getDrawingById = catchAsync(async (req, res) => {
  const drawing = await drawingServices.getDrawingById(req.params.id);
  //   if (!drawing) {
  //     return sendApiResponse(res, {
  //       statusCode: httpStatus.NOT_FOUND,
  //       success: false,
  //       message: 'Drawing not found',
  //     });
  //   }
  sendApiResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Drawing fetched successfully',
    data: drawing,
  });
});

// update a drawing
const updateDrawing = catchAsync(async (req, res) => {
  const updatedDrawing = await drawingServices.updateDrawing(
    req.params.id,
    req.body,
  );
  // if (!updatedDrawing) {
  //   return sendApiResponse(res, {
  //     statusCode: httpStatus.NOT_FOUND,
  //     success: false,
  //     message: 'Drawing not found',
  //   });
  // }
  sendApiResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Drawing updated successfully',
    data: updatedDrawing,
  });
});

// delete a drawing
const deleteDrawing = catchAsync(async (req, res) => {
  const deletedDrawing = await drawingServices.deleteDrawing(req.params.id);
  // if (!deletedDrawing) {
  //   return sendApiResponse(res, {
  //     statusCode: httpStatus.NOT_FOUND,
  //     success: false,
  //     message: 'Drawing not found',
  //   });
  // }
  sendApiResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Drawing deleted successfully',
  });
});
export const drawingControllers = {
  createDrawing,
  getAllDrawings,
  getDrawingById,
  updateDrawing,
  deleteDrawing,
};
