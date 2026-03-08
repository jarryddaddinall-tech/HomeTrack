"use client";

import { useRouter } from "next/navigation";
import { removeFromShortlistAction } from "@/app/actions/shortlist";
import type { ShortlistItem as ShortlistItemType } from "@/lib/shortlist";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(price);
}

const SOURCE_COLORS: Record<string, string> = {
  Rightmove: "bg-blue-100 text-blue-800",
  Zoopla: "bg-purple-100 text-purple-800",
  OnTheMarket: "bg-emerald-100 text-emerald-800",
  PrimeLocation: "bg-amber-100 text-amber-800",
};

interface ShortlistItemProps {
  item: ShortlistItemType;
  projectId: string;
}

export function ShortlistItem({ item, projectId }: ShortlistItemProps) {
  const router = useRouter();

  async function handleRemove() {
    await removeFromShortlistAction(projectId, item.id);
    router.refresh();
  }

  return (
    <li className="flex items-center justify-between gap-4 rounded-lg border border-slate-100 bg-white px-4 py-3 shadow-soft-sm">
      <div className="min-w-0 flex-1">
        <p className="font-medium text-slate-900">{item.address}</p>
        <p className="text-sm text-slate-500">{item.town}, {item.postcode}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          {item.beds && <span className="text-xs text-slate-600">{item.beds} bed</span>}
          {item.baths && <span className="text-xs text-slate-600">{item.baths} bath</span>}
          {item.propertyType && <span className="text-xs text-slate-600">{item.propertyType}</span>}
          <span
            className={`rounded px-2 py-0.5 text-xs font-medium ${SOURCE_COLORS[item.source] ?? "bg-slate-100 text-slate-700"}`}
          >
            {item.source}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="font-semibold text-slate-900">{formatPrice(item.price)}</span>
        {item.sourceUrl && (
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent hover:underline"
          >
            View
          </a>
        )}
        <button
          type="button"
          onClick={handleRemove}
          className="text-sm text-slate-500 hover:text-red-600"
        >
          Remove
        </button>
      </div>
    </li>
  );
}
