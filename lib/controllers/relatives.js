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
  });
