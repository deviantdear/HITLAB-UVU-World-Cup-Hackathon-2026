import Link from "next/link";

const TABS = [
  { href: "/", key: "demo", label: "Orchestration" },
  { href: "/compare", key: "compare", label: "Equal Data Rights" },
];

export function NavTabs({ active }: { active: "demo" | "compare" }) {
  return (
    <nav className="flex items-center gap-1 rounded-full border border-slate-200 bg-white p-0.5">
      {TABS.map((t) => (
        <Link
          key={t.key}
          href={t.href}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
            active === t.key ? "bg-navy text-white" : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
