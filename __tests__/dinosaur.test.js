import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('dinosaur routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a dinosaur using POST', async () => {
    const utahRaptor = {
      species: 'utahraptor',
      diet: 'carnivore',
      period: 'cretaceous'
    };
    const res = await request(app)
      .post('.api/v1/dinosaurs')
      .send(utahRaptor);

    expect(res.body).toEqual({
      id: '1',
      ...utahRaptor
    });
  });

});
