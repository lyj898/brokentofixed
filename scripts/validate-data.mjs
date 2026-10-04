// Validates src/data/*.json before every build. If it fails, the build fails.
// Run: node scripts/validate-data.mjs
//
// Shape checks keep the templates honest; the copy checks enforce the family
// rules that are easiest to break by accident while writing (see README).

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { BANNED_COPY } from './copy-rules.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = join(root, 'src', 'data');
const read = (f) => JSON.parse(readFileSync(join(dataDir, f), 'utf8'));

const jobs = read('jobs.json');
const company = read('company.json');

const errors = [];
const err = (m) => errors.push(m);

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const str = (v) => typeof v === 'string' && v.trim().length > 0;
const strArr = (v, min) => Array.isArray(v) && v.length >= min && v.every(str);

const seen = new Set();
const titles = new Set();
for (const j of jobs) {
  const at = `job "${j.slug}"`;
  if (!SLUG.test(j.slug)) err(`${at}: slug must be lowercase and hyphenated`);
  if (seen.has(j.slug)) err(`${at}: duplicate slug`);
  seen.add(j.slug);

  for (const k of ['name', 'serviceName', 'metaTitle', 'metaDescription', 'h1', 'summary', 'tasksNote', 'afterwards', 'illoAlt']) {
    if (!str(j[k])) err(`${at}: ${k} is missing or empty`);
  }
  if (str(j.metaTitle) && j.metaTitle.length > 60) err(`${at}: metaTitle is ${j.metaTitle.length} chars (max 60)`);
  if (titles.has(j.metaTitle)) err(`${at}: duplicate metaTitle`);
  titles.add(j.metaTitle);
  if (str(j.metaDescription) && (j.metaDescription.length > 155 || j.metaDescription.length < 70)) {
    err(`${at}: metaDescription is ${j.metaDescription.length} chars (70-155)`);
  }

  if (!strArr(j.intro, 1)) err(`${at}: intro needs at least 1 paragraph`);
  if (!strArr(j.priceFactors, 4)) err(`${at}: priceFactors needs at least 4 entries`);
  if (!strArr(j.photos, 2)) err(`${at}: photos needs at least 2 entries`);
  if (!strArr(j.prepare, 3)) err(`${at}: prepare needs at least 3 entries`);
  if (!strArr(j.onTheDay, 3)) err(`${at}: onTheDay needs at least 3 entries`);

  if (!Array.isArray(j.tasks) || j.tasks.length < 4) err(`${at}: tasks needs at least 4 entries`);
  else j.tasks.forEach((t, i) => {
    if (!str(t.name) || !str(t.body)) err(`${at}: tasks[${i}] needs name and body`);
  });

  if (!strArr(j.scope?.small, 3) || !strArr(j.scope?.bigger, 2) || !str(j.scope?.note)) {
    err(`${at}: scope needs small (3+), bigger (2+) and a note`);
  }

  // Every job page covers homes (HDB, condo, landed) and offices, as sections
  // of the one page. There are no job x property-type pages.
  for (const k of ['hdb', 'condo', 'landed', 'office']) {
    if (!str(j.premises?.[k])) err(`${at}: premises.${k} is missing or empty`);
  }

  if (!Array.isArray(j.faqs) || j.faqs.length < 3) err(`${at}: faqs needs at least 3 entries`);
  else j.faqs.forEach((f, i) => {
    if (!str(f.q) || !str(f.a)) err(`${at}: faqs[${i}] needs q and a`);
  });

  if (j.disposal !== undefined && !(str(j.disposal) && j.disposal.includes('Junk to Clear'))) {
    err(`${at}: disposal must be a sentence naming Junk to Clear`);
  }

  if (!existsSync(join(root, 'public', 'illo', `${j.slug}.svg`))) err(`${at}: public/illo/${j.slug}.svg is missing (npm run illo)`);
  if (!existsSync(join(root, 'public', 'icons', `${j.slug}.svg`))) err(`${at}: public/icons/${j.slug}.svg is missing (npm run illo)`);

  const text = JSON.stringify(j);
  for (const rule of BANNED_COPY) {
    const m = text.match(rule.re);
    if (m) err(`${at}: ${rule.why} ("${m[0]}")`);
  }
}

// --- company ------------------------------------------------------------------
if (!/^https:\/\/formsubmit\.co\//.test(company.formSubmit?.defaultEndpoint ?? '')) {
  err('company.json: formSubmit.defaultEndpoint must be a FormSubmit URL');
}
if (company.formSubmit?.subjectPrefix !== 'BrokenToFixed – ') {
  err('company.json: formSubmit.subjectPrefix must be "BrokenToFixed – " (site in every subject)');
}
if (company.siteUrl !== 'https://brokentofixed.com') err('company.json: siteUrl must be https://brokentofixed.com');
for (const [k, v] of Object.entries(company.links ?? {})) {
  if (!/^https:\/\/[a-z.]+\/.+\/$/.test(v)) err(`company.json: links.${k} must be a specific page with a trailing slash`);
}

for (const e of errors) console.error(`  ERROR ${e}`);
console.log(`validate-data: ${jobs.length} jobs, ${errors.length} error(s)`);
process.exit(errors.length ? 1 : 0);
