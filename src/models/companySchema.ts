import mongoose from 'mongoose';
const { Schema } = mongoose;

export const companySchema = new Schema({
	name: String,
	sector: String,
	entries: [{ type: Schema.Types.ObjectId, ref: 'Entry' }]
});
