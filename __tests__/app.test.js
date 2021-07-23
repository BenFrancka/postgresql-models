import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Dinosaur from '../lib/models/Dinosaur.js';

describe('dinosaur routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('creates a dinosaur using POST', async () => {
    const utahRaptor = {
      species: 'utahraptor',
      diet: 'carnivore',
      timePeriod: 'cretaceous'
    };
    const res = await request(app)
      .post('/api/v1/dinosaurs')
      .send(utahRaptor);

    expect(res.body).toEqual({
      id: '1',
      ...utahRaptor
    });
  });

  it('gets a dinosaur by id using GET', async () => {
    const utahRaptor = await Dinosaur.insert({
      species: 'utahraptor',
      diet: 'carnivore',
      timePeriod: 'cretaceous'
    });
    const res = await request(app)
      .get(`/api/v1/dinosaurs/${utahRaptor.id}`);
      

    expect(res.body).toEqual(utahRaptor);
  });


}); 
