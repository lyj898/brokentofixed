// Copy rules shared by validate-data.mjs (on the JSON) and audit-build.mjs (on
// the rendered pages). Each one is a family, brief or user rule that is easy to
// break by accident while writing.

export const BANNED_COPY = [
  {
    // BrokenToFixed is a matching service. A partner handyman does the work.
    re: /\bour (handym[ae]n|handypersons?|technicians?|team (will )?(fix|repair|install)|crews?|staff|workers|contractors?|plumbers?|electricians?|specialists?)\b/i,
    why: 'claims our own handymen or crews (matching service: the partner does the work)',
  },
  {
    // No prices until the partner quotes real ranges (user, 5 Oct 2026: quote only for now).
    re: /S\$\s?\d|\$\s?\d{2,}|\bSGD\s?\d/i,
    why: 'contains a price (the price comes with a quote)',
  },
  {
    // No invented statistics.
    re: /\b\d{1,3}(\.\d+)?\s?%|\b\d+(,\d{3})+\+? (homes|customers|jobs|clients)/i,
    why: 'contains a statistic (none are sourced)',
  },
  {
    // The user, 5 Oct 2026, on the partner's licences: "just don't talk abt it".
    // So the site says nothing about licences, either way.
    re: /\blicen[cs](e|ed|es|ing)\b|\bcertified\b|\baccredited\b/i,
    why: 'mentions licensing (the user asked the site not to talk about it)',
  },
  {
    // Independence (user, 6 Oct 2026): no company runs the family, and Junk to
    // Clear is a separate company we refer jobs to, never "the same team".
    re: /\bSKAP\b|team behind Junk to Clear|Junk to Clear, run by the same team|\b(since|established( in)?) 2009\b|trading name of|\bUEN\b/i,
    why: 'names a company or borrows Junk to Clear\'s facts (the OurKampung team runs this site)',
  },
  {
    re: /\b(testimonial|5[- ]star|rated \d|\d(\.\d)? stars?)\b/i,
    why: 'looks like a review or rating (none have been collected)',
  },
  {
    // No promises the partner hasn't made.
    re: /\b(we|our partners?) guarantee|\bguaranteed\b|\bsame[- ]day\b|\b24\/7\b|\bfully insured\b/i,
    why: 'makes a promise the partner has not made',
  },
];
