import Link from "next/link";
import { Faq, Section } from "@/components/ui";
import { materialQuestions, type MaterialQuestionKey } from "@/content/data/material-search";

export default function MaterialQuestions({ material }: { material: MaterialQuestionKey }) {
  const content = materialQuestions[material];

  return (
    <Section id="buyer-questions" tone="muted">
      <div className="grid items-start gap-[36px] lg:grid-cols-[0.7fr_1.3fr] lg:gap-[72px]">
        <aside>
          <p className="eyebrow">From material to order</p>
          <p className="mt-[20px] max-w-[380px] text-f18 text-ink-2">{content.context}</p>
          <nav aria-label="Material sourcing guides" className="mt-[28px] border-t border-line">
            {[
              { href: "/guides/facade-materials", label: "Compare facade material families" },
              { href: "/sourcing/china", label: "China panel sourcing and export scope" },
              { href: "/procurement", label: "Prepare a project procurement brief" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="flex min-h-[52px] items-center justify-between gap-[16px] border-b border-line py-[14px] text-f14 font-medium hover:text-accent">
                {link.label}<span aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
        </aside>
        <div>
          <Faq title={content.title} items={content.items} />
          <p className="mt-[20px] font-mono text-f12 uppercase tracking-[0.08em] text-ink-3">Product and terminology references</p>
          <ul className="mt-[8px] flex flex-wrap gap-x-[24px] gap-y-[8px]">
            {content.references.map((reference) => (
              <li key={reference.href}>
                <a href={reference.href} target="_blank" rel="noopener noreferrer" className="text-f12 text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-accent">
                  {reference.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
