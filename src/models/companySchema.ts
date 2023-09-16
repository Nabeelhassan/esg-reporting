import mongoose from 'mongoose';
const { Schema } = mongoose;

export const companySchema = new Schema({
	name: String,
	industry_id: { type: Schema.Types.ObjectId, ref: 'Industry' },
	entries: [{ type: Schema.Types.ObjectId, ref: 'Entry' }],
	score_id: { type: Schema.Types.ObjectId, ref: 'Score' }
});
