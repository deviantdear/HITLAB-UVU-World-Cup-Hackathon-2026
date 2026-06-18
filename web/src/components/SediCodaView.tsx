interface Layer {
  tag: string;
  title: string;
  blurb: string;
  items: string[];
  ring: string;
  chip: string;
  connector?: string;
}

const LAYERS: Layer[] = [
  {
    tag: "Policy",
    title: "Governance Models",
    blurb: "What data may be collected, who may access it, how it's classified, and how long it's kept.",
    items: ["Marriage License", "Business License", "+ every government function"],
    ring: "border-navy bg-navy text-white",
    chip: "bg-white/15 text-white",
    connector: "defines the rules for",
  },
  {
    tag: "Enforcement",
    title: "SEDI / KERI — Verifiable Digital Identity",
    blurb:
      "The citizen proves a claim with a verifiable credential — minimal disclosure, cryptographic provenance, controlled by the individual and portable across every entity.",
    items: ['Proves "over 18"', 'Proves "identity verified"', "Government stores nothing extra"],
    ring: "border-violet-400 bg-violet-50 text-violet-900",
    chip: "bg-violet-100 text-violet-700",
    connector: "powers",
  },
  {
    tag: "Applications",
    title: "Agentic Applications",
    blurb: "The same governance + identity foundation powers many downstream government uses.",
    items: ["Healthcare Authorization", "Public-Records Release", "Privacy Notices"],
    ring: "border-sky-300 bg-sky-50 text-sky-900",
    chip: "bg-sky-100 text-sky-700",
  },
];

export function SediCodaView() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-5">
      <header className="mb-4">
        <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-utah-orange">
          The closing vision
        </div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900">
          Governance models connect to verifiable identity.
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Governance models are the policy layer. State-Endorsed Digital Identity (SEDI) is how that
          policy is enforced — minimizing the data government ever holds.
        </p>
      </header>

      {/* Layered architecture */}
      <div className="mb-5 space-y-2">
        {LAYERS.map((l, i) => (
          <div key={l.title}>
            <div className={`rounded-xl border-2 p-4 ${l.ring}`}>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${l.chip}`}>
                  {l.tag}
                </span>
                <h2 className="text-base font-bold">{l.title}</h2>
              </div>
              <p className="mt-1.5 text-sm opacity-90">{l.blurb}</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {l.items.map((it) => (
                  <span key={it} className={`rounded-md px-2 py-1 text-[11px] font-medium ${l.chip}`}>
                    {it}
                  </span>
                ))}
              </div>
            </div>
            {l.connector ? (
              <div className="flex items-center justify-center py-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                ↓ {l.connector}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {/* SSN before / after */}
      <div className="mb-5">
        <h3 className="mb-2 text-sm font-bold text-navy">
          A concrete example — the marriage-license Social Security Number
        </h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
            <div className="text-[11px] font-bold uppercase tracking-wide text-rose-600">Today</div>
            <p className="mt-1.5 text-sm text-rose-900">
              The clerk collects the SSN; it lives in an exempt record under Utah Code § 81-2-303(4),
              creating an ongoing privacy and breach risk for as long as it is retained.
            </p>
          </div>
          <div className="rounded-xl border-2 border-violet-300 bg-violet-50 p-4">
            <div className="text-[11px] font-bold uppercase tracking-wide text-violet-600">With SEDI</div>
            <p className="mt-1.5 text-sm text-violet-900">
              The citizen presents a verifiable credential directly to DHHS/ORS. The clerk never
              collects or stores the SSN — the secondary-classification risk is eliminated entirely.
            </p>
          </div>
        </div>
      </div>

      {/* Closing thesis */}
      <div className="rounded-xl bg-navy px-5 py-5 text-center">
        <p className="text-lg font-bold text-white">
          Equal data rights under the law — at a scale humans can&apos;t reach alone.
        </p>
        <p className="mt-1 text-xs text-white/60">
          Standardized governance + verifiable identity + AI orchestration, with a human in the loop.
        </p>
      </div>
    </div>
  );
}
