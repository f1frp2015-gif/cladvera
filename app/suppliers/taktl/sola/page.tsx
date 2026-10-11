import TaktlProductPage, { taktlProductMetadata } from "@/components/pages/TaktlProductPage";

export const metadata = taktlProductMetadata("sola");

export default function Page() {
  return <TaktlProductPage slug="sola" />;
}
