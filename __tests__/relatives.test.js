import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Relative from '../lib/models/Relative.js';

describe('relatives routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a relative with POST', async () => {
    const ruth = { firstName: 'ruth', relation: 'grandmother', numberOfSiblings: 3, age: 94 };

    const res = await request(app)
      .post('/api/v1/relatives')
      .send(ruth);

    expect(res.body).toEqual({
      id: '1',
      ...ruth
    });
  });

  it('gets a relative by id with GET', async () => {
    const ruth = await Relative.insert({
      firstName: 'ruth',
      relation: 'grandmother',
      numberOfSiblings: 3,
      age: 94
    });

    const res = await request(app)
      .get(`/api/v1/relatives/${ruth.id}`);
      

    expect(res.body).toEqual(ruth);
  });

  it('gets all relatives with GET', async () => {
    const ruth = await Relative.insert({
      firstName: 'ruth',
      relation: 'grandmother',
      numberOfSiblings: 3,
      age: 94
    });
    const martha = await Relative.insert({
      firstName: 'martha',
      relation: 'aunt',
      numberOfSiblings: 4,
      age: 48
    });
    const sarah = await Relative.insert({
      firstName: 'sarah',
      relation: 'sister',
      numberOfSiblings: 1,
      age: 31
    });

    const res = await request(app)
      .get('/api/v1/relatives/');
      

    expect(res.body).toEqual([ruth, martha, sarah]);
  });

  it('updates a relative by id with PUT', async () => {
    const ruth = await Relative.insert({
      firstName: 'ruth',
      relation: 'grandmother',
      numberOfSiblings: 3,
      age: 94
    });

    const res = await request(app)
      .put(`/api/v1/relatives/${ruth.id}`)
      .send({ age: 95 });
      

    expect(res.body).toEqual({ ...ruth, age: 95 });
  });



});
