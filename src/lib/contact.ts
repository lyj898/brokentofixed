/**
 * Enquiry form configuration. Contact is form-only: no phone, WhatsApp or
 * email links anywhere on the site.
 *
 * The target comes from PUBLIC_FORM_ENDPOINT when it is set (as HomeToMoved
 * does), else from company.json. Until the user confirms FormSubmit's alias,
 * that is the raw address. The form posts to FormSubmit's /ajax/ form of the
 * same target, which answers with JSON instead of redirecting.
 */

import { company } from './data';
import { FORM_ENDPOINT_OVERRIDE } from './env';

const target = FORM_ENDPOINT_OVERRIDE || company.formSubmit.defaultEndpoint;

if (!target.startsWith('https://formsubmit.co/')) {
  throw new Error(`Form endpoint is not a FormSubmit URL: "${target}". Check PUBLIC_FORM_ENDPOINT.`);
}

/** Where the enquiry form POSTs: FormSubmit's AJAX endpoint. */
export const FORM_ENDPOINT: string = target.startsWith('https://formsubmit.co/ajax/')
  ? target
  : target.replace('https://formsubmit.co/', 'https://formsubmit.co/ajax/');

/**
 * Subject line for one page's submissions: "BrokenToFixed – Furniture assembly".
 * The site and page are in every subject so enquiries can be counted per site
 * and per page from the inbox alone.
 */
export const formSubject = (pageName: string): string =>
  `${company.formSubmit.subjectPrefix}${pageName}`;
