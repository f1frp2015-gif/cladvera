# Cladvera design and navigation upgrade

Date: 2026-10-09

## Delivered scope

- Warm paper, charcoal and copper palette, architectural panel mark, restrained corners, larger typography and consistent shared page headers, buttons and sections.
- Image-led homepage with canonical material collections, application links and distinct architect/procurement journeys.
- Product finder with manufacturer imagery, labeled illustrations, collection links and the existing filter/shortlist workflows.
- Refined desktop material menu, mobile navigation and project-oriented footer.
- Topic-specific headings/metadata and contextual internal links; see `seo-keyword-map.md`.
- Existing reviewed publication boundary preserved. No product approvals, inventory, prices or manufacturer claims were added.

## Verification

- `npm run lint`: passed.
- `npm run typecheck`: passed. Removed three duplicate generated `.next/types/* 2.ts` files from the ignored build cache into `/tmp/cladvera-generated-types-backup`; application source was unaffected.
- `npm test`: 7 tests passed, including category landing-page and dropdown navigation publication checks.
- `npm run build`: passed; 60 static pages generated alongside dynamic request/catalogue routes. Existing draft routes are generated but retain their original indexing restrictions.
- Local production HTTP audit: 24 reviewed routes returned 200, each with one H1, valid metadata lengths and the expected canonical URL. The 21 reviewed indexable pages and three noindex workflow pages retain their intended robots states.
- Local internal-link audit: 1,048 link occurrences, 71 unique local targets and 48 fragment links resolved successfully.
- Browser: desktop homepage/product library reviewed; 390px mobile homepage, product finder and inquiry page have no document horizontal overflow.
- Browser: desktop material menu opens and closes with Escape; mobile menu navigates and closes correctly.
- Browser: filtering to Custom GFRP returns one family; adding it to the shortlist persists into comparison, and the quote request contains that product checked.
- Browser: an unmatched search displays the empty state and clearing filters restores all 11 product families.

## Limits

The HTTP audit excludes external supplier links. Forms were verified through product selection and request preparation entry; no inquiry or email was sent. Search ranking changes require post-deployment Search Console data and are not asserted here.

## Live deployment

- Vercel production deployment: `dpl_9rCEx7GDuku18hEo85429AMi1ZLF`.
- Built successfully on Vercel and promoted to `https://cladvera.vercel.app`.
- Public browser verification confirms the updated homepage on the live domain. The subsequent live product-library browser check was interrupted by a browser connection timeout; the complete product-library flow was verified on the local production build.
- Deployment URL authentication was retained. The direct deployment URL required Vercel sign-in, and the CLI HTTP client encountered a TLS connection error; public-domain verification was performed after normal promotion.
- Website code was deployed from this local working tree. Changes are not committed or pushed to the GitHub remote.

## Architectural VI refinement — 2026-10-08

Delivered a new open-C brand mark, uppercase wordmark, limestone/charcoal/terracotta palette, editorial serif accents, asymmetric homepage material plates, an open material archive, architect project desk, shared page typography, signature footer, favicon and social sharing image. See `visual-identity.md` for the design rules.

Validation:

- ESLint, TypeScript, 7 repository tests and whitespace checks passed after the final implementation changes.
- Production build passed locally and on Vercel (61 generated static outputs, including the new favicon). The first sandboxed local build was blocked from creating the compiler port; rerunning with approved execution permissions passed.
- Local production HTTP audit: 24 reviewed pages, 21 indexable; title/description/canonical/single-H1 checks passed. 1,050 internal-link occurrences, 71 distinct local targets, and 52 hash anchors checked with zero errors. Report: `/tmp/cladvera-http-seo-audit-3002.json`.
- Browser: homepage at desktop, 390 px and 320 px; no document overflow. Product finder and inquiry also checked at 390 px. Material filter returns one GFRP family, shortlist selection reaches comparison, and inquiry preselects the correct GFRP product. Test shortlist cleared; no inquiry submitted.
- Corrected an image-container positioning conflict found in visual review, raised muted text contrast, and added light focus outlines on charcoal fields. The new hero uses responsive image optimisation and loaded successfully on the public site.

Deployment:

- Production deployment `dpl_4iWZwdjEFDN7kNFU3ybQJuywgKoK`, Ready and aliased to `https://cladvera.vercel.app`.
- Deployment URL: `https://cladvera-ek6grn2to-ori-project-workspace.vercel.app`.
- Public homepage verified in-browser: new headline, visual styling, loaded manufacturer image and new favicon deployment reference.
- Source changes remain local; no GitHub commit or push performed.
- Public product finder verified after reconnecting the preview: new typography and collection index visible, 11 product entries rendered, correct title/H1 and no horizontal overflow at 1280 px. The initial multi-step browser attempt timed out; the focused navigation and screenshot succeeded.

## Selection workflow refinement — 2026-10-09

Scope:

- Extended the architectural archive style to the comparison matrix, mobile material reviews, numbered enquiry sections and related-material navigation.
- Added a responsive shortlist bar, product-specific accessible selection labels, removable filter labels and result-anchor navigation.
- Fixed common material searches by including reviewed category/application labels and construction text, with punctuation normalization. Explicit filters remain combined.
- Fixed shared comparison edits overwriting the saved browser shortlist before the visitor chooses Save. Added focused regression coverage for edit, clear, save, return and request-link IDs.
- Product imagery in the archive and related materials uses responsive image optimization. The brand icon is explicitly crawlable without broadening the page publication boundary.
- Request edits invalidate the old preview and status; generating a valid brief focuses its preview. Material review links explicitly open a new tab. Contact details are not persisted.

Verification:

- ESLint, TypeScript, all 14 tests and whitespace checks passed. Final production build passed with 61 generated outputs after the safe-area scroll spacing adjustment.
- HTTP audit on local production: 24 reviewed pages with correct metadata, canonical URLs, single H1 and publication gates; 1,050 internal links, 71 unique targets and 57 anchors resolved. The SVG icon returns 200 with the expected MIME type. Report: `/tmp/cladvera-http-seo-audit-3003.json`.
- Browser, desktop: ACM returns three families; glass fiber plus Custom GFRP returns one. Submitting lands at the result anchor; removing the search label retains the material filter. Shortlist bar carries selection into the new comparison view. Related-material images load through the optimizer.
- Browser, 320 px: archive, shortlist bar, comparison and request have no document horizontal overflow. Two shortlisted families reach the inquiry correctly. A valid fictional QA brief focuses its preview and contains both families; editing hides the preview and clears the old status.
- Browser, shared selection: removing a shared product updates request links without changing the two saved products; View saved restores both. The test shortlist was cleared and the viewport restored.
- The inquiry review link has `target="_blank"` and the original form retains its values after activation. The in-app test browser did not expose an additional tab, so popup creation itself is not asserted. No email draft was opened and no inquiry was sent.

Release scope includes the previously deployed visual identity work and this workflow refinement. This validation record accompanies the source commit for GitHub synchronization and production release; earlier notes about unpushed source describe previous releases.

## Peer-informed architectural experience — 2026-10-09

Scope:

- Researched official EQUITONE, Swisspearl, Trespa, Fundermax, TAKTL and Rieder pages. Evidence and implementation decisions are maintained in `建筑材料网站对标市场调研.md`.
- Added four homepage design studies with manufacturer references, design questions, candidate products and shared comparison links.
- Rebuilt TAKTL and ALMINE product dossiers around large visual plates, page indexes, open fact rows, design context and clearly labeled source documents. Refined the TAKTL collection and its finish references.
- Added server-rendered technical-resource search and combined material, application and file-access filters. Direct files, manufacturer pages and project document requests have distinct labels.
- Connected five editorial application sections to the matching product and document filters. Existing canonical URLs and publication boundaries remain unchanged.

Verification:

- ESLint, TypeScript, all 19 tests and whitespace checks passed. Production build passed with 61 generated outputs; the resource register now handles query filters dynamically.
- Three duplicate ignored `.next/types/* 2.ts` files were moved to `/tmp/cladvera-peer-study-generated-types/` before rerunning TypeScript successfully. No application source was removed.
- Local production HTTP audit: 24 reviewed routes and six resource-filter cases returned 200. Titles, descriptions, canonical URLs, single H1 and index/noindex states passed. 1,431 internal-link occurrences, 90 unique local targets and 160 fragment links resolved with no errors. Report: `/tmp/cladvera-http-seo-audit-3004.json`.
- Browser: desktop design-study imagery and candidate links reviewed. Warm and sculptural directions select the correct products; the sculptural comparison opens GFRP and TAKTL custom elements without saving a replacement shortlist.
- Browser: 320 px homepage, TAKTL dossier, applications and filtered resource register have no document horizontal overflow. Planar and sculptural tabs display the corresponding study. ArrowRight and End move both focus and selection correctly.
- Browser: product-document anchors land below both sticky navigation bars at desktop and mobile widths. ALMINE visual plates remain labeled illustrations; TAKTL and supplier imagery keep their source context.
- Browser: combining TAKTL, exterior facades and linked files returns three document entries. The KORSA request carries the correct product and documents intent. The custom-forms application link opens the resource register with two matching families and the correct application selected.
- No form or email was submitted, and no email draft was opened. The viewport was restored. External supplier URLs were excluded from the local link audit; no ranking or conversion improvement is claimed.
