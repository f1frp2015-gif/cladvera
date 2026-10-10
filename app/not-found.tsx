import { Cta, PageHeader } from "@/components/ui";

export default function NotFound() {
  return (
    <PageHeader eyebrow="404" title="Page not found" lede="This page is unavailable. Explore the product library or request help selecting materials for your project." actions={<>
        <Cta href="/products">Browse products</Cta>
        <Cta href="/samples" variant="secondary">Request samples</Cta>
      </>} />
  );
}
