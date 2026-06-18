"use client";

export function Settings({
  reviewerName,
  onNameChange,
}: {
  reviewerName: string;
  onNameChange: (name: string) => void;
}) {
  return (
    <div className="mx-auto max-w-[680px] px-[30px] pb-16 pt-7">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-[22px] py-4">
          <div className="font-display text-base font-extrabold text-slate-900">Reviewer identity</div>
          <div className="text-[12.5px] text-slate-400">Shown on every approval stamp and review action.</div>
        </div>
        <div className="px-[22px] py-5">
          <label className="mb-1.5 block text-[12px] font-semibold text-slate-600">Name</label>
          <input
            value={reviewerName}
            onChange={(e) => onNameChange(e.target.value)}
            className="w-full max-w-[320px] rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-navy"
          />
          <p className="mt-2 text-[12px] text-slate-400">
            Appears as the accountable human on published models and approvals.
          </p>
        </div>
      </div>
    </div>
  );
}
