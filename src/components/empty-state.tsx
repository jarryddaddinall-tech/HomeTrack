import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  variant: "selling" | "buying";
}

export function EmptyState({ icon, title, description, variant }: EmptyStateProps) {
  const isSelling = variant === "selling";
  return (
    <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 text-center transition-colors hover:border-slate-300">
      <div
        className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${
          isSelling ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"
        }`}
      >
        {icon}
      </div>
      <h3 className="font-semibold text-slate-800">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  );
}
