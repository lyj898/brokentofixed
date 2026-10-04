/**
 * Typed access to PUBLIC_ environment variables.
 *
 * Both are optional by design. In CI they come from the repo variables of the
 * same name, and an unset repo variable arrives as an empty string, not
 * undefined, so blank values are treated as unset.
 *
 *   PUBLIC_GA4_ID          without it, no analytics script is emitted at all
 *   PUBLIC_FORM_ENDPOINT   FormSubmit target; without it, company.json's default
 */

const clean = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

/** GA4 measurement ID, e.g. "G-XXXXXXXXXX". Empty when unconfigured. */
export const GA4_ID: string = clean(import.meta.env['PUBLIC_GA4_ID']);

export const hasAnalytics = (): boolean => GA4_ID.length > 0;

/** FormSubmit target, e.g. "https://formsubmit.co/<alias>". Empty when unconfigured. */
export const FORM_ENDPOINT_OVERRIDE: string = clean(import.meta.env['PUBLIC_FORM_ENDPOINT']);
