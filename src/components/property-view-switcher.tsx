"use client";

import Link from "next/link";

type View = "buyer" | "seller" | "expert";

interface PropertyViewSwitcherProps {
  propertyId: string;
  currentView: View;
}

export function PropertyViewSwitcher({ propertyId, currentView }: PropertyViewSwitcherProps) {
  const base = `/dashboard/property/${propertyId}`;
  const views: { view: View; label: string }[] = [
    { view: "buyer", label: "Buyer" },
    { view: "seller", label: "Seller" },
    { view: "expert", label: "Expert" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2">
      <span className="mr-1 text-xs font-medium text-slate-500">View as:</span>
      {views.map(({ view, label }) => {
        const isActive = currentView === view;
        const href = view === "expert" ? `${base}?view=expert` : `${base}?view=${view}`;
        return (
          <Link
            key={view}
            href={href}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
                : "text-slate-600 hover:bg-white/80 hover:text-slate-900"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
