"use client";

import { useState } from "react";
import type { ReviewItem, WorkbenchView } from "@/lib/workbench";
import { REVIEW_QUEUE, REVIEW_INCONSISTENCIES } from "@/lib/workbench";
import { Sidebar } from "@/components/workbench/Sidebar";
import { Dashboard } from "@/components/workbench/Dashboard";
import { InventoryTree } from "@/components/workbench/InventoryTree";
import { ReviewQueue } from "@/components/workbench/ReviewQueue";
// Reused detail views from the original build:
import { ReviewView } from "@/components/ReviewView";
import { ModelDocumentView } from "@/components/ModelDocumentView";
import { ComparisonView } from "@/components/ComparisonView";
import { MaintenanceView } from "@/components/MaintenanceView";
import { SediCodaView } from "@/components/SediCodaView";
import { GenerateView } from "@/components/workbench/GenerateView";
import { RedactionView } from "@/components/workbench/RedactionView";
import { ModelsLibrary } from "@/components/workbench/ModelsLibrary";

type AppView = WorkbenchView | "reviewDetail" | "generate" | "modelDoc";

const META: Record<AppView, { title: string; sub: string }> = {
  dashboard: { title: "Dashboard", sub: "Your governance program at a glance" },
  inventory: { title: "Governance inventory", sub: "Every function, organized by jurisdiction" },
  review: { title: "Review queue", sub: "Exceptions that need a human decision" },
  reviewDetail: { title: "Human review", sub: "Marriage License · Utah County · Secondary Classification" },
  generate: { title: "Generate a model", sub: "Ten agents build a governance model live" },
  modelDoc: { title: "Governance model", sub: "Human-approved · published v1" },
  models: { title: "Published models", sub: "Human-approved governance models" },
  compare: { title: "Equal data rights", sub: "The same function, governed across jurisdictions" },
  versions: { title: "Version history", sub: "Legislative change → human-approved updates" },
  redaction: { title: "Public-records release", sub: "What's disclosed when the public requests a record" },
  sedi: { title: "SEDI identity", sub: "Where governance connects to verifiable identity" },
};

// Views reached by drilling in (not in the sidebar) → where their back button returns.
const BACK_TO: Partial<Record<AppView, AppView>> = {
  reviewDetail: "review",
  modelDoc: "models",
};

export function WorkbenchApp() {
  const [view, setView] = useState<AppView>("dashboard");
  const [reviewerName, setReviewerName] = useState("Chris B.");
  const [scanned, setScanned] = useState(false);
  const reviewCount = REVIEW_QUEUE.length + (scanned ? REVIEW_INCONSISTENCIES.length : 0);

  const openItem = (item: ReviewItem) => {
    if (item.type === "qa_flag") setView("reviewDetail");
    else if (item.type === "legislative") setView("versions");
    else setView("compare");
  };

  const meta = META[view];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        view={view === "reviewDetail" ? "review" : view === "generate" ? "inventory" : view === "modelDoc" ? "models" : view}
        onNavigate={(v) => setView(v)}
        reviewerName={reviewerName}
        onNameChange={setReviewerName}
        reviewCount={reviewCount}
        governedCount={1284}
      />

      <main className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <div className="sticky top-0 z-40 flex h-[62px] items-center gap-4 border-b border-slate-200 bg-white/90 px-7 backdrop-blur-md backdrop-saturate-150">
          {BACK_TO[view] ? (
            <button
              onClick={() => setView(BACK_TO[view]!)}
              className="flex-none rounded-lg border border-slate-300 px-2.5 py-1.5 text-[13px] font-semibold text-slate-600 hover:bg-slate-100"
            >
              ‹ Back
            </button>
          ) : null}
          <div className="min-w-0 flex-1">
            <div className="font-display text-[17px] font-extrabold leading-tight tracking-tight text-slate-900">{meta.title}</div>
            <div className="truncate text-xs text-slate-400">{meta.sub}</div>
          </div>
          <button
            onClick={() => setView("generate")}
            className="flex-none rounded-lg bg-navy px-4 py-2.5 font-display text-[13px] font-bold text-white hover:bg-navy-deep"
          >
            + Generate a model
          </button>
        </div>

        {/* Active view */}
        <div className="flex-1">
          {view === "dashboard" && (
            <Dashboard
              reviewerName={reviewerName}
              reviewCount={reviewCount}
              inconsistencyCount={scanned ? REVIEW_INCONSISTENCIES.length : 0}
              onNavigate={setView}
              onOpenItem={openItem}
            />
          )}
          {view === "inventory" && <InventoryTree onGenerate={() => setView("generate")} onOpenModel={() => setView("modelDoc")} />}
          {view === "generate" && <GenerateView onDone={() => setView("models")} />}
          {view === "review" && <ReviewQueue scanned={scanned} onScan={() => setScanned(true)} onOpen={openItem} />}
          {view === "reviewDetail" && <ReviewView />}
          {view === "models" && <ModelsLibrary onOpen={() => setView("modelDoc")} />}
          {view === "modelDoc" && <ModelDocumentView />}
          {view === "compare" && <ComparisonView />}
          {view === "versions" && <MaintenanceView />}
          {view === "redaction" && <RedactionView />}
          {view === "sedi" && <SediCodaView />}
        </div>
      </main>
    </div>
  );
}
