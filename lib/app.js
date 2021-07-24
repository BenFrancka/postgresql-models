import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import dinosaurController from './controllers/dinosaurs.js';
import relativeController from './controllers/relatives.js';
import beerController from './controllers/beers.js';
import bookController from './controllers/books.js';
import gameController from './controllers/games.js';

const app = express();

app.use(express.json());

app.use('/api/v1/dinosaurs', dinosaurController);
app.use('/api/v1/relatives', relativeController);
app.use('/api/v1/beers', beerController);
app.use('/api/v1/books', bookController);
app.use('/api/v1/games', gameController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
