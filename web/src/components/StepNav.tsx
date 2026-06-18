import Link from "next/link";
import { STEPS, stepIndex } from "@/lib/steps";

function Hexagon() {
  return (
    <svg width="26" height="29" viewBox="0 0 26 29" fill="none" aria-hidden>
      <path d="M13 1.5 24.3 8v13L13 27.5 1.7 21V8z" stroke="#0B3D6B" strokeWidth="1.6" fill="#EAF1F8" />
      <path d="M13 7.2 19.4 11v7.6L13 22.4 6.6 18.6V11z" fill="#0B3D6B" />
      <circle cx="13" cy="14.8" r="2.1" fill="#E8852B" />
    </svg>
  );
}

export function StepNav({ active }: { active: string }) {
  const idx = stepIndex(active);
  const prev = idx > 0 ? STEPS[idx - 1] : STEPS[0];
  const next = idx < STEPS.length - 1 ? STEPS[idx + 1] : STEPS[STEPS.length - 1];

  return (
    <header className="sticky top-0 z-50 flex h-[62px] items-center gap-5 border-b border-slate-200 bg-white/90 px-5 backdrop-blur-md backdrop-saturate-150">
      <Link href="/" className="flex shrink-0 items-center gap-2.5">
        <Hexagon />
        <div className="leading-tight">
          <div className="font-display text-[13.5px] font-extrabold tracking-tight text-slate-900">
            Utah Data Governance
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            AI Agent Orchestration
          </div>
        </div>
      </Link>

      <nav className="flex flex-1 items-center gap-0.5 overflow-x-auto px-1">
        {STEPS.map((s) => {
          const on = s.key === active;
          return (
            <Link
              key={s.key}
              href={s.href}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13px] transition-colors ${
                on ? "bg-navy/5 font-bold text-navy" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <span
                className={`grid h-5 w-5 place-items-center rounded text-[10px] font-bold ${
                  on ? "bg-navy text-white" : "bg-slate-200 text-slate-500"
                }`}
              >
                {s.n}
              </span>
              <span className="whitespace-nowrap">{s.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={prev.href}
          aria-label={`Previous: ${prev.label}`}
          className="grid h-[34px] w-[34px] place-items-center rounded-lg border border-slate-300 bg-white text-slate-600 hover:bg-slate-100"
        >
          ‹
        </Link>
        <Link
          href={next.href}
          aria-label={`Next: ${next.label}`}
          className="grid h-[34px] w-[34px] place-items-center rounded-lg border border-navy bg-navy text-white hover:bg-navy-deep"
        >
          ›
        </Link>
      </div>
    </header>
  );
}
