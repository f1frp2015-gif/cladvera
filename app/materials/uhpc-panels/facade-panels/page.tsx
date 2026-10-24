import { notFound } from "next/navigation";
import UhpcProductPage, { uhpcProductMetadata } from "@/components/pages/UhpcProductPage";
import { isPublishedPath } from "@/content/data/publication";

export const metadata = uhpcProductMetadata("facade-panels");

export default function Page() {
  if (!isPublishedPath("/materials/uhpc-panels/facade-panels")) notFound();
  return <UhpcProductPage slug="facade-panels" />;
}
