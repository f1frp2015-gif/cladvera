# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions and file structure may differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing code, and heed deprecation notices.

# Rules for this site

- Never invent facts: certifications, report numbers, laboratories, projects, customers, prices, stock or warranty years. Use "TBC", "in progress" or "planned" until a verified source exists.
- The company is a supplier, not a manufacturer. Never imply US or Canadian manufacturing or stock. Duties and taxes are payable by the importer. Not for Buy American, BABA or Buy Canadian projects.
- Every new page is added to `routes` in `content/data/navigation.ts`; `npm test` fails otherwise.
- Titles at most 60 characters, descriptions 120 to 160; the build enforces both.
- Run `npm run lint`, `npm run typecheck` and `npm run build` before pushing.
