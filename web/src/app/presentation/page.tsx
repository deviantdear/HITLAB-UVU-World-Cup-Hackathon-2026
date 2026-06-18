import { StepNav } from "@/components/StepNav";
import { TitleHero } from "@/components/TitleHero";

// The original linear "guided presentation" — kept as a fallback / storytelling view.
export default function PresentationPage() {
  return (
    <>
      <StepNav active="title" />
      <TitleHero />
    </>
  );
}
