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





});
