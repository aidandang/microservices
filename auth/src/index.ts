import mongoose from 'mongoose';

import { app } from './app';

mongoose.set('strictQuery', true);

const start = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error('JWT_KEY must be defined');
	}
	if (!process.env.MONGO_URI) {
		throw new Error('MONGO_URI must be defined');
	}

	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log('Connected to MongoDB');
	} catch (err) {
		console.error(err);
	}

	const port = 3000;
	app.listen(port, () => {
		console.log('Listening on port:', port);
	});
};

start();
