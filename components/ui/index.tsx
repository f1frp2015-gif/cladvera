import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo";
import type { Faq as FaqItem, SpecRow } from "@/content/data/materials";
import type { ComplianceStatus } from "@/content/data/compliance";
import type { DocumentStatus } from "@/content/data/materials";

/* ------------------------------------------------------------------ */
/* Buttons and links                                                   */
/* ------------------------------------------------------------------ */

type CtaVariant = "primary" | "secondary" | "ghost";

const ctaClasses: Record<CtaVariant, string> = {
  primary:
    "bg-ink text-paper hover:bg-accent border border-ink hover:border-accent",
  secondary:
    "bg-paper text-ink border border-line-strong hover:border-ink",
  ghost: "text-ink hover:text-accent border-b border-line-strong hover:border-accent px-0",
};

export function Cta({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: CtaVariant;
  className?: string;
}) {
  const base =
    variant === "ghost"
      ? "inline-flex min-h-[44px] items-center gap-[24px] text-f14 font-medium transition-colors"
      : "inline-flex min-h-[48px] items-center justify-center gap-[22px] rounded-control px-[22px] py-[12px] text-f14 font-medium transition-colors";
  return (
    <Link href={href} className={`${base} ${ctaClasses[variant]} ${className}`}>
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Page header and sections                                            */
/* ------------------------------------------------------------------ */

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: "Home", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="text-f12 text-ink-3">
      <JsonLd data={buildBreadcrumbSchema(all)} />
      <ol className="flex flex-wrap items-center gap-[6px]">
        {all.map((crumb, index) => {
          const last = index === all.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-[6px]">
              {last ? (
                <span aria-current="page" className="text-ink-2">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} className="hover:text-ink">
                  {crumb.name}
                </Link>
              )}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lede,
  actions,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  actions?: React.ReactNode;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <header className="page-intro border-b border-line bg-paper">
      <div className="site-container pb-[48px] pt-[24px] md:pb-[72px] md:pt-[32px]">
        {crumbs && <div className="mb-[40px] border-b border-line pb-[24px] md:mb-[56px]"><Breadcrumbs items={crumbs} /></div>}
        {eyebrow && (
          <p className="eyebrow mb-[16px]">{eyebrow}</p>
        )}
        <h1 className="max-w-[1020px] text-[40px] font-normal leading-[1.04] tracking-[-0.055em] md:text-[64px] lg:text-[76px]">{title}</h1>
        {lede && <p className="mt-[28px] max-w-[700px] text-f18 text-ink-2">{lede}</p>}
        {children}
        {actions && <div className="mt-[24px] flex flex-wrap gap-[12px]">{actions}</div>}
      </div>
    </header>
  );
}

export function Section({
  id,
  title,
  lede,
  tone = "default",
  children,
  className = "",
}: {
  id?: string;
  title?: string;
  lede?: string;
  tone?: "default" | "muted" | "dark";
  children: React.ReactNode;
  className?: string;
}) {
  const toneClass =
    tone === "muted" ? "bg-paper-2" : tone === "dark" ? "bg-slate text-paper" : "bg-paper";
  return (
    <section id={id} className={`${toneClass} ${className}`}>
      <div className="site-container py-[48px] md:py-[80px]">
        {title && (
          <div className="mb-[32px] max-w-[800px]">
            <h2 className="text-[30px] font-normal leading-[1.12] tracking-[-0.045em] md:text-[42px]">{title}</h2>
            {lede && <p className={`mt-[10px] text-f16 ${tone === "dark" ? "text-paper/80" : "text-ink-2"}`}>{lede}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Badges                                                              */
/* ------------------------------------------------------------------ */

type BadgeTone = "ok" | "pending" | "warn" | "neutral" | "accent";

const badgeClasses: Record<BadgeTone, string> = {
  ok: "bg-ok-bg text-ok",
  pending: "bg-pending-bg text-pending",
  warn: "bg-warn-bg text-warn",
  neutral: "bg-paper-3 text-ink-2",
  accent: "bg-accent-bg text-accent",
};

export function Badge({ tone = "neutral", children }: { tone?: BadgeTone; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-tag px-[8px] py-[2px] font-mono text-f12 font-medium uppercase tracking-[0.04em] ${badgeClasses[tone]}`}>
      {children}
    </span>
  );
}

const statusTone: Record<ComplianceStatus | DocumentStatus, BadgeTone> = {
  available: "ok",
  unverified: "warn",
  "in-progress": "pending",
  planned: "neutral",
  "not-applicable": "neutral",
};

const statusText: Record<ComplianceStatus | DocumentStatus, string> = {
  available: "Available",
  unverified: "Not verified",
  "in-progress": "In progress",
  planned: "Planned",
  "not-applicable": "Not applicable",
};

export function StatusBadge({ status }: { status: ComplianceStatus | DocumentStatus }) {
  return <Badge tone={statusTone[status]}>{statusText[status]}</Badge>;
}

/* ------------------------------------------------------------------ */
/* Tables, FAQ, callouts, cards                                        */
/* ------------------------------------------------------------------ */

export function SpecTable({ rows, caption }: { rows: SpecRow[]; caption?: string }) {
  const hasUnconfirmed = rows.some((r) => !r.confirmed);
  return (
    <div className="overflow-x-auto rounded-card border border-line">
      <table className="spec-table w-full text-f14">
        {caption && <caption className="px-[16px] py-[10px] text-left text-f12 text-ink-3">{caption}</caption>}
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-line first:border-t-0">
              <th scope="row" className="w-[220px] bg-paper-2 px-[16px] py-[10px] text-left font-medium text-ink">
                {row.label}
              </th>
              <td className="px-[16px] py-[10px] text-ink-2">
                {row.value}
                {!row.confirmed && (
                  <span className="ml-[8px] align-middle"><Badge tone="warn">To confirm</Badge></span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasUnconfirmed && (
        <p className="border-t border-line bg-paper-2 px-[16px] py-[8px] text-f12 text-ink-3">
          Rows marked “to confirm” are planned values; the data sheet for the ordered SKU governs.
        </p>
      )}
    </div>
  );
}

export function Faq({ items, title = "Frequently asked questions", schema = true }: { items: FaqItem[]; title?: string; schema?: boolean }) {
  return (
    <div>
      {schema && <JsonLd data={buildFaqSchema(items)} />}
      <h2 className="mb-[20px] text-f24 font-semibold">{title}</h2>
      <dl className="divide-y divide-line rounded-card border border-line">
        {items.map((item) => (
          <div key={item.q} className="px-[20px] py-[16px]">
            <dt className="text-f16 font-semibold">{item.q}</dt>
            <dd className="mt-[6px] text-f14 text-ink-2">{item.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Callout({
  title,
  tone = "neutral",
  children,
}: {
  title?: string;
  tone?: "neutral" | "accent" | "warn";
  children: React.ReactNode;
}) {
  const toneClass =
    tone === "accent"
      ? "border-accent-border bg-accent-bg"
      : tone === "warn"
        ? "border-warn/30 bg-warn-bg"
        : "border-line bg-paper-2";
  return (
    <div className={`rounded-card border px-[20px] py-[16px] text-f14 ${toneClass}`}>
      {title && <p className="mb-[6px] font-semibold text-ink">{title}</p>}
      <div className="text-ink-2">{children}</div>
    </div>
  );
}

export function LinkCard({
  href,
  title,
  description,
  meta,
}: {
  href: string;
  title: string;
  description?: string;
  meta?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col border-t border-line-strong bg-paper py-[24px] pr-[20px] transition-colors hover:border-accent"
    >
      {meta && <div className="mb-[10px] flex flex-wrap gap-[6px]">{meta}</div>}
      <h3 className="flex items-start justify-between gap-[16px] text-f20 font-medium group-hover:text-accent">{title}<span aria-hidden="true" className="text-accent">↗</span></h3>
      {description && <p className="mt-[6px] text-f14 text-ink-2">{description}</p>}
    </Link>
  );
}

export function Steps({ steps }: { steps: Array<{ title: string; body: string }> }) {
  return (
    <ol className="grid gap-[16px] md:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => (
        <li key={step.title} className="border-t border-line-strong bg-paper py-[24px] pr-[20px]">
          <p className="font-mono text-f12 font-medium text-accent">{String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-[20px] text-f20 font-medium">{step.title}</h3>
          <p className="mt-[6px] text-f14 text-ink-2">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function KeyValueList({ items }: { items: Array<{ label: string; value: React.ReactNode }> }) {
  return (
    <dl className="grid gap-x-[24px] gap-y-[12px] text-f14 sm:grid-cols-[180px_1fr]">
      {items.map((item) => (
        <div key={item.label} className="contents">
          <dt className="font-medium text-ink">{item.label}</dt>
          <dd className="text-ink-2">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
