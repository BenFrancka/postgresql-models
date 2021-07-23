import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
//import Beer from '../lib/models/Beer.js';

describe('beer routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a beer with POST', async () => {
    const pilsnerUrquell = { beerName: 'pilsner urquell', nationality: 'czech republic', variety: 'pilsner', alcoholPercentage: 4 };

    const res = await request(app)
      .post('/api/v1/beers')
      .send(pilsnerUrquell);
    
    expect(res.body).toEqual({
      id: '1',
      ...pilsnerUrquell
    });
  });



});
