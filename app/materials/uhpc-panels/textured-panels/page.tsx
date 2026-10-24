import { notFound } from "next/navigation";
import UhpcProductPage, { uhpcProductMetadata } from "@/components/pages/UhpcProductPage";
import { isPublishedPath } from "@/content/data/publication";

export const metadata = uhpcProductMetadata("textured-panels");

export default function Page() {
  if (!isPublishedPath("/materials/uhpc-panels/textured-panels")) notFound();
  return <UhpcProductPage slug="textured-panels" />;
}
