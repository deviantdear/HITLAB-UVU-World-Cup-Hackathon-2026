import Link from "next/link";

export function TitleHero({ onBegin }: { onBegin?: () => void } = {}) {
  return (
    <div
      className={`relative flex ${onBegin ? "min-h-screen" : "min-h-[calc(100vh-62px)]"} flex-col items-center justify-center overflow-hidden px-6 pb-[72px] pt-14 text-center text-white`}
      style={{ background: "radial-gradient(120% 90% at 50% -10%, #0B3D6B 0%, #082A4A 70%)" }}
    >
      <div className="relative flex max-w-[920px] flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/logo-white.svg"
          alt="Utah Office of Data Privacy"
          className="mb-6 h-[60px] w-auto"
          style={{ filter: "brightness(0) invert(1) drop-shadow(0 6px 18px rgba(0,0,0,.3))" }}
        />
        <div className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-white/60">
          An AI Agent Orchestration Concept
        </div>
        <h1 className="font-display text-[clamp(38px,6.4vw,82px)] font-black leading-[1.02] tracking-[-0.025em]">
          Equal Data Rights
          <br />
          Under the Law.
        </h1>
        <p className="mt-5 max-w-[680px] text-[clamp(16px,1.7vw,20px)] leading-relaxed text-white/80">
          Today, the same personal information is governed differently depending on which government
          office collected it. AI agent orchestration can fix that — at the scale of every county,
          city, and agency in the state.
        </p>

        {/* Guide card */}
        <div className="mb-6 mt-9 flex max-w-[560px] items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.07] p-4 pr-6 text-left">
          <div className="grid h-[50px] w-[50px] flex-none place-items-center rounded-full bg-gradient-to-br from-utah-orange to-utah-orange-deep font-display text-lg font-extrabold text-white">
            CB
          </div>
          <div>
            <div className="mb-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white/55">
              Meet your guide
            </div>
            <div className="font-display text-[15px] font-bold text-white">
              Chris B., County Privacy Officer
            </div>
            <div className="mt-0.5 text-[13px] leading-snug text-white/70">
              Must bring thousands of government functions into compliance — with a two-person team.
            </div>
          </div>
        </div>

        {/* Stat row */}
        <div className="mb-10 flex flex-wrap justify-center overflow-hidden rounded-2xl border border-white/15">
          <Stat value="≈ weeks" label="of analyst work per model" border />
          <Stat value="14,000+" label="government functions" border />
          <Stat value="almost none" label="fully modeled today" accent />
        </div>

        {onBegin ? (
          <button
            onClick={onBegin}
            className="inline-flex items-center gap-2.5 rounded-full bg-utah-orange px-8 py-[15px] font-display text-[17px] font-extrabold text-white shadow-[0_10px_30px_rgba(0,0,0,0.28)] transition-transform hover:scale-[1.02]"
          >
            Begin <span className="text-[19px]">→</span>
          </button>
        ) : (
          <Link
            href="/scale"
            className="inline-flex items-center gap-2.5 rounded-full bg-utah-orange px-8 py-[15px] font-display text-[17px] font-extrabold text-white shadow-[0_10px_30px_rgba(0,0,0,0.28)] transition-transform hover:scale-[1.02]"
          >
            Begin <span className="text-[19px]">→</span>
          </Link>
        )}
      </div>
    </div>
  );
}

function Stat({
  value,
  label,
  border,
  accent,
}: {
  value: string;
  label: string;
  border?: boolean;
  accent?: boolean;
}) {
  return (
    <div className={`px-6 py-3.5 text-center ${border ? "border-r border-white/15" : ""}`}>
      <div className={`font-display text-[22px] font-extrabold ${accent ? "text-utah-orange" : "text-white"}`}>
        {value}
      </div>
      <div className="mt-0.5 text-xs text-white/60">{label}</div>
    </div>
  );
}
