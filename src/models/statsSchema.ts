import mongoose from 'mongoose';
const { Schema } = mongoose;

export const statsSchema = new Schema({
	industry_id: { type: Schema.Types.ObjectId, ref: 'Industry' },
	metric_id: { type: Schema.Types.ObjectId, ref: 'Metric' },
	median: Number,
	average: Number
});
