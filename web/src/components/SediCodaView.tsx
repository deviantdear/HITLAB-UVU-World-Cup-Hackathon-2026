"use client";

import { useState } from "react";
import Link from "next/link";

interface Layer {
  n: string;
  title: string;
  sub: string;
  desc: string;
  color: string;
  bg: string;
}

const LAYERS: Layer[] = [
  {
    n: "1",
    title: "Governance Models",
    sub: "Policy layer",
    desc: "What data exists, who may access it, and how long it is kept.",
    color: "#0B3D6B",
    bg: "#EAF1F8",
  },
  {
    n: "2",
    title: "SEDI / KERI — Verifiable Digital Identity",
    sub: "Trust layer",
    desc: "The citizen proves a claim with a verifiable credential — minimal disclosure, no central honeypot.",
    color: "#7C3AED",
    bg: "#F5F0FF",
  },
  {
    n: "3",
    title: "Agentic Applications",
    sub: "Service layer",
    desc: "Healthcare Authorization · Public-Records Release · Privacy Notices.",
    color: "#0EA5E9",
    bg: "#EFF8FF",
  },
];

const TODAY = [
  ["①", "Clerk collects the SSN at the counter to verify identity."],
  ["②", "SSN is stored in an exempt record held by the county."],
  ["③", "Ongoing privacy & breach risk for as long as the record exists."],
];
const SEDI = [
  ["①", "Citizen presents a verifiable credential directly to DHHS / ORS."],
  ["②", "The clerk never collects or stores the SSN — minimal disclosure."],
  ["③", "Risk eliminated — there is no stored secret to breach."],
];

export function SediCodaView() {
  const [view, setView] = useState<"today" | "sedi">("today");

  return (
    <div className="mx-auto max-w-[1080px] px-6 pb-16 pt-8">
      {/* Header */}
      <div className="mb-7 flex flex-col items-center text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/ODPImage2.png" alt="" className="mb-1.5 h-auto w-[190px]" />
        <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-utah-orange">
          The closing vision
        </div>
        <h2 className="font-display text-[clamp(24px,3vw,34px)] font-extrabold leading-tight tracking-tight text-slate-900">
          Governance models connect to verifiable identity.
        </h2>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[1.1fr_1fr]">
        {/* Architecture layers */}
        <div>
          {LAYERS.map((l, i) => (
            <div key={l.title}>
              <div
                className="rounded-xl border border-slate-200 bg-white p-[15px] shadow-sm"
                style={{ borderLeft: `5px solid ${l.color}` }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-[34px] w-[34px] flex-none place-items-center rounded-[9px] font-display text-[15px] font-extrabold"
                    style={{ background: l.bg, color: l.color }}
                  >
                    {l.n}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="font-display text-[15px] font-extrabold text-slate-900">{l.title}</span>
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.08em]"
                        style={{ color: l.color }}
                      >
                        {l.sub}
                      </span>
                    </div>
                    <div className="mt-0.5 text-[12.5px] leading-snug text-slate-500">{l.desc}</div>
                  </div>
                </div>
              </div>
              {i < LAYERS.length - 1 ? (
                <div className="flex justify-center py-1.5 text-base text-slate-300">↓</div>
              ) : null}
            </div>
          ))}
        </div>

        {/* Before / after */}
        <div className="rounded-2xl border border-slate-200 bg-white p-[18px] shadow-sm">
          <div className="mb-2.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-slate-400">
            Real example · the marriage-license SSN
          </div>
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => setView("today")}
              className={`rounded-lg border px-3 py-1.5 text-[13px] font-semibold ${
                view === "today" ? "border-rose-200 bg-rose-50 text-rose-700" : "border-slate-200 bg-white text-slate-500"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setView("sedi")}
              className={`rounded-lg border px-3 py-1.5 text-[13px] font-semibold ${
                view === "sedi" ? "border-violet-200 bg-violet-50 text-violet-700" : "border-slate-200 bg-white text-slate-500"
              }`}
            >
              With SEDI
            </button>
          </div>

          {view === "today" ? (
            <div>
              <div className="flex flex-col gap-2.5">
                {TODAY.map(([n, text]) => (
                  <div key={n} className="flex items-start gap-3 rounded-[10px] border border-rose-200 bg-rose-50 px-3.5 py-3">
                    <span className="flex-none text-[15px]">{n}</span>
                    <div className="text-[13px] leading-snug text-rose-900">{text}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3.5 rounded-[9px] bg-rose-50 p-2.5 text-center text-[12px] font-bold text-rose-700">
                Risk: a standing honeypot of sensitive data
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-col gap-2.5">
                {SEDI.map(([n, text]) => (
                  <div key={n} className="flex items-start gap-3 rounded-[10px] border border-violet-200 bg-violet-50 px-3.5 py-3">
                    <span className="flex-none text-[15px]">{n}</span>
                    <div className="text-[13px] leading-snug text-violet-900">{text}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3.5 rounded-[9px] bg-violet-50 p-2.5 text-center text-[12px] font-bold text-violet-700">
                Result: the data the government never holds can never leak
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Thesis */}
      <div
        className="relative mt-8 overflow-hidden rounded-2xl px-7 py-9 text-center text-white"
        style={{ background: "linear-gradient(135deg,#0B3D6B,#082A4A)" }}
      >
        <div className="relative mx-auto max-w-[760px] font-display text-[clamp(22px,3.2vw,34px)] font-black leading-[1.15] tracking-tight">
          “Equal data rights under the law — at a scale humans can’t reach alone.”
        </div>
        <Link
          href="/"
          className="relative mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-[22px] py-2.5 text-sm font-bold text-white hover:bg-white/20"
        >
          ↺ Restart the demo
        </Link>
      </div>
    </div>
  );
}
