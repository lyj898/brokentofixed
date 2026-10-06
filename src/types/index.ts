/** Shapes of the JSON in src/data. scripts/validate-data.mjs enforces them at build time. */

export interface Faq {
  q: string;
  a: string;
}

/** One piece of work within a job page: "TV wall mounting", "Leaking tap". */
export interface Task {
  name: string;
  body: string;
}

/** What the job means in each kind of premises. */
export interface Premises {
  hdb: string;
  condo: string;
  landed: string;
  office: string;
}

export interface Job {
  slug: string;
  /** Short name, as used in nav, the form and icons: "Furniture assembly". */
  name: string;
  /** The service as a buyer searches for it: "Furniture assembly". */
  serviceName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** One-sentence summary, used on cards and in the Service schema node. */
  summary: string;
  intro: string[];
  tasks: Task[];
  tasksNote: string;
  /** Where a handyman job ends and a bigger one begins. */
  scope: { small: string[]; bigger: string[]; note: string };
  priceFactors: string[];
  /** What to send with the enquiry so the partner can quote from it. */
  photos: string[];
  prepare: string[];
  onTheDay: string[];
  afterwards: string;
  premises: Premises;
  faqs: Faq[];
  /** The one-line pointer to Junk to Clear, a disposal company we refer jobs to, for what the job leaves behind. */
  disposal?: string;
  /** Alt text for public/illo/{slug}.svg. */
  illoAlt: string;
}

export interface Company {
  tradingName: string;
  /** Who runs the site, as written in copy: "the OurKampung team". No company is named (independence, 6 Oct 2026). */
  team: string;
  familyName: string;
  familyUrl: string;
  siteUrl: string;
  operatingHoursDisplay: string;
  businessModelStatement: string;
  formSubmit: { defaultEndpoint: string; subjectPrefix: string; note: string };
  links: {
    junkToClearHousehold: string;
    junkToClearRenovation: string;
    ourKampung: string;
    ourKampungSites: string;
    ourKampungHandover: string;
  };
}
