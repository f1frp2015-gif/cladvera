# Cladvera — Architectural visual identity

## Direction

An architectural monograph: precise grid, generous negative space, large type, numbered material plates and a restrained palette. The website presents material selection and project supply for architects and project teams.

## Identity

- **Mark:** two orthogonal, open C forms suggesting nested facade planes. Use the same geometry in the header, footer, favicon and social sharing image.
- **Wordmark:** uppercase CLADVERA; a small “Architectural materials” descriptor in the header. The footer uses the wordmark as a large signature.
- **Headline:** “Material shapes architecture.” Keep descriptive facade-panel and interior-surface context nearby.

## Palette

| Role | Colour |
| --- | --- |
| Limestone / page | `#f6f4ef` |
| Stone / image plates | `#eeece5` |
| Charcoal / type and dark fields | `#242722` |
| Secondary text | `#565a52` |
| Small muted text | `#656a60` |
| Terracotta / editorial accent | `#984b37` |
| Light accent / dark-field focus | `#d6ad99` |

Use colour sparingly. Charcoal is the primary action colour; terracotta signals links, indices and emphasis. Maintain visible keyboard focus on both light and dark fields.

## Typography and grid

- Self-hosted DM Sans for navigation, body and primary headings; DM Mono for plate numbers and micro-labels.
- System editorial serif stack (Iowan Old Style / Palatino / Georgia) for selected italic headline phrases. Exact serif appearance follows the visitor’s available fonts; no third-party font request is required.
- Maximum container width 1440 px; side margins 20 / 32 / 48 px.
- Thin rules, square corners, open layouts. Avoid excessive boxed cards or decorative shadows.
- The homepage pairs a large material reference with a narrower design narrative. The application page alternates image and review columns; the finder uses consistent archive entries so comparison remains practical.

## Images and interaction

Use source-backed manufacturer imagery. Keep attribution next to each image and label illustrative material representations as illustrations. Decorative drafting diagrams are abstract graphic elements, not engineering drawings or supplied product specifications.

The homepage uses an existing high-resolution TAKTL reference with responsive Next.js image optimisation. Never represent a manufacturer reference as a Cladvera-delivered project.

Retain native filter controls, clear link labels, 44 px primary touch targets, keyboard menu dismissal and reduced-motion support. Collapse paired image/text layouts into one readable mobile sequence.

## Design-intent homepage

The hero introduces architectural UHPC through an attributed TAKTL reference and a direct link to its facade-element family. Keep the six canonical material/component links available before the editorial explorer; design intent supplements the material taxonomy.

The four material studies in `content/data/design-directions.ts` each combine a design question, a source-labelled image or illustration, named candidate products and a short project-review prompt:

| Study | Candidate families | Image treatment |
| --- | --- | --- |
| Mineral & tactile | TAKTL facade elements and KORSA aggregate panels | TAKTL KORSA reference |
| Precise & planar | ALMINE A2 metal composite panel | Clearly labelled material illustration |
| Warm & layered | Compactwood exterior HPL and interior decorative board | Attributed Compactwood facade reference; finish and product scope require confirmation |
| Sculptural & custom | Custom GFRP and TAKTL custom UHPC | Attributed supplier presentation reference |

These are editorial starting points, not finish SKUs, performance recommendations or claims of material equivalence. Exterior and interior constructions remain distinct. Each study links to its candidate detail pages, primary collection and a comparison containing those product IDs.

Use four tabs on desktop and a two-column tab grid on smaller screens. The explorer exposes selected tabs and associated panels, supports Left/Right and Home/End keys, and keeps inactive panels hidden. Preserve source captions when changing studies.

## Product dossiers and technical library

TAKTL and ALMINE product pages use a material-dossier structure: overview plate, manufacturer facts or descriptions, design/project considerations, and documents. A numbered section index stays beneath the main header; it scrolls horizontally on narrow screens. Anchor spacing must account for both navigation bars.

Keep manufacturer facts in ruled definition lists and project considerations in open numbered rows. A source-file link and a request for project-specific evidence are separate actions. Use the actual manufacturer photograph where available and retain the explicit illustration label on ALMINE representations. Related families, sample requests and pricing requests retain their product identity.

The technical library follows the same open register language. Search and native filters sit above numbered product rows with three information groups: product identity, document access, and what to confirm for the project. On mobile, stack these groups without turning each row into a dense card. Show the result count, removable filter labels, reset action and an informative empty state.

“Source file linked” means that the catalogue has a document URL. A manufacturer webpage alone does not establish a linked file, current certification or complete review package. The four review-package groups cover construction, performance evidence, installation interfaces, and samples/closeout.

## Application-led exploration

The application index preserves five destinations: facade, interior, transit, healthcare and custom forms. Each numbered application study combines a candidate-material visual, the existing design/technical considerations and compact family links. Alternate the image and text columns on desktop and use a single column on mobile.

The facade and custom studies use attributed manufacturer/supplier imagery; the interior study uses a manufacturer construction diagram. Transit and healthcare retain labelled illustrations. These references introduce candidate materials and must not be presented as Cladvera-delivered projects or proof of project suitability.

Each application has two clear onward actions: browse products filtered to that application and open the technical register with the same application filter. Retain the result anchors so the visitor lands at the relevant list rather than repeating the page introduction.

## Implemented surfaces

Homepage and design explorer, application studies, TAKTL/ALMINE product dossiers, technical document register, product finder, comparison/request workflow, architect workflow, shared page headers/sections/actions, navigation, footer, favicon and social sharing image. Canonical material routes and the existing publication policy remain in use.

## Material review and enquiry

Extend the archive language through the full selection process: image plates and a ruled factor matrix on desktop, one readable material at a time on mobile. Use the same material indices across the archive and comparison view.

An understated charcoal shortlist bar keeps the next action visible while browsing. Respect device safe areas and reserve scroll space for keyboard focus. Active filter labels are removable and return the visitor to the results.

Project requests use three numbered, open sections: selection, project brief, and review. Distinguish contact, schedule and technical fields. Preparing a brief focuses its preview; editing invalidates it. Reviewing materials opens a separately labelled tab so the brief stays in place.
