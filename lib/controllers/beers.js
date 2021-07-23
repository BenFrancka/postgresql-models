import { Router } from 'express';
import Beer from '../models/Beer.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const beer = await Beer.insert(req.body);

      res.send(beer);
    } catch(err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const beer = await Beer.getById(id);

      res.send(beer);
    } catch(err) {
      next(err);
    }
  });
