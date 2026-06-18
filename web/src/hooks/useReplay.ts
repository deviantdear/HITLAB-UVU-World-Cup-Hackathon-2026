"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  AgentRunStatus,
  Citation,
  FieldKey,
  OrchestrationEvent,
} from "@/lib/governanceModel";

export interface ReplayFieldState {
  path: string;
  fieldKey: FieldKey;
  agent: string;
  value: string;
  confidence: number;
  status: "produced" | "flagged" | "approved" | "edited";
  reviewedBy?: string;
  flagReason?: string;
  producedAt: number;
}

export interface ReplayState {
  started: boolean;
  agentStatus: Record<string, AgentRunStatus>;
  agentMessage: Record<string, string | undefined>;
  sourcesByAgent: Record<string, Citation[]>;
  fields: Record<string, ReplayFieldState>;
  publishedVersion: number | null;
}

function emptyState(): ReplayState {
  return {
    started: false,
    agentStatus: {},
    agentMessage: {},
    sourcesByAgent: {},
    fields: {},
    publishedVersion: null,
  };
}

function applyEvent(s: ReplayState, e: OrchestrationEvent): void {
  switch (e.type) {
    case "run_started":
      s.started = true;
      break;
    case "agent_status":
      s.agentStatus[e.agent] = e.status;
      s.agentMessage[e.agent] = e.message;
      break;
    case "agent_read_source":
      (s.sourcesByAgent[e.agent] ||= []).push(e.citation);
      break;
    case "field_produced":
      s.fields[e.path] = {
        path: e.path,
        fieldKey: e.fieldKey,
        agent: e.agent,
        value: e.value,
        confidence: e.confidence,
        status: "produced",
        producedAt: e.t,
      };
      break;
    case "qa_flag": {
      const f = s.fields[e.path];
      if (f) {
        f.status = "flagged";
        f.flagReason = e.reason;
      }
      break;
    }
    case "human_review": {
      const f = s.fields[e.path];
      if (f) {
        f.status = e.action;
        f.reviewedBy = e.reviewedBy;
        if (e.newValue) f.value = e.newValue;
      }
      break;
    }
    case "model_published":
      s.publishedVersion = e.version;
      break;
  }
}

function foldTo(events: OrchestrationEvent[], count: number): ReplayState {
  const s = emptyState();
  for (let i = 0; i < count; i++) applyEvent(s, events[i]);
  return s;
}

export interface UseReplay {
  state: ReplayState;
  cursor: number;
  duration: number;
  playing: boolean;
  speed: number;
  appliedCount: number;
  setSpeed: (s: number) => void;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  restart: () => void;
  seek: (ms: number) => void;
}

/**
 * Drives the "watch it build" replay. Folds the event log up to a moving `cursor`
 * (ms). Pure derivation each frame keeps pause / resume / seek / speed bug-free.
 */
export function useReplay(
  events: OrchestrationEvent[],
  opts?: { autoPlay?: boolean },
): UseReplay {
  const sorted = useMemo(
    () => [...events].sort((a, b) => a.t - b.t),
    [events],
  );
  const duration = sorted.length ? sorted[sorted.length - 1].t : 0;

  const [cursor, setCursor] = useState(0);
  const [playing, setPlaying] = useState(opts?.autoPlay ?? false);
  const [speed, setSpeed] = useState(1);
  const [nonce, setNonce] = useState(0); // forces the loop to re-anchor on seek/restart

  const rafRef = useRef<number | null>(null);
  const startRealRef = useRef(0);
  const baseElapsedRef = useRef(0);

  useEffect(() => {
    if (!playing) return;
    startRealRef.current = performance.now();
    baseElapsedRef.current = cursor;
    const tick = () => {
      const elapsed =
        baseElapsedRef.current +
        (performance.now() - startRealRef.current) * speed;
      if (elapsed >= duration) {
        setCursor(duration);
        setPlaying(false);
        return;
      }
      setCursor(elapsed);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // cursor intentionally excluded: re-anchored via baseElapsedRef on (re)start
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, speed, duration, nonce]);

  const play = useCallback(() => {
    setCursor((c) => (c >= duration ? 0 : c));
    setPlaying(true);
    setNonce((n) => n + 1);
  }, [duration]);

  const pause = useCallback(() => setPlaying(false), []);
  const toggle = useCallback(() => {
    setPlaying((p) => {
      if (!p) {
        setCursor((c) => (c >= duration ? 0 : c));
        setNonce((n) => n + 1);
      }
      return !p;
    });
  }, [duration]);

  const restart = useCallback(() => {
    setCursor(0);
    setPlaying(true);
    setNonce((n) => n + 1);
  }, []);

  const seek = useCallback((ms: number) => {
    setCursor(Math.max(0, ms));
    setNonce((n) => n + 1);
  }, []);

  const appliedCount = useMemo(() => {
    let c = 0;
    while (c < sorted.length && sorted[c].t <= cursor) c++;
    return c;
  }, [sorted, cursor]);

  const state = useMemo(() => foldTo(sorted, appliedCount), [sorted, appliedCount]);

  return {
    state,
    cursor,
    duration,
    playing,
    speed,
    appliedCount,
    setSpeed,
    play,
    pause,
    toggle,
    restart,
    seek,
  };
}
