import { Router } from 'express';
import Dinosaur from '../models/Dinosaur.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const dinosaur = await Dinosaur.insert(req.body);

      res.send(dinosaur);
    } catch(err) {
      next(err);
    }
  });
