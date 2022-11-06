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

it('clears the cookie after signing out', async () => {
	await signupReq();

	const response = await request(app)
		.post('/api/users/signout')
		.send({})
		.expect(200);

	expect(response.get('Set-Cookie')[0]).toEqual(
		'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
	);
});
