"use client";

import { useCallback, useMemo, useRef, useState, useEffect } from "react";
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

/** A point where the replay pauses for a human decision before continuing. */
export interface ReplayGate {
  at: number; // pause when the timeline reaches this ms
  resumeAt: number; // jump here on release (applies the human_review event instantly)
  label: string;
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
  pendingGate: ReplayGate | null;
  setSpeed: (s: number) => void;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  restart: () => void;
  seek: (ms: number) => void;
  release: () => void;
}

/**
 * Drives the "watch it build" replay. Folds the event log up to a moving `cursor` (ms).
 * Optional `gates` pause the timeline for a human decision (the on-stage approval moment).
 */
export function useReplay(
  events: OrchestrationEvent[],
  opts?: { autoPlay?: boolean; gates?: ReplayGate[] },
): UseReplay {
  const sorted = useMemo(() => [...events].sort((a, b) => a.t - b.t), [events]);
  const duration = sorted.length ? sorted[sorted.length - 1].t : 0;
  const gates = useMemo(
    () => [...(opts?.gates ?? [])].sort((a, b) => a.at - b.at),
    [opts?.gates],
  );

  const [cursor, setCursor] = useState(0);
  const [playing, setPlaying] = useState(opts?.autoPlay ?? false);
  const [speed, setSpeed] = useState(1);
  const [nonce, setNonce] = useState(0);
  const [pendingGate, setPendingGate] = useState<ReplayGate | null>(null);

  const rafRef = useRef<number | null>(null);
  const startRealRef = useRef(0);
  const baseElapsedRef = useRef(0);
  const releasedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!playing) return;
    startRealRef.current = performance.now();
    baseElapsedRef.current = cursor;
    const tick = () => {
      const elapsed =
        baseElapsedRef.current + (performance.now() - startRealRef.current) * speed;

      const gate = gates.find((g) => !releasedRef.current.has(g.at) && g.at <= elapsed);
      if (gate) {
        setCursor(gate.at);
        setPendingGate(gate);
        setPlaying(false);
        return;
      }

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
    // cursor intentionally excluded; re-anchored via refs on (re)start
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, speed, duration, nonce, gates]);

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
    releasedRef.current = new Set();
    setPendingGate(null);
    setCursor(0);
    setPlaying(true);
    setNonce((n) => n + 1);
  }, []);

  const seek = useCallback((ms: number) => {
    setCursor(Math.max(0, ms));
    setPendingGate(null);
    setNonce((n) => n + 1);
  }, []);

  /** Release the current gate: record approval and resume past it. */
  const release = useCallback(() => {
    setPendingGate((g) => {
      if (g) {
        releasedRef.current.add(g.at);
        setCursor(g.resumeAt);
        setPlaying(true);
        setNonce((n) => n + 1);
      }
      return null;
    });
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
    pendingGate,
    setSpeed,
    play,
    pause,
    toggle,
    restart,
    seek,
    release,
  };
}
