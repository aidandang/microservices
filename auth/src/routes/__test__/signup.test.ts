import request from 'supertest';
import { app } from '../../app';

interface Body {
	email?: string;
	password?: string;
}

const reqTest = (statusCode: number, body: Body) => {
	return request(app).post('/api/users/signup').send(body).expect(statusCode);
};

it('returns a 201 on successful signup', async () => {
	const email = 'test@test.com';
	const password = 'passsword';
	const statusCode = 201;

	return reqTest(statusCode, { email, password });
});

it('return a 400 with an invalid email', async () => {
	const email = 'testsdf';
	const password = 'passsword';
	const statusCode = 400;

	return reqTest(statusCode, { email, password });
});

it('return a 400 with an invalid password', async () => {
	const email = 'testsdf';
	const password = 'p';
	const statusCode = 400;

	return reqTest(statusCode, { email, password });
});
