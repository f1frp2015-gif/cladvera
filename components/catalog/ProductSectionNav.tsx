export default function ProductSectionNav({
  items,
}: {
  items: ReadonlyArray<{ id: string; label: string }>;
}) {
  return (
    <nav aria-label="On this page" className="sticky top-[72px] z-30 border-b border-line-strong bg-paper xl:top-[80px]">
      <div className="site-container">
        <ol className="flex gap-[28px] overflow-x-auto py-[4px] md:gap-[44px]">
          {items.map((item, index) => (
            <li key={item.id} className="shrink-0">
              <a href={`#${item.id}`} className="inline-flex min-h-[52px] items-center gap-[10px] text-f12 font-medium text-ink-2 hover:text-accent">
                <span aria-hidden="true" className="font-mono text-[9px] text-accent">{String(index + 1).padStart(2, "0")}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
