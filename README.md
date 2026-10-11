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

The site deploys to the Vercel team `ori-project-workspace` (https://vercel.com/ori-project-workspace, owner account `f1frp2015-6628`) as its own project, `cladvera`. The same team hosts f1composite: never deploy this site into that project or any other existing project, and never into another Vercel account or team.

1. Open https://vercel.com/new, select `ori-project-workspace` in the account switcher, and import `f1frp2015-gif/cladvera` as a new project named `cladvera`. Framework preset: Next.js. Root Directory: `./`. No build settings to change.
2. Add the environment variables from `.env.example`. None are required for the first deploy; without `RESEND_API_KEY` and `INQUIRY_NOTIFY_EMAILS` the forms accept submissions and log them to the function logs instead of emailing.
3. The site starts in draft stage: a pre-launch banner shows, every page is `noindex`, and `robots.txt` disallows crawling. Set `NEXT_PUBLIC_SITE_STAGE=live` on the Production environment only after the placeholder data below is replaced.
4. After attaching a domain, set `NEXT_PUBLIC_SITE_URL` to it so canonical URLs, the sitemap and structured data use the domain.

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
