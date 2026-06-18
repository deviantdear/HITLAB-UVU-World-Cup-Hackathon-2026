"use client";

import { useState } from "react";

interface Field {
  label: string;
  value: string;
  redacted: boolean;
  citation?: string;
  reason?: string;
}

// Illustrative record values; the redaction rules cite real GRAMA / vital-records statute.
const RECORD: { title: string; entity: string; fields: Field[] } = {
  title: "Marriage License",
  entity: "Utah County · Clerk",
  fields: [
    { label: "Applicant names", value: "Jordan A. Rivera · Sam T. Lee", redacted: false },
    { label: "Marriage date", value: "June 12, 2026", redacted: false },
    { label: "Place of marriage", value: "Utah County, Utah", redacted: false },
    { label: "Issuing clerk", value: "Aisha Bennett, County Clerk", redacted: false },
    { label: "Date of birth", value: "1994-03-08 · 1992-11-21", redacted: true, citation: "Utah Code § 63G-2-302(2)", reason: "Private — protects against identity theft." },
    { label: "Home address", value: "742 Evergreen Terrace, Orem UT", redacted: true, citation: "Utah Code § 63G-2-302(2)", reason: "Private — residential address withheld." },
    { label: "Social Security Number", value: "•••-••-1234", redacted: true, citation: "Utah Code § 81-2-303(4)", reason: "Not recorded on the license; never released." },
  ],
};

export function RedactionView() {
  const [mode, setMode] = useState<"public" | "internal">("public");
  const redactions = RECORD.fields.filter((f) => f.redacted);

  return (
    <div className="mx-auto max-w-[1080px] px-[30px] pb-16 pt-7">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-utah-orange">Public-records release</div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900">
            Released to the public — redacted by policy.
          </h1>
          <p className="mt-1 max-w-[620px] text-sm text-slate-500">
            When a member of the public requests this record, the Redaction Agent removes what the law
            protects and cites the authority for each removal.
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white p-0.5">
          {(["public", "internal"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                mode === m ? "bg-navy text-white" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {m === "public" ? "Public release" : "Internal copy"}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 flex items-center gap-3 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3">
        <span className="grid h-7 w-7 flex-none place-items-center rounded-lg bg-violet-600 text-sm text-white">⛒</span>
        <p className="text-sm text-violet-900">
          <span className="font-semibold">Redaction Agent redacted {redactions.length} elements</span> before
          public release — each withheld under a cited statute.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1.4fr_1fr]">
        {/* The released record */}
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 bg-navy px-5 py-3 text-white">
            <div className="font-display text-base font-extrabold">{RECORD.title}</div>
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${mode === "public" ? "bg-amber-400 text-amber-950" : "bg-white/15 text-white"}`}>
              {mode === "public" ? "Public release copy" : "Internal copy"}
            </span>
          </div>
          <div className="px-5">
            {RECORD.fields.map((f) => (
              <div key={f.label} className="flex items-start justify-between gap-4 border-b border-slate-100 py-3 last:border-0">
                <span className="w-40 flex-none text-[11px] font-bold uppercase tracking-wide text-slate-400">{f.label}</span>
                <div className="flex-1 text-right">
                  {f.redacted && mode === "public" ? (
                    <span className="inline-block rounded bg-slate-900 px-10 py-1 align-middle text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 select-none">
                      redacted
                    </span>
                  ) : (
                    <span className={`text-sm ${f.redacted ? "text-rose-700" : "text-slate-800"}`}>{f.value}</span>
                  )}
                  {f.redacted ? (
                    <div className="mt-1 font-mono text-[10px] text-slate-400">{f.citation}</div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Redaction log */}
        <div className="rounded-2xl border border-slate-200 bg-white p-[18px] shadow-sm">
          <div className="mb-3 font-display text-[15px] font-extrabold text-slate-900">Redaction log</div>
          <div className="flex flex-col gap-3">
            {redactions.map((f) => (
              <div key={f.label} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                <div className="text-[12px] font-bold text-slate-800">{f.label}</div>
                <div className="mt-0.5 text-[12px] text-slate-500">{f.reason}</div>
                <span className="mt-1.5 inline-block rounded bg-sky-50 px-1.5 py-0.5 font-mono text-[10px] font-medium text-sky-700">{f.citation}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
            Everything else is a public record. The agent proposes redactions; a records officer
            confirms before release.
          </p>
        </div>
      </div>
    </div>
  );
}
