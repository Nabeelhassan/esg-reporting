import mongoose from 'mongoose';
import { env } from '$env/dynamic/private';

export const dbConnect = async () => {
	const { MONGODB_URI } = env;
	if (!MONGODB_URI) throw new Error('MONGODB_URI not set');
	try {
		await mongoose.connect(MONGODB_URI);

		console.log('MongoDB connected');
	} catch (err) {
		console.error(err);
	}
};
