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

  it('gets all dinosaurs using GET', async () => {
    const utahRaptor = await Dinosaur.insert({
      species: 'utahraptor',
      diet: 'carnivore',
      timePeriod: 'cretaceous'
    });
    const corythosaurus = await Dinosaur.insert({
      species: 'corythosaurus',
      diet: 'herbivore',
      timePeriod: 'cretaceous'
    });
    const spinosaurus = await Dinosaur.insert({
      species: 'spinosaurus',
      diet: 'carnivore',
      timePeriod: 'cretaceous'
    });
    const res = await request(app)
      .get('/api/v1/dinosaurs/');
      

    expect(res.body).toEqual([utahRaptor, corythosaurus, spinosaurus]);
  });

  it('updates a dinosaur by id using PUT', async () => {
    const utahRaptor = await Dinosaur.insert({
      species: 'utahraptor',
      diet: 'carnivore',
      timePeriod: 'cretaceous'
    });
    const res = await request(app)
      .put(`/api/v1/dinosaurs/${utahRaptor.id}`)
      .send({ timePeriod: 'upper cretaceous' });
      

    expect(res.body).toEqual({ ...utahRaptor, timePeriod: 'upper cretaceous' });
  });

  it('deletes a dinosaur by id using DELETE', async () => {
    const utahRaptor = await Dinosaur.insert({
      species: 'utahraptor',
      diet: 'carnivore',
      timePeriod: 'cretaceous'
    });
    const res = await request(app)
      .delete(`/api/v1/dinosaurs/${utahRaptor.id}`);
      
    expect(res.body).toEqual({ message: `too late, the asteroid hit and ${utahRaptor.species} is gone forever` });
  });
}); 
