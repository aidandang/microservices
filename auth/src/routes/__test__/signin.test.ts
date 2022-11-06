import { response } from 'express';
import request from 'supertest';
import { app } from '../../app';

interface Body {
	email?: string;
	password?: string;
}

const signupReq = () => {
	return request(app)
		.post('/api/users/signup')
		.send({ email: 'test@email.com', password: '12345678' })
		.expect(201);
};

const signinReq = (statusCode: number, body: Body) => {
	return request(app).post('/api/users/signin').send(body).expect(statusCode);
};

it('fails when a email that does not exist is supplied', async () => {
	const email = 'test@email.com';
	const password = 'passsword';
	const statusCode = 400;

	await signinReq(statusCode, { email, password }).expect(statusCode);
});

it('fails when an incorrect password is supplied', async () => {
	const email = 'test@email.com';
	const password = '!12345678';
	const statusCode = 400;

	await signupReq();
	await signinReq(statusCode, { email, password });
});

it('responds with a cookie when valid credentials', async () => {
	const email = 'test@email.com';
	const password = '12345678';
	const statusCode = 200;

	await signupReq();
	const response = await signinReq(statusCode, { email, password });

	expect(response.get('Set-Cookie')).toBeDefined();
});
