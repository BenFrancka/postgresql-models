import { Router } from 'express';
import Dinosaur from '../models/Dinosaur.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const dino = await Dinosaur.insert(req.body);

      res.send(dino);
    } catch(err) {
      next(err);
    }
  });
