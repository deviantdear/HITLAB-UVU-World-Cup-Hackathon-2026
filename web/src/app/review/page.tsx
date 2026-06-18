import { StepNav } from "@/components/StepNav";
import { ReviewView } from "@/components/ReviewView";

export default function ReviewPage() {
  return (
    <>
      <StepNav active="review" />
      <ReviewView />
    </>
  );
}
