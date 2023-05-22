import { mongoToPojo } from '../helpers/mongoToPojo';
import { dbConnect } from '../db/dbConnect';
import { dummyDataToDatabase } from '../helpers/dummyDataToDatabase';
import { dummyDataDelete } from '../helpers/dummyDataDelete';

import { Company } from '../models/Models';
import { Entry } from '../models/Models';

import mongoose from 'mongoose';

import type { Schema } from 'mongoose';
import type { LayoutServerLoad } from './$types';

// turn mongoose objects into POJO's (plain old javascript objects) before rendering to prevent errors through .lean()

export interface MongoObject {
	_id: Schema.Types.ObjectId | string;
}
export interface MongoEntryObject extends MongoObject {
	metric_id: Schema.Types.ObjectId | string;
	company_id: Schema.Types.ObjectId | string;
	year: number;
	value: Schema.Types.Mixed;
}

export interface MongoCompanyObject extends MongoObject {
	name: string;
	sector: string;
	entries: MongoEntryObject[];
}

export const load = (async ({ fetch }) => {
	try {
		await dbConnect();
		const companies: MongoCompanyObject[] = await Company.find().populate({
			path: 'entries',
			populate: {
				path: 'metric_id'
			}
		});
		// console.log(companies[2].entries[0].metric_id);
		// const allEntries = await Entry.find().populate('metric_id');

		// const res = await fetch('http://localhost:5173/data.json');
		// const data = await res.json();
		// console.log(data.data);
		// const nike = await Company.findOne({ name: 'Nike' });

		// data.data.forEach(async (item) => {
		// 	const newEntry = {
		// 		metric_id: new mongoose.Types.ObjectId(item._id),
		// 		company_id: new mongoose.Types.ObjectId(nike._id),
		// 		year: 2025,
		// 		value: item.value
		// 	};
		// 	await Entry.create(newEntry);
		// });
		// const nikeEntries = await Entry.find({ company_id: nike._id });
		// const nikeEntriesIds = nikeEntries.map((entry) => entry._id);
		// await Company.updateOne({ name: 'Nike' }, { entries: nikeEntriesIds });
		// console.log(data);

		// await dummyDataDelete('Apple');

		// await dummyDataToDatabase('Google', 'Nike', 0.66, 1.33);
		// console.log(companies);

		const pojoCompanies = mongoToPojo(companies);
		// console.log(allEntries);

		return { data: pojoCompanies };
	} catch (error) {
		throw new Error(error);
	}
}) satisfies LayoutServerLoad;
