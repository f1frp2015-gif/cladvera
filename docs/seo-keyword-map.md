# Cladvera keyword and internal-link map

Updated: 2026-10-10

## Scope and evidence

This map assigns search intent to the reviewed product catalogue. It does not claim keyword search volume, current rankings, traffic forecasts or a ranking improvement. Those need Search Console and keyword research data that were not available for this change.

The catalogue currently contains 11 product families in six material/component categories. The reviewed publication set contains 26 routes, of which 23 are indexable. The comparison page and request forms remain outside the sitemap. Unreviewed legacy content is now stopped by server-side publication guards and returns HTTP 404. Known legacy URLs remain crawlable so search engines can observe their status.

## Export SEO / GEO research

The 2026-10-09 export round adds a source-backed [English research report](architectural-panel-export-search-research.md) and [166-row keyword/question CSV](seo-geo-keywords.csv), covering 23 topic clusters. Priorities are relevance and evidence decisions, not measured search volume or ranking forecasts. CSV variants represent semantic intent; they are not a requirement to repeat every phrase verbatim.

| New canonical route | Exclusive primary intent | Content and onward paths |
| --- | --- | --- |
| `/sourcing/china` | China-sourced architectural panel supplier / sourcing and import preparation | Four material RFQ groups, six named China-sourcing candidates, quote scope, origin vs dispatch, US/Canada official import sources and buyer answers. TAKTL is explicitly separate. |
| `/guides/facade-materials` | ACM/MCM, HPL, UHPC and GFRP/GRP material comparison | Comparison matrix, definitions, exact construction questions, manufacturer sources and material/page links. Interior decorative board remains distinct. |

Primary navigation exposes the sourcing hub under Procurement. Homepage, footer, procurement, architects, technical resources and product journeys link these pages where relevant. Each reviewed non-TAKTL product has a China-sourcing planning link; TAKTL retains its separate manufacturer route. The four China-associated collection pages add 16 product-family buyer answers. Both new pages add six answers each, for 28 new visible questions with matching FAQ schema. FAQ markup is descriptive; no rich-result or AI citation benefit is promised.

## Primary page map

| Canonical route | Primary topic | Supporting language / intent | Useful onward links |
| --- | --- | --- | --- |
| `/` | Facade panel supplier and architectural materials | US/Canada project inquiries, China-sourced core ranges, separate TAKTL collection, design intent, material selection | Six material/component destinations; named study candidates; comparison; applications; architects; procurement |
| `/products` | Architectural panel product finder | Browse by material, application and manufacturer; compare products | Canonical collections and product detail pages; shortlist |
| `/suppliers/taktl` | Architectural UHPC facade panels | TAKTL, ultra-high performance concrete, concrete textures, aggregate panels | TAKTL facade elements, KORSA, SOLA, custom elements and hardware |
| `/materials/acm-panels` | Metal composite panels | ALMINE, MCM, ACM terminology, architectural metal panels | A2, transit/tunnel and medical product families |
| `/materials/exterior-hpl-panels` | Exterior HPL facade panels | Compactwood, wood-fiber laminate, facade cladding | Wood-fiber HPL product detail; interior collection |
| `/materials/interior-hpl-panels` | Interior decorative wall and ceiling boards | Compactwood, high-pressure-cured decorative boards, interior surfaces | Paste Special Board product detail; exterior HPL collection |
| `/materials/gfrp-custom-elements` | Custom GFRP architectural elements | Molded forms, facade elements, project geometry, tooling and mock-ups | Custom application section; procurement; selected-product request |
| `/suppliers/taktl/hardware` | TAKTL panel attachment components | Rails, clips, anchors, fasteners, coordinated attachment engineering | TAKTL collection and compatible panel families |
| `/applications` | Facade and interior panel applications | Exterior cladding, walls and ceilings, transit, healthcare, custom forms | Application-specific product details, product results and technical-resource results |
| `/architects` | Architectural panel selection and specification | Finish samples, material comparison, assembly evidence, design intent | Named material collections; technical documents; procurement |
| `/procurement` | Architectural panel procurement and RFQ | Drawings, quantities, quoted scope, approvals, delivery | Product finder; custom UHPC and GFRP; technical documents; quote request |
| `/technical-resources` | Architectural panel technical documents | Search manufacturer literature, product data, test reports and attachment details; distinguish linked files from documents by request | Product details, canonical collections, identified source files, manufacturer context and product-specific document requests |

The map treats collection pages as material overviews and detail pages as individual products. Product names and verified manufacturer terminology remain the focus of detail-page titles. Avoid making every page compete for the same generic “facade panels” phrase.

The implemented homepage title is **Facade Panel Supplier & Architectural Materials | Cladvera**. Its H1 is **Material shapes architecture.** The eyebrow identifies facade panels and architectural surfaces; the introduction names facade panels, interior boards and custom elements. UHPC, metal composite, HPL and GFRP remain explicit in the collection navigation, which links directly to reviewed material destinations. The hero also links directly to `/suppliers/taktl/facade-elements`.

## Homepage design-intent paths

The four studies add descriptive context around specific products without creating new landing pages or changing the material classifications. Their labels are editorial navigation, not keyword-volume findings or performance recommendations.

| Design direction | Named product destinations | Primary collection |
| --- | --- | --- |
| Mineral & tactile | `/suppliers/taktl/facade-elements`, `/suppliers/taktl/korsa-aggregate` | `/suppliers/taktl` |
| Precise & planar | `/materials/acm-panels/a2-fireproof` | `/materials/acm-panels` |
| Warm & layered | `/materials/exterior-hpl-panels/wood-fiber-facade`, `/materials/interior-hpl-panels/paste-special-board` | `/materials/exterior-hpl-panels` |
| Sculptural & custom | `/materials/gfrp-custom-elements`, `/suppliers/taktl/custom-elements` | `/materials/gfrp-custom-elements` |

Each study includes a comparison link populated with the named candidate product IDs. The six material/component collection links and full product archive remain available independently of the studies. Pairing two materials does not assert equivalence or reclassify the Compactwood interior board as HPL.

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

TAKTL and ALMINE product dossiers retain these canonical URLs and their manufacturer-specific metadata. Their in-page directories use `#product-overview`, `#product-details`, `#product-design` and `#product-documents`; these are section anchors, not separate indexable pages. The document section connects the product to its manufacturer source, any identified source file and a request carrying its product ID and `intent=documents`.

## Application-to-evidence paths

The five existing application anchors retain their review considerations and all candidate-family links. Each now provides matching product and technical-document results:

| Application context | Product results | Technical-resource results |
| --- | --- | --- |
| `/applications#facade` | `/products?application=facade#catalog-results` | `/technical-resources?application=facade#resource-results` |
| `/applications#interior` | `/products?application=interior#catalog-results` | `/technical-resources?application=interior#resource-results` |
| `/applications#transit` | `/products?application=transit#catalog-results` | `/technical-resources?application=transit#resource-results` |
| `/applications#healthcare` | `/products?application=healthcare#catalog-results` | `/technical-resources?application=healthcare#resource-results` |
| `/applications#custom` | `/products?application=custom#catalog-results` | `/technical-resources?application=custom#resource-results` |

Candidate imagery, diagrams and labelled illustrations provide context. They do not establish that a particular project was delivered by Cladvera or that the proposed material meets the project's requirements.

## Technical-library search and filters

`/technical-resources` supports a native GET form with four parameters:

| Parameter | Meaning |
| --- | --- |
| `q` | Search product/manufacturer names, material/application labels, construction and document descriptions. Search normalizes case, accents and punctuation; all nonempty terms must match. |
| `category` | A catalogue category: `uhpc`, `mcm`, `hpl`, `interior-board`, `gfrp` or `hardware`. |
| `application` | One of the five application IDs in the table above. |
| `availability` | `linked` for a populated document URL, or `request` when no source file is linked. |

Submitting, removing a filter or resetting returns to `#resource-results`. Each register row links to the canonical product and collection, distinguishes the source file from manufacturer/supplier context, and offers a product-specific document request. An empty result keeps clear/reset and document-assistance actions available. Linked-file availability is not a statement that all reports, CAD/BIM files or project approvals are available.

For example, `/technical-resources?application=facade&availability=linked#resource-results` narrows the register to facade candidates with source files linked. The canonical page remains `/technical-resources`; filter combinations and result anchors are not additional sitemap entries or SEO landing pages.

## Internal-link structure

1. Homepage and main material navigation link to canonical collection/product destinations from `catalogCategories[].path`. The design explorer adds named product links and candidate comparisons.
2. Collection pages link to their named product families. Product pages retain breadcrumbs and contextual collection backlinks when the collection is a different URL. Dossier section directories lead to facts, design review and documents within the same product page.
3. Application studies link to actual candidate products and to the corresponding filtered product and document results. Product application chips return to `/applications#facade`, `#interior`, `#transit`, `#healthcare` or `#custom` for selection context.
4. The architects page links directly to material collections in explanatory prose. Procurement links to the specific UHPC and GFRP custom-element destinations.
5. Product journeys retain related products and compatible TAKTL hardware. Shared application tags are explicitly not a claim of equivalence.
6. Sample, quote and document requests retain their product IDs so the request matches the selection.
7. The technical register links evidence back to its named product and material collection, then carries product identity into document requests. Use the application filter to preserve the visitor's design context between the application page and register.

Filtered finder and technical-library URLs remain useful for selection. They are not separate SEO landing pages: canonical metadata points to `/products` or `/technical-resources` respectively, the sitemap lists the base URLs, and the existing publication/robots policy remains in place. Primary material navigation therefore uses the reviewed landing page instead of relying on a filter URL. [Google's faceted-navigation guidance](https://developers.google.com/crawling/docs/faceted-navigation) explains the crawl-management considerations for filters.

Use short, meaningful anchor text in normal sentences. A named material or product should lead to that material or product, while a filtering action should say that it filters. Google recommends crawlable anchor links, descriptive text and contextual internal links; it discourages forcing keywords into anchors. [Google link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)

## Metadata and crawl handling

- Title, visible H1 and introductory copy should describe the same page intent. Preserve readable English rather than repeated keyword variants. Titles remain at most 60 characters and descriptions remain 120–160 characters under the repository rules. Google may generate a different result title using page and link content. [Title-link guidance](https://developers.google.com/search/docs/appearance/title-link)
- Canonical URLs, metadata, robots and sitemap follow the reviewed publication list in both draft and live environments. The export SEO round adds `/sourcing/china` and `/guides/facade-materials`; it does not release legacy draft routes.
- Sitemap `lastModified` is omitted until a reliable significant-content-change date is available for each URL. Build time is not a content modification date. [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- Legacy `/finishes`, `/materials/uhpc-panels`, `/resources/*` and other unreviewed pages return HTTP 404. These require a separate evidence/content review before publication.
- Known retired URLs and the `/materials` and `/for-contractors` redirect sources are crawlable so Google can observe HTTP 404/308. Query facets remain blocked. Monitor recrawling in Search Console; robots.txt alone does not remove an indexed URL. [Google noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing)

## Product claims to preserve

- Cladvera is a supplier. Do not invent manufacturing, local stock, customers, certifications, prices, warranty years or delivery promises.
- Compactwood's interior board is not confirmed as HPL. Its legacy URL contains “hpl”, but the visible topic remains interior decorative boards and the construction qualifier stays visible.
- ALMINE's public range is metal composite/MCM. Confirm the face metal and gauge before describing a particular offered SKU as aluminum composite/ACM.
- “A2” is a manufacturer product designation here. It does not establish North American wall-assembly approval.
- Manufacturer references, performance statements and imagery must retain attribution. Related material or application links do not establish performance equivalence.

## Review after deployment

Inspect representative home, collection, product and workflow URLs for the intended canonical, title, description, single H1 and working internal links. Confirm the sitemap includes only the intended reviewed indexable routes. Once Search Console data is available, evaluate queries and landing pages by the topic groups above; use actual impressions, clicks and indexing reports to prioritize future content.

## URL audit and October 10 refinement

The [55-URL scorecard and architecture audit](seo-audit/README.md) record the before/after technical checks separately from editorial review. The product finder now has a CollectionPage entity; product and application selection link to the material guide; procurement links to sample approval, specification notes and the review package. Eight TAKTL/ALMINE details have family-specific review guidance, and the interior detail uses a clearer wall-and-ceiling-board title while preserving Paste Special Board as its manufacturer identity.
