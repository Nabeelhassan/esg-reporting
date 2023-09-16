import mongoose from 'mongoose';
import { metricSchema } from './metricSchema';
import { companySchema } from './companySchema';
import { entrySchema } from './entrySchema';
import { scoreSchema } from './scoreSchema';
import { industrySchema } from './industrySchema';
import { statsSchema } from './statsSchema';

export const Metric = mongoose.model('Metric', metricSchema, 'metrics');
export const Entry = mongoose.model('Entry', entrySchema, 'entries');
export const Company = mongoose.model('Company', companySchema, 'companies');
export const Score = mongoose.model('Score', scoreSchema, 'scores');
export const Industry = mongoose.model('Industry', industrySchema, 'industries');
export const Stat = mongoose.model('Stat', statsSchema, 'stats');
