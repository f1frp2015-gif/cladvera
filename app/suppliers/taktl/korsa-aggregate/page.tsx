import TaktlProductPage, { taktlProductMetadata } from "@/components/pages/TaktlProductPage";

export const metadata = taktlProductMetadata("korsa-aggregate");

export default function Page() {
  return <TaktlProductPage slug="korsa-aggregate" />;
}
