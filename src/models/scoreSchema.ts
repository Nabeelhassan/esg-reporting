import mongoose from 'mongoose';
const { Schema } = mongoose;

export const scoreSchema = new Schema({
	esg: Number,
	category: {
		environment: Number,
		social: Number,
		governance: Number
	},
	sub_category: {
		waterAndMarineSources: Number,
		climateChange: Number,
		biodiversityAndEcosystems: Number,
		pollution: Number,
		resourceUseAndCircularEconomy: Number,
		ownWorkforce: Number,
		affectedCommunities: Number,
		businessConduct: Number,
		workersInTheValueChain: Number,
		consumersAndEndUsers: Number
	},
	company_id: { type: Schema.Types.ObjectId, ref: 'Company' }
});
