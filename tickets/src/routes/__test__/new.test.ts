import request from 'supertest';
import { app } from '../../app';

it('has a route handler listening to /api/tickets for post requests', async () => {
	const reponse = await request(app).post('/api/tickets').send({});

	expect(reponse.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
	const reponse = await request(app).post('/api/tickets').send({});

	expect(reponse.status).toEqual(401);
});
