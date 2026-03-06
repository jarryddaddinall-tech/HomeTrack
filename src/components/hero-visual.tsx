import Link from "next/link";

/**
 * Hero visual: abstract dashboard mockup showing property cards and progress.
 * Inspired by award-winning SaaS hero sections (Stable, Cleaq).
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto mt-16 max-w-2xl">
      {/* Glow */}
      <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-slate-200/50 to-slate-100/50 blur-2xl" />
      {/* Card stack mockup */}
      <div className="relative rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-500">Your transactions</span>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
            2 active
          </span>
        </div>
        <div className="space-y-3">
          {/* Card 1 - Selling */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                  Selling
                </span>
                <p className="mt-1.5 font-semibold text-slate-800">42 Oak Lane</p>
                <p className="text-sm text-slate-500">SW1A 1AA</p>
              </div>
              <span className="text-sm font-semibold text-slate-700">£425,000</span>
            </div>
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-xs text-slate-500">
                <span>Contract</span>
                <span className="font-medium text-slate-700">60%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all"
                  style={{ width: "60%" }}
                />
              </div>
            </div>
          </div>
          {/* Card 2 - Buying */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm opacity-90">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                  Buying
                </span>
                <p className="mt-1.5 font-semibold text-slate-800">8 Maple Drive</p>
                <p className="text-sm text-slate-500">E1 6AN</p>
              </div>
              <span className="text-sm font-semibold text-slate-700">£380,000</span>
            </div>
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-xs text-slate-500">
                <span>Mortgage</span>
                <span className="font-medium text-slate-700">40%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{ width: "40%" }}
                />
              </div>
            </div>
          </div>
        </div>
        <Link
          href="/signup"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          View dashboard
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
