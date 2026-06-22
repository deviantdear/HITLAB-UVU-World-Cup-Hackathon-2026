"use client";

import { useRef, useState } from "react";
import type { WorkbenchView } from "@/lib/workbench";

interface NavItem {
  view: WorkbenchView;
  label: string;
  icon: React.ReactNode;
  group: "workspace" | "intelligence";
}

const I = (d: string, extra?: React.ReactNode) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
    {extra}
  </svg>
);

const NAV: NavItem[] = [
  { view: "dashboard", group: "workspace", label: "Dashboard", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg> },
  { view: "inventory", group: "workspace", label: "Governance inventory", icon: I("M9 3 3 6v15l6-3 6 3 6-3V3l-6 3-6-3Z", <><path d="M9 3v15" /><path d="M15 6v15" /></>) },
  { view: "review", group: "workspace", label: "Review queue", icon: I("M22 12h-6l-2 3h-4l-2-3H2", <path d="M5.5 5.5 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.5A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.5Z" />) },
  { view: "models", group: "workspace", label: "Published models", icon: I("M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z", <><path d="M14 2v6h6" /><path d="M8 13h8" /><path d="M8 17h6" /></>) },
  { view: "compare", group: "intelligence", label: "Equal data rights", icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><path d="M6 21V9a9 9 0 0 0 9 9" /></svg> },
  { view: "versions", group: "intelligence", label: "Version history", icon: I("M3 3v5h5", <><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" /><path d="M12 7v5l4 2" /></>) },
  { view: "redaction", group: "intelligence", label: "Public records", icon: I("M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z", <circle cx="12" cy="12" r="3" />) },
  { view: "sedi", group: "intelligence", label: "SEDI identity", icon: I("M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z", <path d="m9 12 2 2 4-4" />) },
];

function NavRow({ item, active, onClick, badge, meta }: { item: NavItem; active: boolean; onClick: () => void; badge?: number; meta?: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13.5px] transition-colors ${
        active ? "bg-white/15 font-semibold text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
      }`}
    >
      <span className="flex-none">{item.icon}</span>
      <span className="flex-1">{item.label}</span>
      {badge ? (
        <span className="inline-flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-utah-orange px-1.5 font-display text-[11px] font-extrabold text-white">
          {badge}
        </span>
      ) : meta ? (
        <span className="font-mono text-[10px] text-white/45">{meta}</span>
      ) : null}
    </button>
  );
}

export function Sidebar({
  view,
  onNavigate,
  reviewerName,
  onNameChange,
  reviewCount,
  governedCount,
}: {
  view: WorkbenchView;
  onNavigate: (v: WorkbenchView) => void;
  reviewerName: string;
  onNameChange: (name: string) => void;
  reviewCount: number;
  governedCount: number;
}) {
  const initials =
    reviewerName
      .split(/\s+/)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "CB";

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(reviewerName);
  const skipCommit = useRef(false); // set when cancelling, so the unmount-blur doesn't save

  const startEdit = () => {
    setDraft(reviewerName);
    skipCommit.current = false;
    setEditing(true);
  };
  const commit = () => {
    if (skipCommit.current) {
      skipCommit.current = false;
      setEditing(false);
      return;
    }
    const v = draft.trim();
    if (v) onNameChange(v);
    setEditing(false);
  };
  const cancel = () => {
    skipCommit.current = true;
    setEditing(false);
  };

  return (
    <aside
      className="sticky top-0 flex h-screen w-64 flex-none flex-col overflow-hidden border-r border-black/20 text-white"
      style={{ background: "linear-gradient(185deg,#0B3D6B,#082A4A)" }}
    >
      <button onClick={() => onNavigate("dashboard")} className="flex items-center gap-3 px-[18px] pb-4 pt-5 text-left">
        <svg width="28" height="31" viewBox="0 0 26 29" fill="none" className="flex-none">
          <path d="M13 1.5 24.3 8v13L13 27.5 1.7 21V8z" stroke="rgba(255,255,255,.5)" strokeWidth="1.4" fill="rgba(255,255,255,.07)" />
          <path d="M13 7.2 19.4 11v7.6L13 22.4 6.6 18.6V11z" fill="#fff" />
          <circle cx="13" cy="14.8" r="2.1" fill="#E8852B" />
        </svg>
        <div className="leading-tight">
          <div className="font-display text-sm font-extrabold tracking-tight text-white">Data Governance</div>
          <div className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-white/50">Privacy Workbench</div>
        </div>
      </button>

      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 pb-3.5">
        <div className="px-3 pb-1.5 pt-3 text-[9.5px] font-bold uppercase tracking-[0.14em] text-white/40">Workspace</div>
        {NAV.filter((n) => n.group === "workspace").map((item) => (
          <NavRow
            key={item.view}
            item={item}
            active={view === item.view}
            onClick={() => onNavigate(item.view)}
            badge={item.view === "review" ? reviewCount : undefined}
            meta={item.view === "models" ? String(governedCount) : undefined}
          />
        ))}

        <div className="px-3 pb-1.5 pt-4 text-[9.5px] font-bold uppercase tracking-[0.14em] text-white/40">Intelligence</div>
        {NAV.filter((n) => n.group === "intelligence").map((item) => (
          <NavRow key={item.view} item={item} active={view === item.view} onClick={() => onNavigate(item.view)} />
        ))}
      </nav>

      {/* Reviewer identity — click to edit */}
      <div className="border-t border-white/10 p-2">
        {editing ? (
          <div className="flex items-center gap-2.5 px-2 py-1.5">
            <span className="grid h-[34px] w-[34px] flex-none place-items-center rounded-full bg-gradient-to-br from-utah-orange to-utah-orange-deep font-display text-[13px] font-extrabold text-white">
              {initials}
            </span>
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") commit();
                else if (e.key === "Escape") cancel();
              }}
              onBlur={commit}
              placeholder="Your name"
              aria-label="Reviewer name"
              className="min-w-0 flex-1 rounded-md border border-white/25 bg-white/10 px-2 py-1 text-[12.5px] font-semibold text-white placeholder-white/40 outline-none focus:border-utah-orange"
            />
          </div>
        ) : (
          <button
            onClick={startEdit}
            title="Edit reviewer identity"
            className="group flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-white/10"
          >
            <span className="grid h-[34px] w-[34px] flex-none place-items-center rounded-full bg-gradient-to-br from-utah-orange to-utah-orange-deep font-display text-[13px] font-extrabold text-white">
              {initials}
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-[12.5px] font-bold text-white">{reviewerName}</div>
              <div className="text-[10.5px] text-white/55">County Privacy Officer</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none text-white/35 transition-colors group-hover:text-white/70">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </button>
        )}
      </div>
    </aside>
  );
}
