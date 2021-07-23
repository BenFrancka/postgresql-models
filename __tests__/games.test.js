import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Game from '../lib/models/Game.js';



describe('game routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a game with POST', async () => {
    const massEffect = { title: 'mass effect', gameSystem: 'xbox', genre: 'rpg' };

    const res = await request(app)
      .post('/api/v1/games')
      .send(massEffect);
    
    expect(res.body).toEqual({
      id: '1',
      ...massEffect
    });
  });

  it('gets a game by id with GET', async () => {
    const massEffect = await Game.insert({ title: 'mass effect', gameSystem: 'xbox', genre: 'rpg' });

    const res = await request(app)
      .get(`/api/v1/games/${massEffect.id}`);
      
    
    expect(res.body).toEqual(massEffect);
  });
  

});
