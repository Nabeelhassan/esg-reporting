import type { MongoCompanyObject } from '../routes/+layout.server';

export const mongoToPojo = (array: MongoCompanyObject[]) => {
	return array.map((item) => {
		const parsedEntries = item.entries
			? (item.entries = item.entries.map((entry) => ({
					_id: entry._id.toString(),
					metric_id: {
						_id: entry.metric_id._id.toString(),
						category: entry.metric_id.category,
						name: entry.metric_id.name,
						unit: entry.metric_id.unit,
						__v: entry.metric_id.__v,
						sub_category: entry.metric_id.sub_category
					},
					company_id: entry.company_id.toString(),
					year: entry.year,
					value: entry.value
			  })))
			: [];
		return {
			_id: item._id.toString(),
			name: item.name,
			sector: item.sector,
			entries: parsedEntries
		};
	});
};
