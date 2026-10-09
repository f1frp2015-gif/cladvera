# Cladvera keyword and internal-link map

Updated: 2026-10-09

## Scope and evidence

This map assigns search intent to the reviewed product catalogue. It does not claim keyword search volume, current rankings, traffic forecasts or a ranking improvement. Those need Search Console and keyword research data that were not available for this change.

The catalogue currently contains 11 product families in six material/component categories. The reviewed publication set contains 24 routes, of which 21 are indexable. The comparison page and request forms remain outside the sitemap. Unreviewed legacy content retains the existing draft publication policy.

## Primary page map

| Canonical route | Primary topic | Supporting language / intent | Useful onward links |
| --- | --- | --- | --- |
| `/` | Facade panels and architectural materials | Facade cladding, interior surfaces, material selection, project supply | Six material/component destinations; applications; architects; procurement |
| `/products` | Architectural panel product finder | Browse by material, application and manufacturer; compare products | Canonical collections and product detail pages; shortlist |
| `/suppliers/taktl` | Architectural UHPC facade panels | TAKTL, ultra-high performance concrete, concrete textures, aggregate panels | TAKTL facade elements, KORSA, SOLA, custom elements and hardware |
| `/materials/acm-panels` | Metal composite panels | ALMINE, MCM, ACM terminology, architectural metal panels | A2, transit/tunnel and medical product families |
| `/materials/exterior-hpl-panels` | Exterior HPL facade panels | Compactwood, wood-fiber laminate, facade cladding | Wood-fiber HPL product detail; interior collection |
| `/materials/interior-hpl-panels` | Interior decorative wall and ceiling boards | Compactwood, high-pressure-cured decorative boards, interior surfaces | Paste Special Board product detail; exterior HPL collection |
| `/materials/gfrp-custom-elements` | Custom GFRP architectural elements | Molded forms, facade elements, project geometry, tooling and mock-ups | Custom application section; procurement; selected-product request |
| `/suppliers/taktl/hardware` | TAKTL panel attachment components | Rails, clips, anchors, fasteners, coordinated attachment engineering | TAKTL collection and compatible panel families |
| `/applications` | Facade and interior panel applications | Exterior cladding, walls and ceilings, transit, healthcare, custom forms | Application-specific product detail pages; architects; technical documents |
| `/architects` | Architectural panel selection and specification | Finish samples, material comparison, assembly evidence, design intent | Named material collections; technical documents; procurement |
| `/procurement` | Architectural panel procurement and RFQ | Drawings, quantities, quoted scope, approvals, delivery | Product finder; custom UHPC and GFRP; technical documents; quote request |
| `/technical-resources` | Architectural panel technical documents | Manufacturer literature, product data, test reports, attachment details | Each product detail page, identified source files and document requests |

The map treats collection pages as material overviews and detail pages as individual products. Product names and verified manufacturer terminology remain the focus of detail-page titles. Avoid making every page compete for the same generic “facade panels” phrase.

The implemented homepage title is **Facade Panels & Architectural Materials | Cladvera**. Its H1 is **Material shapes architecture.** The eyebrow identifies facade panels and architectural surfaces; the introduction names facade panels, interior boards and custom elements. UHPC, metal composite, HPL and GFRP remain explicit in the collection navigation; the material navigation and cards link directly to the reviewed material destinations.

## Product detail intent

| Route | Specific topic |
| --- | --- |
| `/suppliers/taktl/facade-elements` | TAKTL A\|UHPC facade elements |
| `/suppliers/taktl/korsa-aggregate` | TAKTL KORSA aggregate UHPC panels |
| `/suppliers/taktl/sola` | TAKTL SOLA self-cleaning panels, attributed to the manufacturer |
| `/suppliers/taktl/custom-elements` | TAKTL custom UHPC architectural elements |
| `/materials/acm-panels/a2-fireproof` | ALMINE A2 metal composite panels |
| `/materials/acm-panels/tunnel-traffic` | ALMINE transit and tunnel panels |
| `/materials/acm-panels/medical-antibacterial` | ALMINE medical panel family and its manufacturer-described finish |
| `/materials/exterior-hpl-panels/wood-fiber-facade` | Compactwood wood-fiber HPL facade board |
| `/materials/interior-hpl-panels/paste-special-board` | Compactwood Paste Special Board for interior walls and ceilings |

GFRP and TAKTL hardware each have one canonical page serving their current category and product intent.

## Internal-link structure

1. Homepage and main material navigation link to canonical collection/product destinations from `catalogCategories[].path`.
2. Collection pages link to their named product families. Product pages retain breadcrumbs and now include contextual collection backlinks when the collection is a different URL.
3. Application pages link to the actual candidate products. Product application chips return to `/applications#facade`, `#interior`, `#transit`, `#healthcare` or `#custom` for selection context.
4. The architects page links directly to material collections in explanatory prose. Procurement links to the specific UHPC and GFRP custom-element destinations.
5. Product journeys retain related products and compatible TAKTL hardware. Shared application tags are explicitly not a claim of equivalence.
6. Sample, quote and document requests retain their product IDs so the request matches the selection.

Filtered finder URLs remain useful for selection. They are not separate SEO landing pages: canonical metadata points to `/products`, the sitemap lists the base URL, and existing draft robots rules do not permit parameter variants. Primary material navigation therefore uses the reviewed landing page instead of relying on a filter URL. [Google's faceted-navigation guidance](https://developers.google.com/crawling/docs/faceted-navigation) explains the crawl-management considerations for filters.

Use short, meaningful anchor text in normal sentences. A named material or product should lead to that material or product, while a filtering action should say that it filters. Google recommends crawlable anchor links, descriptive text and contextual internal links; it discourages forcing keywords into anchors. [Google link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)

## Metadata and crawl handling

- Title, visible H1 and introductory copy should describe the same page intent. Preserve readable English rather than repeated keyword variants. Titles remain at most 60 characters and descriptions remain 120–160 characters under the repository rules. Google may generate a different result title using page and link content. [Title-link guidance](https://developers.google.com/search/docs/appearance/title-link)
- Canonical URLs and the reviewed sitemap remain governed by existing site configuration and publication rules. No new routes or unreviewed product claims are introduced by this SEO change.
- Sitemap `lastModified` is omitted until a reliable significant-content-change date is available for each URL. Build time is not a content modification date. [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- Retain the existing draft exclusions for legacy `/finishes`, `/materials/uhpc-panels`, `/resources/*` and other unreviewed pages. These should receive a separate evidence/content review before publication.
- If an excluded draft URL already appears in Search Console, review its removal/indexing state separately: Google cannot read a `noindex` directive when robots.txt blocks crawling. The present change preserves the existing publication policy. [Google noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing)

## Product claims to preserve

- Cladvera is a supplier. Do not invent manufacturing, local stock, customers, certifications, prices, warranty years or delivery promises.
- Compactwood's interior board is not confirmed as HPL. Its legacy URL contains “hpl”, but the visible topic remains interior decorative boards and the construction qualifier stays visible.
- ALMINE's public range is metal composite/MCM. Confirm the face metal and gauge before describing a particular offered SKU as aluminum composite/ACM.
- “A2” is a manufacturer product designation here. It does not establish North American wall-assembly approval.
- Manufacturer references, performance statements and imagery must retain attribution. Related material or application links do not establish performance equivalence.

## Review after deployment

Inspect representative home, collection, product and workflow URLs for the intended canonical, title, description, single H1 and working internal links. Confirm the sitemap includes only the intended reviewed indexable routes. Once Search Console data is available, evaluate queries and landing pages by the topic groups above; use actual impressions, clicks and indexing reports to prioritize future content.
