import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import dinosaurController from './controllers/dinosaurs.js';
import relativeController from './controllers/realtives.js';

const app = express();

app.use(express.json());

app.use('/api/v1/dinosaurs', dinosaurController);
app.use('/ap1/v1/relations', relativeController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
