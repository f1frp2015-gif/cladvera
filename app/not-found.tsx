import { Cta, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section title="Page not found" lede="The address may have changed. The materials hub and the samples page are the two most useful places to continue.">
      <div className="flex flex-wrap gap-[12px]">
        <Cta href="/materials">Browse materials</Cta>
        <Cta href="/samples" variant="secondary">Request samples</Cta>
      </div>
    </Section>
  );
}
