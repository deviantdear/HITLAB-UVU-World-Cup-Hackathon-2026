import { StepNav } from "@/components/StepNav";
import { TitleHero } from "@/components/TitleHero";

export default function Home() {
  return (
    <>
      <StepNav active="title" />
      <TitleHero />
    </>
  );
}
