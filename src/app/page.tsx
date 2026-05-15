import { Hero } from "@/widgets/hero";
import { Manifesto } from "@/widgets/manifesto";
import { BrandIntro } from "@/widgets/brand-intro";
import { CyclePreview } from "@/widgets/cycle-preview";
import { ProductTeaser } from "@/widgets/product";
import { ClientsStrip } from "@/widgets/clients";
import { InsightsPreview } from "@/widgets/insights-preview";
import { LocationPreview } from "@/widgets/location";
import { ContactInline } from "@/widgets/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <BrandIntro />
      <CyclePreview />
      <ProductTeaser />
      <ClientsStrip />
      <InsightsPreview />
      <LocationPreview />
      <ContactInline />
    </>
  );
}
