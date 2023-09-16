import { Company, Entry } from '../models/Models';
import mongoose from 'mongoose';
import type { MongoCompanyObject, MongoEntryObject } from '../routes/+layout.server';

export const dummyDataToDatabase = async (
	companyName: string,
	companyWithEntries: string,
	min: number,
	max: number
) => {
	const company: MongoCompanyObject | null = await Company.findOne({ name: companyName });
	const otherCompany: MongoCompanyObject | null = await Company.findOne({
		name: companyWithEntries
	});
	if (!company || !otherCompany) return;
	const allEntries: MongoEntryObject[] = await Entry.find({ company_id: otherCompany._id });
	if (!allEntries.length) return;
	await createEntryInDb(allEntries, company, min, max);
	await updateCompanyInDb(otherCompany);
};

const createEntryInDb = async (
	allEntries: MongoEntryObject[],
	company: MongoCompanyObject,
	min: number,
	max: number,
	count = 0
) => {
	if (!company._id) return;
	const entry: MongoEntryObject = allEntries[count];
	const newValue =
		typeof entry.value !== 'number'
			? entry.value
			: Math.round(generateRandomNumber(min, max) * entry.value);

	const newEntry = {
		metric_id: new mongoose.Types.ObjectId(entry.metric_id),
		company_id: new mongoose.Types.ObjectId(company._id),

		year: entry.year,
		value: newValue
	};

	await Entry.create(newEntry);
	if (count < allEntries.length) {
		await createEntryInDb(allEntries, company, min, max, count + 1);
	}
};

const updateCompanyInDb = async (company: MongoCompanyObject) => {
	const companyEntries = await Entry.find({ company_id: company._id });

	const companyEntriesIds = companyEntries.map((entry) => entry._id);
	await Company.updateOne({ _id: company._id }, { entries: companyEntriesIds });
};

const generateRandomNumber = (min: number, max: number) => {
	const random = Math.random();
	const randomValue = random * (max - min) + min;
	return randomValue;
};
