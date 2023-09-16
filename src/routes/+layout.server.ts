import { mongoToPojo } from '../helpers/mongoToPojo';
import { dbConnect } from '../db/dbConnect';
import * as d3 from 'd3';
import mongoose from 'mongoose';

import { Company, Metric, Entry, Score, Industry, Stat } from '../models/Models';

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
		// await dbConnect();
		// const companies: MongoCompanyObject[] = await Company.find().populate({
		// 	path: 'entries',
		// 	populate: {
		// 		path: 'metric_id'
		// 	}
		// });

		// const entries = await Entry.find().populate([
		// 	{
		// 		path: 'company_id'
		// 	},
		// 	{
		// 		path: 'metric_id'
		// 	}
		// ]);
		// const entriesWithout = entries.map((entry) => {
		// 	return {
		// 		_id: entry._id,
		// 		value: entry.value,
		// 		company_name: entry.company_id.name,
		// 		company_sector: entry.company_id.sector,
		// 		company_id: entry.company_id._id,
		// 		name: entry.metric_id.name,
		// 		category: entry.metric_id.category,
		// 		sub_category: entry.metric_id.sub_category,
		// 		unit: entry.metric_id.unit,
		// 		metric_id: entry.metric_id._id
		// 	};
		// });

		// const newEntries = d3.groups(entriesWithout, (d) => {
		// 	return d.metric_id;
		// });
		// console.log(newEntries);

		// const calcdArray = calcEsgScore(newEntries);
		// const pojoCompanies = mongoToPojo(companies);
		// calcEsgScore(newEntries, pojoCompanies);

		// console.log(calcdArray);
		// const data = {
		// 	climateChange: 0.2,
		// 	pollution: 0.1,
		// 	waterAndMarine: 0.2,
		// 	biodiversityAndEcosystems: 0.1,
		// 	resourceUseAndCircularEconomy: 0.2,
		// 	environment: 0.8,
		// 	ownWorkforce: 0.1,
		// 	affectedCommunities: 0.25,
		// 	workersValueChain: 0.15,
		// 	consumersAndEndUsers: 0.2,
		// 	social: 0.7,
		// 	businessConduct: 0.8,
		// 	governance: 0.8
		// };
		const data = [
			{
				climateChange: 0.1,
				pollution: 0.1,
				biodiversityAndEcosystems: 0.2,
				waterAndMarineSources: 0.1,
				resourceUseAndCircularEconomy: 0.2,
				group: 'environment',
				x: 0.5
			},
			{
				climateChange: 0.05,
				pollution: 0.05,
				biodiversityAndEcosystems: 0.05,
				waterAndMarineSources: 0.05,
				resourceUseAndCircularEconomy: 0.05,
				group: 'social',
				x: 0.6
			},
			{
				climateChange: 0.2,
				pollution: 0.2,
				biodiversityAndEcosystems: 0.2,
				waterAndMarineSources: 0.2,
				resourceUseAndCircularEconomy: 0.2,
				group: 'governance',
				x: 0.7
			}
		];

		return { data: data };
	} catch (error: any) {
		throw new Error(error);
	}
}) satisfies LayoutServerLoad;

async function calcEsgScore(data, companies) {
	const companyCount = data[0][1].length;
	const companyValuesWithNumbers = data.filter((item) => typeof item[1][0].value === 'number');
	const companyValuesWithoutNumbers = data.filter((item) => typeof item[1][0].value !== 'number');
	const dataWithScoreValues = companyValuesWithNumbers.map((metricEntries) => {
		const metricValues = metricEntries[1].map((metricEntry) => ({
			...metricEntry
		}));

		const metricValuesFiltered = metricValues.filter((value) => typeof value.value === 'number');
		if (!metricValuesFiltered.length) return;

		const metricValuesWithScore = metricValuesFiltered.map((metricEntry, index) => {
			let lowerValueCount = 0;
			let sameValueCount = 1;

			metricValuesFiltered.forEach((metricEntryInner, indexInner) => {
				if (indexInner === index) return;
				if (metricEntryInner.value < metricEntry.value) lowerValueCount++;
				if (metricEntryInner.value === metricEntry.value) sameValueCount++;
			});

			const metricScore = (lowerValueCount + sameValueCount / 2) / companyCount;
			metricEntry.metricScore = metricScore;

			return metricEntry;
		});
		// console.log(metricValuesWithScore.length);
		return metricValuesWithScore;
	});

	const companyNames = dataWithScoreValues.map((item) => {
		return item.map((company) => company.company_name);
	})[0];

	const newCompanies = companyNames.map((companyData) => {
		const googleValues = dataWithScoreValues.map((item) => {
			return item.find((metricItem) => metricItem.company_name === companyData);
		});

		const categories = [...new Set(googleValues.map((entry) => entry.category))];
		const subCategories = [...new Set(googleValues.map((entry) => entry.sub_category))];

		const subCategoryScoresInArray = categoryScoreInArray(
			subCategories,
			googleValues,
			'sub_category',
			'metricScore',
			'subCategoryScore',
			false
		);
		// console.log(subCategoryScores);
		const categoryScoresInArray = categoryScoreInArray(
			categories,
			subCategoryScoresInArray,
			'category',
			'subCategoryScore',
			'pillarScore',
			true
		);

		const pillarObj = {};
		const subcategoryObj = {};
		const esgObj = {};
		categoryScore(subCategories, googleValues, 'sub_category', 'metricScore', subcategoryObj);
		categoryScore(categories, subCategoryScoresInArray, 'category', 'subCategoryScore', pillarObj);
		esgScore(pillarObj, esgObj);

		const currentCompany = companies.find((company) => company.name === companyData);

		const scoreObj = {
			esg: esgObj.esgScore,
			category: { ...pillarObj },
			sub_category: { ...subcategoryObj },
			company_id: new mongoose.Types.ObjectId(currentCompany._id)
		};
		return { ...currentCompany, score: scoreObj };
	});

	const asr = newCompanies[1];
	const apple = newCompanies[2];
	const google = newCompanies[3];
	// const company = await Company.find({ name: 'Nike' }).populate({ path: 'score_id' });
	// await Metric.updateMany({}, { targetValueDescription: 'Higher is better' });
	// const metrics = await Metric.find({
	// 	name: [
	// 		Total energy consumption non-renewable sources
	// 		Total GHG emissions
	// 		GHG intensity based on net revenue
	// 		Reversals
	// 		Total carbon credits cancelled in the reporting year
	// 		Emissions of air pollutants generated by own operations
	// 		Emissions to water generated by own operations
	// 		Emissions of inoraganic pollutants generated by own operations
	// 		Emissions of ozone-depleting substances generated by own operations
	// 		Microplastics generated or used by the undertaking
	// 		Total air pollutants
	// 		Total Emission to water
	// 		Total Emission to soil
	// 		Total substances of concern or very high concern
	// 		Total water consumption
	// 		Total water consumption in water risk areas
	// 		Conversion over time of land cover
	// 		Changes over time of the ecosystem
	// 		Changes in the spatial configuration of the landscape
	// 		Changes in ecosystem structural connectivity
	// 		Ecosystems extent
	// 		Total amount of waste generated by own operations
	// 		The total amount and percentage of non-recycled waste
	// 		Total number of temporary employees
	// 		Total number of non-guaranteed hours employees
	// 		Total number of employee turnover
	// 		Rate of employee turnover
	// 		Total number of non-employee workers in own workforce
	// 		Number of work-related fatalities
	// 		Number of work-related injuries
	// 		Rate of work-related injuries
	// 		Number of recordable work-related accidents
	// 		Rate of recordable work-related accidents
	// 		Number of cases of recordable work-related ill health
	// 		"Number of days lost to work-related injuries and fatalities, work-related ill health, work related fatalities ill health"
	// 		Male-female hourly pay gap percentage
	// 		Ratio of annual total compensation ratio of the highest paid individual to the median annual total compensation for all employees
	// 		"Total number of incidents of discrimination, including harassment"
	// 		Total number of incidents excluding discrimination and harassment
	// 		"Total amount of material fines, penalties and compensation for damages as a result of violations"
	// 		Number of severe human rights issues and incidents connected to the undertaking's workforce
	// 		"Total amount of fines, penalties and compensation for damages for severe human rights issues and incidents"
	// 		Total number of confirmed incidents of corruption or bribery
	// 		Amount of fines for violation of anti- corruption and anti-bribery laws
	// 		Total monetary value of financial and in-kind political contributions made directly and indirectly by the undertaking
	// 		Average time the undertaking takes to pay an invoice
	// 		Number of legal proceedings (currently outstanding)
	// 	]
	// });
	// console.log(metrics);

	const stats = await Stat.find({});
	const industries = await Industry.find({});
	const nike = await Company.findOne({ name: 'Nike' }).populate({
		path: 'industry_id'
	});

	console.log(nike);
	const scores = await Score.findOne({ _id: '64c7902b77cfbcbe77a74a5f' }).populate(
		'company_id',
		'name'
	);

	const industry1 = await Industry.findOne({ name: 'Textiles & Apparel' });
	// const metrics = await Metric.find({});

	// console.log(scores);

	// await createStats(industries, metrics, Stat);
	// await fillStatIds(industries, metrics, stats, Industry);
	// console.log('succes!');

	return dataWithScoreValues.concat(companyValuesWithoutNumbers);
}

async function createStats(industries, metrics, Stat) {
	try {
		for (const industry of industries) {
			for (const metric of metrics) {
				const newStatEntry = new Stat({
					industry_id: industry._id,
					metric_id: metric._id,
					median: null,
					average: null
				});
				await newStatEntry.save();
			}
		}
		// console.log('succes!')
	} catch (error) {
		console.error(error);
	}
}

function categoryScoreInArray(
	categoriesArray,
	companyValuesArray,
	categoryKey,
	scoreKey,
	storeKey,
	log
) {
	return categoriesArray.map((subCategory) => {
		// if (log) console.log(companyValuesArray);
		const subCategoryValues = companyValuesArray.filter(
			(value) => value[categoryKey] === subCategory
		);
		const subCategoryMetricScores = subCategoryValues.map(
			(subCategoryValue) => subCategoryValue[scoreKey]
		);
		const subCategoryScore = calculateAverage(subCategoryMetricScores);
		companyValuesArray.forEach((value) => {
			if (subCategory === value[categoryKey]) {
				value[storeKey] = subCategoryScore;
			}
		});
		return companyValuesArray;
	})[0];
}

function categoryScore(categoriesArray, companyValuesArray, categoryKey, scoreKey, scoreObj) {
	return categoriesArray.map((subCategory) => {
		const subCategoryValues = companyValuesArray.filter(
			(value) => value[categoryKey] === subCategory
		);
		const subCategoryMetricScores = subCategoryValues.map(
			(subCategoryValue) => subCategoryValue[scoreKey]
		);
		const camelizedSubCategory = camelize(subCategory);
		const obj = {
			[camelizedSubCategory]: calculateAverage(subCategoryMetricScores)
		};
		Object.assign(scoreObj, obj);
		return obj;
	});
}

function esgScore(pillarScores, scoreObj) {
	const objValues = Object.values(pillarScores);
	const obj = {
		esgScore: calculateAverage(objValues)
	};
	Object.assign(scoreObj, obj);
}

function camelize(text) {
	const a = text.toLowerCase().replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
	return a.substring(0, 1).toLowerCase() + a.substring(1);
}

function calculateAverage(arr) {
	// Check if the input array is not empty
	if (arr.length === 0) {
		throw new Error('Cannot calculate average of an empty array.');
	}

	// Calculate the sum of all elements in the array
	const sum = arr.reduce((acc, curr) => acc + curr, 0);

	// Calculate the average by dividing the sum by the number of elements
	const average = sum / arr.length;

	return average;
}
