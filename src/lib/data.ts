/**
 * The single place raw JSON becomes typed data. Templates import from here,
 * never from the JSON directly. scripts/validate-data.mjs checks the shapes
 * before every build, which is what makes these assertions safe.
 */

import jobsRaw from '../data/jobs.json';
import companyRaw from '../data/company.json';

import type { Company, Job } from '../types';

export const jobs = jobsRaw as unknown as Job[];
export const company = companyRaw as unknown as Company;

const jobIndex = new Map(jobs.map((j) => [j.slug, j]));

/** Throws rather than returning undefined: a missing slug is a data bug. */
export function getJob(slug: string): Job {
  const found = jobIndex.get(slug);
  if (!found) throw new Error(`Unknown job slug: "${slug}"`);
  return found;
}
