import mongoose from 'mongoose';
const { Schema } = mongoose;

export const entrySchema = new Schema({
	metric_id: { type: Schema.Types.ObjectId, ref: 'Metric' },
	company_id: { type: Schema.Types.ObjectId, ref: 'Company' },
	year: Number,
	value: Schema.Types.Mixed
});
