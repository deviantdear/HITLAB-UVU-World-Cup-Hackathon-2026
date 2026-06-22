"use client";

import { useState } from "react";
import { TitleHero } from "@/components/TitleHero";
import { WorkbenchApp } from "@/components/workbench/WorkbenchApp";

// Shows the title splash on every (re)load. Once "Begin" is clicked, the site
// behaves exactly as before. State is in-memory only, so reloading the page
// brings the title screen back.
export function DemoGate() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return <TitleHero onBegin={() => setStarted(true)} />;
  }

  return <WorkbenchApp />;
}
