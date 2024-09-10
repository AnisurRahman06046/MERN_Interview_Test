import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHanlders from './app/middlewares/globalErrorHandlers';
import notFoundHandler from './app/middlewares/notFound';

const app: Application = express();
import routes from './app/routes';

import config from './app/config';

const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your front-end URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

app.use(globalErrorHanlders);
app.use(notFoundHandler);

export default app;
