export interface Step {
  key: string;
  n: string;
  label: string;
  href: string;
}

/** The guided presentation flow, in order (matches the Utah Privacy design system). */
export const STEPS: Step[] = [
  { key: "title", n: "01", label: "Title", href: "/" },
  { key: "scale", n: "02", label: "Scale", href: "/scale" },
  { key: "orchestration", n: "03", label: "Orchestration", href: "/orchestration" },
  { key: "review", n: "04", label: "Review", href: "/review" },
  { key: "model", n: "05", label: "Model", href: "/model" },
  { key: "compare", n: "06", label: "Equal Rights", href: "/compare" },
  { key: "maintenance", n: "07", label: "Versioning", href: "/maintenance" },
  { key: "sedi", n: "08", label: "SEDI", href: "/sedi" },
];

export function stepIndex(key: string): number {
  return STEPS.findIndex((s) => s.key === key);
}
