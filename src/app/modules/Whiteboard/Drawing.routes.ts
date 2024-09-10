import { Router } from 'express';
import { drawingControllers } from './Drawing.controllers';

const router = Router();

router.post('/create', drawingControllers.createDrawing);
router.get('/', drawingControllers.getAllDrawings);
router.get('/drawing/:id', drawingControllers.getDrawingById);
router.patch('/drawing/:id', drawingControllers.updateDrawing);
router.delete('/delete/:id', drawingControllers.deleteDrawing);

export const drawingRoutes = router;
