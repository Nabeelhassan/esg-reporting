import { Company, Entry } from '../models/Models';

export const dummyDataDelete = async (companyName: string, sector: string) => {
	await Company.create({ name: companyName, sector: sector });
	const company = await Company.findOne({ name: companyName });
	if (!company) return;
	const allEntries = await Entry.find({ company_id: company._id });
	allEntries.forEach(async (entry) => {
		await Entry.findOneAndDelete({ _id: entry._id });
	});
	const companyEntries = await Entry.find({ company_id: company._id });

	const companyEntriesIds = companyEntries.map((entry) => entry._id);
	await Company.updateOne({ name: companyName }, { entries: companyEntriesIds });
};
