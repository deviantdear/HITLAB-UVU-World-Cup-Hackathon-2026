"use client";

import { MODELS } from "@/lib/workbench";

function Hex() {
  return (
    <svg width="20" height="22" viewBox="0 0 26 29" fill="none" aria-hidden>
      <path d="M13 1.5 24.3 8v13L13 27.5 1.7 21V8z" stroke="#0B3D6B" strokeWidth="1.6" fill="#EAF1F8" />
      <path d="M13 7.2 19.4 11v7.6L13 22.4 6.6 18.6V11z" fill="#0B3D6B" />
      <circle cx="13" cy="14.8" r="2.1" fill="#E8852B" />
    </svg>
  );
}

export function ModelsLibrary({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="mx-auto max-w-[1080px] px-[30px] pb-16 pt-7">
      <p className="mb-4 max-w-[620px] text-sm leading-relaxed text-slate-500">
        Finished, human-approved governance models — live and operating. Open one to see the full,
        cited record from government unit through retention.
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {MODELS.map((m) => (
          <button
            key={m.id}
            onClick={onOpen}
            className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy/5">
                <Hex />
              </span>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                ● Published v{m.version}
              </span>
            </div>
            <div className="mt-3 font-display text-lg font-extrabold text-slate-900">{m.title}</div>
            <div className="text-xs text-slate-500">
              {m.entity} · {m.office}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">{m.fields} fields · human-approved</span>
              <span className="font-display text-[13px] font-bold text-navy">Open →</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
