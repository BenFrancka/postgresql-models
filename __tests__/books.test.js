import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Book from '../lib/models/Book.js';
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

  it('gets a book by id with GET', async () => {
    const neuromancer = await Book.insert({ title: 'neuromancer', authorName: 'william gibson', pageCount: 271 });

    const res = await request(app)
      .get(`/api/v1/books/${neuromancer.id}`);
      
    
    expect(res.body).toEqual(neuromancer);
  });

  it('gets all books with GET', async () => {
    const neuromancer = await Book.insert({ title: 'neuromancer', authorName: 'william gibson', pageCount: 271 });

    const leviathanWakes = await Book.insert({ title: 'leviathan wakes', authorName: 'james s.a. corey', pageCount: 561 });

    const theHobbit = await Book.insert({ title: 'the hobbit', authorName: 'j.r.r. tolkien', pageCount: 310 });

    

    const res = await request(app)
      .get('/api/v1/books');
      
    
    expect(res.body).toEqual([neuromancer, leviathanWakes, theHobbit]);
  });

  it('updates a book by id with PUT', async () => {
    const neuromancer = await Book.insert({ title: 'neuromancer', authorName: 'william gibson', pageCount: 271 });

    const res = await request(app)
      .put(`/api/v1/books/${neuromancer.id}`)
      .send({ title: 'mona lisa overdrive' });
      
    
    expect(res.body).toEqual({ ...neuromancer, title: 'mona lisa overdrive' });
  });

});
