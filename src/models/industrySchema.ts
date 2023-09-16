import mongoose from 'mongoose';
const { Schema } = mongoose;

export const industrySchema = new Schema({
	name: String,
	stats: [{ type: Schema.Types.ObjectId, ref: 'Stat' }]
});
