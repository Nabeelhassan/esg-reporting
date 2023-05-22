import mongoose from 'mongoose';
const { Schema } = mongoose;

export const metricSchema = new Schema({
	category: String,
	sub_category: String,
	name: String,
	unit: String
});
