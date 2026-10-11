import { notFound } from "next/navigation";
import { isPublishedPath } from "@/content/data/publication";
import MaterialPage, { materialMetadata } from "@/components/pages/MaterialPage";

export const metadata = materialMetadata("uhpc-panels");

export default function Page() {
  if (!isPublishedPath("/materials/uhpc-panels")) notFound();

  return <MaterialPage slug="uhpc-panels" />;
}
