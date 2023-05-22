import { mongoToPojo } from '../helpers/mongoToPojo';
import { dbConnect } from '../db/dbConnect';

import { Company } from '../models/Models';

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

export interface MongoMetricObject extends MongoObject {
	category: string;
	sub_category: string;
	name: string;
	unit: string;
	__v: number;
}

export interface MongoCompanyObject extends MongoObject {
	name: string;
	sector: string;
	entries: MongoEntryObjectPopulated[];
}

export interface MongoEntryObjectPopulated extends Omit<MongoEntryObject, 'metric_id'> {
	metric_id: MongoMetricObject;
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

		const pojoCompanies = mongoToPojo(companies);

		return { data: pojoCompanies };
	} catch (error) {
		throw new Error(error);
	}
}) satisfies LayoutServerLoad;
