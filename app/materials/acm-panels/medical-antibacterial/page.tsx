import AlmineProductPage, { almineProductMetadata } from "@/components/pages/AlmineProductPage";

export const metadata = almineProductMetadata("medical-antibacterial");

export default function Page() {
  return <AlmineProductPage slug="medical-antibacterial" />;
}
