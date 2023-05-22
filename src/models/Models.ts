import mongoose from 'mongoose';
import { metricSchema } from './metricSchema';
import { companySchema } from './companySchema';
import { entrySchema } from './entrySchema';

export const Metric = mongoose.model('Metric', metricSchema, 'metrics');
export const Entry = mongoose.model('Entry', entrySchema, 'entries');
export const Company = mongoose.model('Company', companySchema, 'companies');
