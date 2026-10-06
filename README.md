# brokentofixed.com

BrokenToFixed: a handyman matching service in Singapore, run by the team behind Junk to Clear.
Enquiries arrive through a FormSubmit form, and the user passes each one to the Junk to Clear team, which
passes it to a partner handyman. Built the way PestToClear is (structure copied, not text). Brief:
`../jtc-family/briefs/brokentofixed.md`.

## Stack

Astro 5 + Tailwind 4, static output, `trailingSlash: 'always'`. Deployed by `.github/workflows/deploy.yml`
(GitHub Actions to Pages). `public/CNAME` and `public/.nojekyll` must stay in the published output.

Two repo variables, both optional (Settings > Secrets and variables > Actions > Variables):

| Variable | Without it |
|---|---|
| `PUBLIC_GA4_ID` | no analytics script loads |
| `PUBLIC_FORM_ENDPOINT` | the form posts to `formSubmit.defaultEndpoint` in `src/data/company.json`. Both are FormSubmit's alias (set 5 Oct 2026), never the raw address |

```
npm run dev      # local dev server
npm run build    # validate data, astro check, build
npm run audit    # audit dist/ (run after build)
npm run verify   # build + audit
npm run illo     # regenerate the SVG graphics
```

## Pages

- `/`, `/handyman/` (the hub, and the page for a list of small jobs) and one page per job, generated from
  `src/data/jobs.json`: furniture assembly, wall mounting, doors and locks, silicone and grout, plumbing
  repairs, electrical repairs, appliance repair
- `/how-it-works/`, `/about/`, `/contact/`, `/privacy/`

Each job page covers what the job includes, a small fix against a bigger job, what affects the price, photos
that help the quote, how to prepare and what happens on the day, and HDB, condo, landed and office premises.
`validate-data.mjs` fails the build if any of those is missing.

## Graphics

Every graphic is SVG drawn for this site by `scripts/illustrations.mjs`, in the family style (PestToClear's
script, after OurKampung's `assets/illo`: soft blob, ground shadow, flat shapes) with this site's palette
(rust, tool yellow, teal). The output in `public/illo/`, `public/icons/` and `public/favicon.svg` is
committed. The brief asked for more graphics than PestToClear has, so:

- an illustration on every page (the audit fails a page without one in `<main>`);
- one illustration and one icon per job;
- illustrated steps for how it works (`StepsStrip.astro`);
- a small fix beside a renovation (`FixOrRenovation.astro`), on the home, hub and every job page;
- what to photograph for a quote, handover repairs, and a tool-board strip above the footer.

No stock photos, no brand logos, no before-and-after pictures. Figures are generic, never named.

## Rules (enforced by `scripts/validate-data.mjs` and `scripts/audit-build.mjs`)

- **Matching service.** Never "our handymen" or "our team will fix". The partner handyman does the work.
- **No job x town or job x property-type pages**, and nothing nested below a job page. That pattern got
  OurKampung pruned. Property types are sections of each job page.
- **No prices** until the partner gives real ranges (the user, 5 Oct 2026: "quote only for now"). Say the
  price comes with a quote.
- **No licences.** The user, 5 Oct 2026, on the partner's licences: "just don't talk abt it". The site says
  nothing about licences, either way, and `copy-rules.mjs` fails the build if it does. Ask the user before
  changing this.
- **No invented statistics, reviews, ratings, testimonials or promises** (same-day, guaranteed, 24/7), in
  copy or in JSON-LD.
- **Lane.** Handyman sales searches only. Not renovation or full repainting (Junk to Clear sells that: the
  fix-or-renovation panel links its renovation page), aircon, pest control, cleaning or moving. Where a job
  leaves junk behind (furniture, appliances), the job page links Junk to Clear's household page. Handover
  repairs are a section on `/handyman/` that links OurKampung's checklist rather than rewriting it.
- **One GA4 event:** `generate_lead`, after FormSubmit confirms delivery. The site's code sends no
  `form_submit`, `button_click` or `form_start`. GA4's enhanced measurement (left on) sends `form_start` and
  `form_submit` by itself; those are never key events. `generate_lead` is the only key event, created with
  code in GA4 before it first fires (PORTFOLIO.md). GA4 property "BrokenToFixed" 557370171 in the OurKampung
  account (403279198; moved from Junktoclear on 6 Oct 2026), stream 16043199055, measurement ID G-SBWGCBW1TY (the `PUBLIC_GA4_ID` repo variable, set 5 Oct 2026).
- **Form.** Fields: the jobs (checkboxes), a description, property type, area, timing, name, and phone or
  WhatsApp. Subject is `BrokenToFixed – <page>`. The PDPA line says the details go to the team behind Junk
  to Clear, which passes them to the partner handyman who'll quote. If sending fails it says so and keeps
  what was typed; no contact details are offered. The form posts to FormSubmit's alias, so no inbox address
  appears in the page; the audit fails if one does.
- **Family links.** None in the header, and in the footer only "Part of OurKampung" (the family revamp,
  `../jtc-family/briefs/family-revamp.md`, 5 Oct 2026): OurKampung's home page, `rel="nofollow"`. The About
  page links Junk to Clear and OurKampung's /our-sites/. Sister sites link each other only in the text, at the
  step that needs it. Never `rel="noreferrer"`.

## Before launch

- The user sees the site and says to publish (brief: show the user before switching DNS).
- A partner is ready to take jobs. No partner names or terms on the site.
- One test enquiry from the live domain, with the user's OK; FormSubmit may ask to confirm the new site.
