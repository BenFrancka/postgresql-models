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
  })
  .get('/', async (req, res, next) => {
    try {
      const relatives = await Relative.getAll();

      res.send(relatives);
    } catch(err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { firstName, relation, numberOfSiblings, age } = req.body;

      const updatedRelative = await Relative.updateById(id, { firstName, relation, numberOfSiblings, age });

      res.send(updatedRelative);
    } catch(err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const relative = await Relative.deleteById(id);


      res.send({
        message: `you should call more often, ${relative.firstName} was deleted!`
      });
    } catch(err) {
      next(err);
    }
  });
