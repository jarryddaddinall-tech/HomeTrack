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

/** Placeholder when no property image: white + icon */
function PropertyImagePlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center border-b border-slate-100 bg-white">
      <svg
        className="h-16 w-16 text-slate-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    </div>
  );
}

export function PropertyCard({ property }: { property: Property }) {
  const isSelling = property.type === "selling";
  const subtitleParts = [
    property.beds && `${property.beds} bed`,
    property.baths && `${property.baths} bath`,
    property.propertyType,
  ].filter(Boolean);
  const location = [property.town, property.postcode].filter(Boolean).join(", ");
  const documentCount = property.documents?.length ?? 0;

  return (
    <Link
      href={`/dashboard/property/${property.id}`}
      className="group block overflow-hidden rounded-[20px] bg-white text-left shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08),0_8px_32px_-8px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)]"
    >
      {/* Image section: property image with rounded top and bottom fade */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[20px] bg-white">
        {property.imageUrl ? (
          <>
            <img
              src={property.imageUrl}
              alt=""
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/70 to-transparent sm:h-32"
              aria-hidden
            />
          </>
        ) : (
          <PropertyImagePlaceholder />
        )}
      </div>

      {/* Content section */}
      <div className="p-5">
        {/* Address + verified badge */}
        <div className="flex items-center justify-center gap-2">
          <h3 className="font-semibold text-slate-900 group-hover:text-slate-700">
            {property.address}
          </h3>
          <span
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white"
            title="Listed"
            aria-hidden
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
        </div>

        {/* Subtitle: 2-line description (key details + location/price) */}
        <p className="mt-1.5 text-center text-sm leading-snug text-slate-500">
          {subtitleParts.length ? subtitleParts.join(" · ") : STAGE_LABELS[property.status]}
          {location && (
            <>
              <br />
              {location}
            </>
          )}
          {!subtitleParts.length && !location && <br />}
        </p>
        <p className="mt-1 text-center text-sm font-semibold text-slate-900">{formatPrice(property.price)}</p>

        {/* Bottom row: metrics (left) + CTA (right) */}
        <div className="mt-4 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1.5" title="Progress">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {property.progress}%
            </span>
            <span className="flex items-center gap-1.5" title="Documents">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {documentCount}
            </span>
          </div>
          <span className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition-colors group-hover:bg-slate-100 group-hover:border-slate-300">
            View details
          </span>
        </div>
      </div>
    </Link>
  );
}
