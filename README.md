# Cladvera

B2B site for architectural panels supplied from China to fabricators, distributors and contractors in the United States and Canada: exterior phenolic (HPL) compact panels, UHPC facade panels, aluminum composite (ACM) panels, real-wood veneer panels and interior HPL.

"Cladvera" is a working name pending trademark clearance. Positioning, keywords and page plan come from `docs/research/北美装饰板材B2B独立站定位与关键词.md` in the f1composite repository.

Stack: Next.js 16.2.9 App Router, React 19, Tailwind CSS v4, TypeScript, deployed on Vercel. Read `AGENTS.md` before changing code.

## Local development

```bash
npm ci
npm run dev        # http://localhost:3000
```

## Checks

```bash
npm run lint
npm run typecheck
npm test               # route registry vs app/**/page.tsx
npm run build          # fails if a title is over 60 chars or a description is outside 120 to 160
```

## Deploying on Vercel

Use the existing [Cladvera project](https://vercel.com/ori-project-workspace/cladvera) in the Vercel team `ori-project-workspace` (owner account `f1frp2015-6628`). It is connected to GitHub `f1frp2015-gif/cladvera`, with production branch `main`, the Next.js framework preset and Root Directory `./`. Never deploy this site into f1composite, another project, account or team.

1. Create a `codex/` branch from `origin/main`, make the change and run the checks above. Commit and push the branch to GitHub, then open a pull request targeting `main`.
2. Review the Vercel preview deployment and verify the changed pages before merging the pull request.
3. Merge the reviewed pull request into `main` to trigger the production deployment. Production releases go through this GitHub workflow; do not run `vercel --prod` from a local tree.

The canonical public origin defaults to `https://cladvera.com` in `content/data/site.ts`. If `NEXT_PUBLIC_SITE_URL` is configured for Production, set it to `https://cladvera.com` without a trailing slash. This build-time value supplies canonical URLs, social metadata, structured data, the sitemap and the text index; changing it requires a new deployment build.

Public rendering follows the reviewed-route allowlist in `content/data/publication.ts`. Only reviewed routes also marked indexable in `content/data/navigation.ts` enter the sitemap and receive indexable metadata. Request and comparison workflows remain `noindex`, and unreviewed legacy pages remain unavailable. `NEXT_PUBLIC_SITE_STAGE` controls the draft notice only; changing it does not publish unreviewed pages or change this indexing policy.

## Before going live

Placeholder data is marked in the source and on the pages:

- `content/data/site.ts`: legal entity, address, contact email, phone and WhatsApp (TBC values).
- `content/data/materials.ts`: specification rows carry `confirmed: false` until checked against the mill data sheet; stock, MOQ and lead times are TBC.
- `content/data/finishes.ts`: every finish is a placeholder code with a CSS swatch; replace with real SKUs and photographs.
- `content/data/compliance.ts`: every cell is in progress, planned or not applicable; a cell becomes "available" only with a report number, laboratory and assembly description.
- `app/warranty/page.tsx`: draft terms with `[years TBC]`.

## Where things live

- `content/data/`: site facts, regions (US and Canada notes), materials, finishes, compliance matrix, navigation and the route registry.
- `components/pages/MaterialPage.tsx`: the shared material page template.
- `components/region/`: the US / Canada switch. Both variants render in the HTML; CSS hides the inactive one.
- `components/forms/`: sample and quote forms, posting to `app/api/inquiries/route.ts` (Resend email, rate limit, honeypot).
- `lib/seo.ts`: metadata with length guards and draft-stage noindex; JSON-LD helpers.
- `app/llms.txt`, `app/sitemap.ts`, `app/robots.ts`: generated from the data files.
