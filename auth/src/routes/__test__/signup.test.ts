import request from 'supertest';
import { app } from '../../app';

interface Body {
	email?: string;
	password?: string;
}

const signupReq = (statusCode: number, body: Body) => {
	return request(app).post('/api/users/signup').send(body).expect(statusCode);
};

it('returns a 201 on successful signup', async () => {
	const email = 'test@test.com';
	const password = 'passsword';
	const statusCode = 201;

	await signupReq(statusCode, { email, password });
});

it('returns a 400 with an invalid email', async () => {
	const email = 'testsdf';
	const password = 'passsword';
	const statusCode = 400;

	await signupReq(statusCode, { email, password });
});

it('returns a 400 with an invalid password', async () => {
	const email = 'testsdf';
	const password = 'p';
	const statusCode = 400;

	await signupReq(statusCode, { email, password });
});

it('returns a 400 with missing email and password', async () => {
	const email = 'test@email.com';
	const password = 'psdfsdfsd';
	const statusCode = 400;

	await signupReq(statusCode, { password });
	await signupReq(statusCode, { password });
});

it('disallows duplicated emails', async () => {
	const email = 'test@test.com';
	const password = '12345678';

	await signupReq(201, { email, password });
	await signupReq(400, { email, password });
});

it('sets a cookie after successful signup', async () => {
	const email = 'test@test.com';
	const password = '12345678';
	const statusCode = 201;

	const response = await signupReq(statusCode, { email, password });

	expect(response.get('Set-Cookie')).toBeDefined();
});
