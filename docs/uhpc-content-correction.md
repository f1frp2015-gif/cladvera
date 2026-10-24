# UHPC content correction — 24 October 2026

The owner confirmed that the UHPC products offered are not TAKTL products. Earlier supplier listings and associated source material must not be used as evidence for Cladvera's UHPC inquiries.

## Public content changes

- Withdraw the old supplier collection and five product URLs with HTTP 410 and `X-Robots-Tag: noindex`. Keep the retired prefix crawlable so search engines can observe removal; exclude it from the sitemap, public navigation and language-model index.
- Replace public content with original, generic architectural UHPC inquiry descriptions at `/materials/uhpc-panels`. Surface and attachment entries describe requirements to review, not a confirmed inventory or proprietary product series.
- Remove competitor photos, hosted-photo references, document links, proprietary finish and series names, and claims copied from those products, including origin, dimensions, strength, certifications and self-cleaning performance.
- Use original SVG architectural studies clearly labeled as concepts rather than samples or installed projects. Remove the unused remote-photo host from the image optimizer allowlist.
- Reject old saved product IDs rather than converting them into supposedly equivalent products.
- Keep actual manufacturer, origin, exact construction, technical evidence, availability and pricing subject to verification. No third-party approval, warranty or project record is transferable to these entries.

Historical research and audit files elsewhere in `docs/` describe an earlier site state. They are not current product evidence; this correction supersedes their supplier-association and UHPC sourcing statements. Public assets are served only from `public/`, and current product data and publication controls govern the website.

## Production location clarification — 24 October 2026

After the cleanup was published, the owner supplied the UHPC production location as Jiangsu, Xuzhou. Public English copy now states **Xuzhou, Jiangsu, China** for concrete facade panels, aggregate and textured panels, and custom concrete elements. This supersedes the pending-location wording above. The information is owner-provided, not an independent factory audit. Manufacturer identity, technical specifications and certification remain unconfirmed. Attachment-component origin is not established by this clarification and remains pending; shipment-specific origin documentation still requires review.

## Validation

- Lint, TypeScript, production build, sitemap registration and all 32 automated tests pass.
- Local crawl: 24 indexable URLs and 84 internal link targets checked, with no broken links. Rendered canonical pages contain no retired brand names or photo-CDN references.
- Six retired URLs plus an unknown descendant return 410 with noindex. Requests to optimize an old competitor photo return 400.
- Browser checks cover 320, 390 and 1440 px layouts; shortlist, comparison and quote selection work without submitting a request. Retired saved and shared IDs are rejected. Homepage, collection and detail-page screenshots were reviewed independently.
