import { Router } from 'express';

import { drawingRoutes } from '../modules/Whiteboard/Drawing.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/drawings',
    route: drawingRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
