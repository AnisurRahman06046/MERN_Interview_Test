import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHanlders from './app/middlewares/globalErrorHandlers';
import notFoundHandler from './app/middlewares/notFound';

const app: Application = express();
import routes from './app/routes';

import config from './app/config';

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

app.use(globalErrorHanlders);
app.use(notFoundHandler);

export default app;
