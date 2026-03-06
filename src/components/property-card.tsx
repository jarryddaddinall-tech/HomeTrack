import Link from "next/link";
import type { Property } from "@/lib/properties";
import { STAGE_LABELS } from "@/lib/properties";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(price);
}

export function PropertyCard({ property }: { property: Property }) {
  const isSelling = property.type === "selling";

  return (
    <Link
      href={`/dashboard/property/${property.id}`}
      className="group block rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
              isSelling
                ? "bg-amber-100 text-amber-800"
                : "bg-emerald-100 text-emerald-800"
            }`}
          >
            {isSelling ? "Selling" : "Buying"}
          </span>
          <h3 className="mt-2 font-semibold text-slate-900 group-hover:text-slate-700">
            {property.address}
          </h3>
          <p className="text-sm text-slate-500">{property.postcode}</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {formatPrice(property.price)}
          </p>
        </div>
        <svg
          className="h-5 w-5 shrink-0 text-slate-400 group-hover:text-slate-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-600">{STAGE_LABELS[property.status]}</span>
          <span className="font-medium text-slate-700">{property.progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-all ${
              isSelling ? "bg-amber-500" : "bg-emerald-500"
            }`}
            style={{ width: `${property.progress}%` }}
          />
        </div>
      </div>

      {property.targetCompletionDate && (
        <p className="mt-3 text-xs text-slate-500">
          Target completion:{" "}
          {new Date(property.targetCompletionDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      )}
    </Link>
  );
}
