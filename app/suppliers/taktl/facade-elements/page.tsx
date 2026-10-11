import TaktlProductPage, { taktlProductMetadata } from "@/components/pages/TaktlProductPage";

export const metadata = taktlProductMetadata("facade-elements");

export default function Page() {
  return <TaktlProductPage slug="facade-elements" />;
}
