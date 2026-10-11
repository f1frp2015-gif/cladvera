# Cladvera product discovery and procurement architecture

## Purpose

Help architects define an appropriate product and help buyers request a comparable, actionable quotation. The public journey connects discovery, samples, technical evidence and procurement while retaining the identity of the selected manufacturer product.

The journey adapts staged project information practices described in the [RIBA Plan of Work](https://www.riba.org/work/insights-and-resources/riba-plan-of-work/) and the connection between product research and specification described by [NBS Source](https://www.thenbs.com/products/nbs-source). This is a navigation and content design choice, not RIBA or NBS certification, a mandated procurement method, or a claim that a product is approved. Project contracts and appointed design professionals determine the actual review and procurement requirements.

## Public navigation

| Entry | Visitor question | Main next step |
| --- | --- | --- |
| Products | Which families match my material or application? | Product details or comparison |
| Applications | What can I explore for this building use? | Filtered product list |
| Compare | How do the shortlisted families differ? | Samples, documents or project request |
| Architects | How do I turn design intent into a specification basis? | Samples and technical review |
| Procurement | What should I define before requesting or accepting a quote? | Project request |
| Technical resources | What evidence exists, and what must I request? | Source file or contextual document request |
| Samples / Request a quote | How do I continue with these selected products? | A request retaining product identity |

The homepage is the common entry point for all manufacturers. Existing product and supplier URLs remain stable. Manufacturer collections provide an additional browse path alongside material and application discovery.

## Taxonomy

Use separate attributes for material, application, manufacturer and selection type. They answer different questions.

| Material category | Families and scope |
| --- | --- |
| Architectural UHPC | TAKTL base facade panels, KORSA, SOLA and custom elements |
| Metal composite | ALMINE architectural A2, tunnel/traffic and medical families; confirm face metal for the ordered construction |
| Exterior HPL | Compactwood wood-fiber facade board |
| Interior decorative board | Compactwood paste special board; HPL classification remains unconfirmed |
| GFRP | Custom molded architectural elements described by the supplied source |
| Attachment hardware | TAKTL components, considered with their compatible panel assembly |

Application IDs are `facade`, `interior`, `transit`, `healthcare` and `custom`. Application membership is a discovery aid based on available source descriptions. It is not a suitability approval.

The shared catalogue registry is the source for discovery cards, application groupings, comparison and contextual request links. Its entries retain stable product IDs and canonical product URLs. Product source data remains the source for technical detail.

Do not use unverified fire ratings, stock, prices or lead times as filters. Specialty surfaces and custom-development families are identified as such. Hardware is not an interchangeable panel material.

## Architect journey

1. Define the use, location, exposure and design intent.
2. Compare construction, appearance, geometry, attachment and documentation.
3. Request a physical sample or mock-up appropriate to the design decision.
4. Match evidence to the exact product and proposed assembly; coordinate responsibilities and interfaces.
5. Transfer the product/finish schedule, drawing revisions, quantities and open items to procurement.

Each stage records an input, a decision and an output. Sampling, technical coordination and budgeting may overlap; the interface must not imply a rigid contractual stage sequence.

## Procurement journey

1. Buyer prepares a defined RFQ, marking estimates and unresolved selections.
2. Supplier and manufacturer confirm the offered construction and available scope.
3. Buyer compares quotations on a common product, quantity, preparation and delivery basis.
4. Project team resolves technical documents, samples, drawings and release conditions.
5. Buyer and supplier record order scope, schedule, inspection, packaging and change process.
6. Receiving team records delivery inspection and obtains the agreed closeout information.

Custom UHPC and GFRP require geometry, modules, fixing interfaces, development scope, tooling and prototype expectations to be addressed before production release. Public pages explain what to discuss without asserting that a particular service or performance is already included.

## Internal-link requirements

- Every product has a discoverable catalogue entry, collection breadcrumb, relevant application path and contextual sample/document/quote actions.
- Application hubs link to both filtered discovery and the included product details.
- Technical resources link directly to identified source documents; products without a file use a contextual document request.
- Architect and procurement hubs connect both ways and link to the same product finder, comparison and request flow.
- Requests retain selected product IDs, names and intent. A document request must not become an unlabelled general sales inquiry.
- Related choices explain the application or compatibility connection. Cross-material alternatives require project review; hardware links describe the panel relationship.

## Publishing and acceptance

Keep route registration, navigation, publication whitelist, metadata, robots, sitemap and machine-readable links aligned. Do not expose unrelated draft pages by changing the whole site to live. Legacy URLs remain available while public journeys link to reviewed content.

Acceptance scenarios:

1. An architect finds exterior families, compares them, opens a named product and starts a sample or document request with that product retained.
2. A buyer moves from a selected family through the RFQ checklist to a request containing product identity, quantity, drawing references and delivery needs.
3. A visitor reaches any published product from the common catalogue without knowing the manufacturer beforehand.
4. An interior visitor can distinguish Compactwood's decorative board from the confirmed exterior HPL family.
5. Custom-element enquiries carry geometry and development questions; hardware is presented with compatible panel coordination.
6. Every primary link resolves to a published reviewed page; mobile and keyboard navigation expose the same destinations.
7. Document labels distinguish linked source files from requested information, with no invented availability or test status.

## Content maintenance

Add new families to the catalogue only after their product page and source record are ready. Update application membership, document links and comparison wording when source evidence changes. Record unsupported values as requiring confirmation. Avoid global origin or delivery statements that incorrectly apply one manufacturer's circumstances to another.

## Verification record — 2026-10-08

The production build was served locally and checked before deployment. This records the verified build, not a claim about a later production deployment.

### HTTP, links and metadata

- All 24 reviewed routes returned HTTP 200: 21 sitemap routes plus comparison, samples and project requests.
- The sitemap matched the reviewed indexable route set exactly, without duplicates. Comparison and request pages were excluded.
- Each reviewed page had one H1, a title within the 60-character limit, a description within 120–160 characters, the expected canonical URL and the intended index/noindex metadata. The root canonical without a trailing slash resolves to the same root URL.
- No reviewed page rendered the legacy draft notice.
- All 945 internal anchor occurrences targeted the 24 reviewed pages or the linked local document. Query parameters were permitted for catalogue filters and contextual requests; all 26 internal fragment references resolved to an existing target ID.
- The GFRP PDF returned HTTP 200 with `application/pdf` and a valid PDF signature. All three source JPEGs and their three rendered image-optimization URLs returned HTTP 200 with nonempty image content.
- External manufacturer sites were outside this bounded audit.

### Browser journey and layout checks

- Desktop homepage screenshot reviewed. Filtering to GFRP returned one family; resetting filters restored the visible controls to All.
- Adding GFRP and Compactwood exterior HPL produced a two-product comparison. Reloading retained both selections.
- The quotation request retained both selected products. Its prepared email preview included both canonical product names and URLs, plus entered custom geometry. No inquiry email was sent.
- At a 390-pixel viewport, mobile navigation exposed the intended destinations and closed after navigation. The applications page content width matched the viewport without horizontal overflow.
- Browser console checks returned no errors or warnings. All three GFRP images were complete with positive natural width, and the GFRP page screenshot was reviewed.

### Build checks

ESLint, TypeScript, all six catalogue/route tests and the final Next.js production build passed. Two issues found during review were corrected before these checks: stale filter controls after client navigation and loss of the current request selection when opening comparison.
