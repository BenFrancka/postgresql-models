import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
//import Book from '../lib/models/Book.js';


describe('book routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a book with POST', async () => {
    const neuromancer = { title: 'neuromancer', authorName: 'william gibson', pageCount: 271 };

    const res = await request(app)
      .post('/api/v1/books')
      .send(neuromancer);
    
    expect(res.body).toEqual({
      id: '1',
      ...neuromancer
    });
  });

});
