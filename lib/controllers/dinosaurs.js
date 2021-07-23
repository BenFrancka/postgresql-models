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
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const dinosaur = await Dinosaur.getById(id);

      res.send(dinosaur);
    } catch(err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const dinosaur = await Dinosaur.getAll();

      res.send(dinosaur);
    } catch(err) {
      next(err);
    }
  });
