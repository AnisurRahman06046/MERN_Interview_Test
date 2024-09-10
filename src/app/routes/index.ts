import { Router } from 'express';
import { authRoutes } from '../modules/Auth/Auth.routes';
import { drawingRoutes } from '../modules/Whiteboard/Drawing.routes';


const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/drawings',
    route: drawingRoutes,
  },

];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
