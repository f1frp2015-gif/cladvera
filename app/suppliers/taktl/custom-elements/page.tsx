import TaktlProductPage, { taktlProductMetadata } from "@/components/pages/TaktlProductPage";

export const metadata = taktlProductMetadata("custom-elements");

export default function Page() {
  return <TaktlProductPage slug="custom-elements" />;
}
