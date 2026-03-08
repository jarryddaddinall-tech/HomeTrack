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
      className="card-base card-hover group block p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
              isSelling
                ? "bg-amber-100 text-amber-800"
                : "bg-accent/10 text-accent"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {isSelling ? "Selling" : "Buying"}
          </span>
          <h3 className="mt-2 font-semibold text-slate-900 group-hover:text-accent">
            {property.address}
          </h3>
          <p className="text-sm text-slate-600">
            {[property.town, property.postcode].filter(Boolean).join(", ")}
          </p>
          {(property.beds || property.baths || property.propertyType) && (
            <p className="mt-1 text-xs text-slate-500">
              {[property.beds && `${property.beds} bed`, property.baths && `${property.baths} bath`, property.propertyType].filter(Boolean).join(" • ")}
            </p>
          )}
          <p className="mt-2 text-lg font-bold text-slate-900">
            {formatPrice(property.price)}
          </p>
        </div>
        <svg
          className="h-5 w-5 shrink-0 text-slate-500 group-hover:text-accent"
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

      <div className="mt-4 border-t border-slate-100 pt-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-600">{STAGE_LABELS[property.status]}</span>
          <span className="font-medium text-accent">{property.progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-accent transition-all"
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
