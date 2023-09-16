import mongoose from 'mongoose';
const { Schema } = mongoose;

export const metricSchema = new Schema({
	category: String,
	sub_category: String,
	name: String,
	unit: String,
	targetValueDescription: String,
	industry_stats: [
		{
			industry_id: { type: Schema.Types.ObjectId, ref: 'Industry' },
			median: Number,
			average: Number
		}
	]
});
