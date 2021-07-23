import { Router } from 'express';
import Relative from '../models/Relative.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const relative = await Relative.insert(req.body);

      res.send(relative);
    } catch(err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const relative = await Relative.getById(id);

      res.send(relative);
    } catch(err) {
      next(err);
    }
  });
