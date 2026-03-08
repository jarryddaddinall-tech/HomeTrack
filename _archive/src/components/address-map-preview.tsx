"use client";

/**
 * Mock map preview - simulates a small map view.
 * Replace with real map (e.g. Mapbox, Google Maps) in production.
 */
interface AddressMapPreviewProps {
  address: string;
  town: string;
  postcode: string;
}

export function AddressMapPreview({ address, town, postcode }: AddressMapPreviewProps) {
  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 shadow-soft-sm">
      {/* Mock map - abstract street grid with pin */}
      <div className="relative aspect-[2/1] bg-gradient-to-br from-slate-100 to-slate-200">
        {/* Grid lines (street pattern) */}
        <svg className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Location pin */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-accent p-2 shadow-soft">
              <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* Address summary */}
      <div className="border-t border-slate-100 bg-white px-4 py-3">
        <p className="font-medium text-slate-800">{address}</p>
        <p className="text-sm text-slate-500">
          {town}, {postcode}
        </p>
      </div>
    </div>
  );
}
