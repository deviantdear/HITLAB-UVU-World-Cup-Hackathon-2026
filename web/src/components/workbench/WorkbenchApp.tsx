"use client";

import { useState } from "react";
import type { ReviewItem, WorkbenchView } from "@/lib/workbench";
import { REVIEW_QUEUE } from "@/lib/workbench";
import { Sidebar } from "@/components/workbench/Sidebar";
import { Dashboard } from "@/components/workbench/Dashboard";
import { InventoryTree } from "@/components/workbench/InventoryTree";
import { ReviewQueue } from "@/components/workbench/ReviewQueue";
import { Settings } from "@/components/workbench/Settings";
// Reused detail views from the original build:
import { ReviewView } from "@/components/ReviewView";
import { ModelDocumentView } from "@/components/ModelDocumentView";
import { ComparisonView } from "@/components/ComparisonView";
import { MaintenanceView } from "@/components/MaintenanceView";
import { SediCodaView } from "@/components/SediCodaView";

type AppView = WorkbenchView | "reviewDetail";

const META: Record<AppView, { title: string; sub: string }> = {
  dashboard: { title: "Dashboard", sub: "Your governance program at a glance" },
  inventory: { title: "Governance inventory", sub: "Every function, organized by jurisdiction" },
  review: { title: "Review queue", sub: "Exceptions that need a human decision" },
  reviewDetail: { title: "Human review", sub: "Marriage License · Utah County · Secondary Classification" },
  models: { title: "Published models", sub: "Human-approved governance models" },
  compare: { title: "Compare & harmonize", sub: "The same function across jurisdictions" },
  versions: { title: "Version history", sub: "Legislative change → human-approved updates" },
  sedi: { title: "SEDI identity", sub: "Where governance connects to verifiable identity" },
  settings: { title: "Settings", sub: "Workbench configuration" },
};

const DRILL_IN: AppView[] = ["reviewDetail", "compare", "versions", "models"];

export function WorkbenchApp() {
  const [view, setView] = useState<AppView>("dashboard");
  const [reviewerName, setReviewerName] = useState("Chris B.");

  const openItem = (item: ReviewItem) => {
    if (item.type === "qa_flag") setView("reviewDetail");
    else if (item.type === "legislative") setView("versions");
    else setView("compare");
  };

  const meta = META[view];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        view={view === "reviewDetail" ? "review" : view}
        onNavigate={(v) => setView(v)}
        reviewerName={reviewerName}
        reviewCount={REVIEW_QUEUE.length}
        governedCount={1284}
      />

      <main className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <div className="sticky top-0 z-40 flex h-[62px] items-center gap-4 border-b border-slate-200 bg-white/90 px-7 backdrop-blur-md backdrop-saturate-150">
          {DRILL_IN.includes(view) ? (
            <button
              onClick={() => setView("review")}
              className="flex-none rounded-lg border border-slate-300 px-2.5 py-1.5 text-[13px] font-semibold text-slate-600 hover:bg-slate-100"
            >
              ‹ Back to queue
            </button>
          ) : null}
          <div className="min-w-0 flex-1">
            <div className="font-display text-[17px] font-extrabold leading-tight tracking-tight text-slate-900">{meta.title}</div>
            <div className="truncate text-xs text-slate-400">{meta.sub}</div>
          </div>
          <button
            onClick={() => setView("inventory")}
            className="flex-none rounded-lg bg-navy px-4 py-2.5 font-display text-[13px] font-bold text-white hover:bg-navy-deep"
          >
            + Generate a model
          </button>
        </div>

        {/* Active view */}
        <div className="flex-1">
          {view === "dashboard" && (
            <Dashboard reviewerName={reviewerName} reviewCount={REVIEW_QUEUE.length} onNavigate={setView} onOpenItem={openItem} />
          )}
          {view === "inventory" && <InventoryTree />}
          {view === "review" && <ReviewQueue onOpen={openItem} />}
          {view === "reviewDetail" && <ReviewView />}
          {view === "models" && <ModelDocumentView />}
          {view === "compare" && <ComparisonView />}
          {view === "versions" && <MaintenanceView />}
          {view === "sedi" && <SediCodaView />}
          {view === "settings" && <Settings reviewerName={reviewerName} onNameChange={setReviewerName} />}
        </div>
      </main>
    </div>
  );
}
