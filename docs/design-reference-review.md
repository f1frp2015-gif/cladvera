# Architectural Website Design Reference Review

Reviewed: 10 October 2026. Scope: the user-selected ALUCOBOND, Ductal and EQUITONE websites, and the corresponding Cladvera design changes. This is a design and information-architecture review, not a comparison of product performance or supplier qualifications.

## Reference observations

| Official reference | Observed pattern | Application to Cladvera |
| --- | --- | --- |
| [ALUCOBOND Products](https://www.alucobond.com/en/products/) | Offers separate routes by brand, colour series and application, followed by product-family introductions and planning support. | Keep material collections explicit, with a second set of links for design intent, applications, samples and technical resources. Use Cladvera's existing reviewed destinations. |
| [ALUCOBOND A2](https://www.alucobond.com/en/products/by-brand/alucobond-a2/) | Distinguishes product range, technical properties and fire evidence rather than treating them as one promotional description. | Separate the initial product summary from the full material profile and project evidence. Reuse existing manufacturer facts; do not transfer ALUCOBOND values or approvals to ALMINE. |
| [Ductal](https://www.ductal.com/en) and [Ductal Cladding](https://www.ductal.com/en/cladding) | Connect architectural imagery to named solutions and applications. The cladding page provides document links alongside sections about flexibility, appearance, applications and palette. | Use a clearly attributed architectural cover and a visual collection index, then provide direct paths into product information and specification resources. |
| [EQUITONE US](https://www.equitone.com/en-us/) and [EQUITONE tectiva](https://www.equitone.com/en-us/materials-en-us/tectiva/) | Connect expressive material groups with product identity, surface descriptions, concise technical information and a prominent sample action. | Bring product identity, the visual, a short fact summary, sample requests and technical-document access together at the start of the product page. |

These observations concern content structure and navigation. The recommendations are Cladvera-specific design judgments; no usability study or conversion uplift is claimed.

## Applied changes

- **Homepage:** a full-width architectural image introduces the material library. The TAKTL attribution remains visible. Three task links lead to the product library, sample requests and technical resources.
- **Collection gallery:** six material/component collections receive visual cards linked to their canonical collection pages. Captions distinguish manufacturer photographs, supplier references, construction diagrams and the metal-composite illustration. Interior-board, GFRP and hardware visuals use contained presentation.
- **Navigation:** the desktop Products panel separates collection browsing from project tasks. Mobile navigation retains the same material destinations and adds the design-intent path. Existing scrolling, focus handling and Escape behavior remain part of the disclosure interaction.
- **Product dossiers:** the five TAKTL and three ALMINE detail pages bring the visual, product name, manufacturer, existing summary and first three manufacturer fact rows into one opening composition. Sample and technical-document actions take priority, with pricing still accessible.
- **Detailed review:** existing material profiles, source links, design/project-review sections and document sections remain below the opening. Their section IDs are retained so internal links continue to target the same information.

Primary implementation files: `app/page.tsx`, `app/globals.css`, `components/catalog/CollectionGallery.tsx`, `components/layout/Header.tsx`, `components/pages/TaktlProductPage.tsx` and `components/pages/AlmineProductPage.tsx`.

## Content and interaction safeguards

Cladvera remains a supplier. Peer certifications, performance values, local support, stock availability and free-sample offers are not adopted as Cladvera claims. TAKTL remains separate from the China-sourcing ranges. Manufacturer and supplier imagery is not presented as a Cladvera-delivered project, and illustrations do not represent physical samples.

The changes retain one page H1, the existing metadata and canonical URLs, reviewed-publication restrictions, server-rendered product information and product-specific request links. Technical documents remain linked sources or requests according to actual availability.

Source review covered heading structure, section targets, navigation destinations and attribution. Browser validation should check image-overlay contrast, narrow-screen wrapping, keyboard navigation and disclosure scrolling. Build, runtime and deployment results belong in the separate validation record; this document does not certify those checks.
