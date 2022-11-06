import request from 'supertest';
import { app } from '../../app';

const signupReq = () => {
	return request(app)
		.post('/api/users/signup')
		.send({ email: 'test@email.com', password: '12345678' })
		.expect(201);
};

it('responds with details about the current user', async () => {
	const authResponse = await signupReq();

	const cookie = authResponse.get('Set-Cookie');

	const response = await request(app)
		.get('/api/users/current-user')
		.set('Cookie', cookie)
		.send()
		.expect(200);

	expect(response.body.currentUser.email).toEqual('test@email.com');
});
