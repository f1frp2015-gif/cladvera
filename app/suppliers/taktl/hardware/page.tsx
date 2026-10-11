import TaktlProductPage, { taktlProductMetadata } from "@/components/pages/TaktlProductPage";

export const metadata = taktlProductMetadata("hardware");

export default function Page() {
  return <TaktlProductPage slug="hardware" />;
}
