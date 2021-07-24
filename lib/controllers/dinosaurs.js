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
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { species, diet, timePeriod } = req.body;

      const updatedDinosaur = await Dinosaur.updateById(id, { species, diet, timePeriod });

      res.send(updatedDinosaur);
    } catch(err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const dinosaur = await Dinosaur.deleteById(id);

      res.send({
        message: `too late, the asteroid hit and ${dinosaur.species} is gone forever`
      });

    } catch(err) {
      next(err);
    }
  });
