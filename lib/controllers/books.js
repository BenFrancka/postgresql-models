import { Router } from 'express';
import Book from '../models/Book.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const book = await Book.insert(req.body);

      res.send(book);
    } catch(err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const book = await Book.getById(id);

      res.send(book);
    } catch(err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const books = await Book.getAll();

      res.send(books);
    } catch(err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, authorName, pageCount } = req.body;

      const updatedBook = await Book.updateById(id, { title, authorName, pageCount });

      res.send(updatedBook);
    } catch(err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const book = await Book.getById(id);

      res.send({
        message: `you should really keep track of your books: ${book.title} has been deleted`
      });
    } catch(err) {
      next(err);
    }
  });
