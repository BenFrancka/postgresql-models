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
  })
  .get('/', async (req, res, next) => {
    try {
      const beers = await Beer.getAll();

      res.send(beers);
    } catch(err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { beerName, nationality, variety, alcoholPercentage } = req.body;

      const updatedBeer = await Beer.updateById(id, { beerName, nationality, variety, alcoholPercentage });

      res.send(updatedBeer);
    } catch(err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const beer = await Beer.getById(id);

      res.send({
        message: `everything in moderation: ${beer.beerName} has been deleted`
      });
    } catch(err) {
      next(err);
    }
  });
