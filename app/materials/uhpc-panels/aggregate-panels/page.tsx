import { notFound } from "next/navigation";
import UhpcProductPage, { uhpcProductMetadata } from "@/components/pages/UhpcProductPage";
import { isPublishedPath } from "@/content/data/publication";

export const metadata = uhpcProductMetadata("aggregate-panels");

export default function Page() {
  if (!isPublishedPath("/materials/uhpc-panels/aggregate-panels")) notFound();
  return <UhpcProductPage slug="aggregate-panels" />;
}
