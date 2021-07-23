import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Beer from '../lib/models/Beer.js';
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

  it('gets a beer by id with GET', async () => {
    const pilsnerUrquell = await Beer.insert({ beerName: 'pilsner urquell', nationality: 'czech republic', variety: 'pilsner', alcoholPercentage: 4 });

    const res = await request(app)
      .get(`/api/v1/beers/${pilsnerUrquell.id}`);
      
    
    expect(res.body).toEqual(pilsnerUrquell);
  });

  it('gets all beers with GET', async () => {
    const pilsnerUrquell = await Beer.insert({ beerName: 'pilsner urquell', nationality: 'czech republic', variety: 'pilsner', alcoholPercentage: 4 });

    const guiness = await Beer.insert({ beerName: 'guiness', nationality: 'ireland', variety: 'stout', alcoholPercentage: 4 });

    const oldRasputin = await Beer.insert({ beerName: 'old rasputin imperial stout', nationality: 'russia', variety: 'stout', alcoholPercentage: 9 });

    const res = await request(app)
      .get('/api/v1/beers');
      
    
    expect(res.body).toEqual([pilsnerUrquell, guiness, oldRasputin]);
  });

  it('updates a beer by id with PUT', async () => {
    const pilsnerUrquell = await Beer.insert({ beerName: 'pilsner urquell', nationality: 'czech republic', variety: 'pilsner', alcoholPercentage: 4 });

    const res = await request(app)
      .put(`/api/v1/beers/${pilsnerUrquell.id}`)
      .send({ nationality: 'czech' });
      
    
    expect(res.body).toEqual({ ...pilsnerUrquell, nationality: 'czech' });
  });


});
