import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the provided id does not exit', async () => {
	const id = new mongoose.Types.ObjectId().toHexString();
	await request(app)
		.put(`/api/tickets/${id}`)
		.set('Cookie', signup())
		.send({
			title: 'dsfdsfsd',
			price: 20,
		})
		.expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
	const id = new mongoose.Types.ObjectId().toHexString();
	await request(app)
		.put(`/api/tickets/${id}`)
		.send({
			title: 'dsfdsfsd',
			price: 20,
		})
		.expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
	const response = await request(app)
		.post(`/api/tickets`)
		.set('Cookie', signup())
		.send({
			title: 'dsfdsfsd',
			price: 20,
		});

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', signup())
		.send({
			title: 'sdfsdf',
			price: 1000,
		})
		.expect(401);
});

it('returns a 400 if the user provide a invalid title or price', async () => {
	const cookie = signup();

	const response = await request(app)
		.post(`/api/tickets`)
		.set('Cookie', cookie)
		.send({
			title: 'dsfdsfsd',
			price: 20,
		});

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({
			title: '',
			price: 20,
		})
		.expect(400);
});

it('updates the ticket provided valid inputs', async () => {
	const cookie = signup();
	const title = 'sdfdsfdsfds';
	const price = 100;

	const response = await request(app)
		.post(`/api/tickets`)
		.set('Cookie', cookie)
		.send({
			title: 'dsfdsfsd',
			price: 20,
		});

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({
			title,
			price,
		})
		.expect(200);

	const ticketResponse = await request(app)
		.get(`/api/tickets/${response.body.id}`)
		.send();

	expect(ticketResponse.body.title).toEqual(title);
	expect(ticketResponse.body.price).toEqual(price);
});
