import { notFound } from "next/navigation";
import { isPublishedPath } from "@/content/data/publication";
import MaterialPage, { materialMetadata } from "@/components/pages/MaterialPage";

export const metadata = materialMetadata("wood-veneer-panels");

export default function Page() {
  if (!isPublishedPath("/materials/wood-veneer-panels")) notFound();

  return <MaterialPage slug="wood-veneer-panels" />;
}
