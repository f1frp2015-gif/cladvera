import { notFound } from "next/navigation";
import UhpcProductPage, { uhpcProductMetadata } from "@/components/pages/UhpcProductPage";
import { isPublishedPath } from "@/content/data/publication";

export const metadata = uhpcProductMetadata("attachment-components");

export default function Page() {
  if (!isPublishedPath("/materials/uhpc-panels/attachment-components")) notFound();
  return <UhpcProductPage slug="attachment-components" />;
}
