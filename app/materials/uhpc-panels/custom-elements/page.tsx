import { notFound } from "next/navigation";
import UhpcProductPage, { uhpcProductMetadata } from "@/components/pages/UhpcProductPage";
import { isPublishedPath } from "@/content/data/publication";

export const metadata = uhpcProductMetadata("custom-elements");

export default function Page() {
  if (!isPublishedPath("/materials/uhpc-panels/custom-elements")) notFound();
  return <UhpcProductPage slug="custom-elements" />;
}
