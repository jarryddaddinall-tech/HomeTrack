"use client";

import { useState, useEffect } from "react";
import { mockPropertyLookupByPostcode, type PropertyListing } from "@/lib/mock-property-lookup";

interface PostcodeLookupProps {
  onSelect: (listing: PropertyListing) => void;
  placeholder?: string;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(price);
}

export function PostcodeLookup({ onSelect, placeholder = "Enter postcode (e.g. SW4 2PQ)" }: PostcodeLookupProps) {
  const [postcode, setPostcode] = useState("");
  const [listings, setListings] = useState<PropertyListing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<PropertyListing | null>(null);

  useEffect(() => {
    if (!postcode || postcode.length < 3) {
      setListings([]);
      return;
    }
    setIsLoading(true);
    mockPropertyLookupByPostcode(postcode).then((results) => {
      setListings(results);
      setIsLoading(false);
    });
  }, [postcode]);

  function handleSelect(listing: PropertyListing) {
    setSelected(listing);
    setListings([]);
    setPostcode("");
  }

  function handleConfirm() {
    if (selected) {
      onSelect(selected);
      setSelected(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value.toUpperCase())}
          placeholder={placeholder}
          disabled={!!selected}
          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 shadow-soft-sm placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30 disabled:bg-slate-50"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="h-4 w-4 animate-spin text-slate-400" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        )}
      </div>

      {listings.length > 0 && !selected && (
        <ul className="max-h-64 overflow-auto rounded-lg border border-slate-100 bg-white shadow-soft">
          {listings.map((l, i) => (
            <li key={`${l.address}-${l.postcode}-${i}`}>
              <button
                type="button"
                onClick={() => handleSelect(l)}
                className="w-full px-4 py-3 text-left transition-colors hover:bg-slate-50"
              >
                <span className="font-medium text-slate-900">{l.address}</span>
                <span className="ml-2 text-slate-500">{l.town}, {l.postcode}</span>
                <div className="mt-1 flex items-center gap-3 text-sm text-slate-600">
                  <span>{l.beds} bed</span>
                  <span>{l.baths} bath</span>
                  <span>{l.propertyType}</span>
                  <span className="font-medium text-slate-700">{formatPrice(l.price)}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-soft">
          <h3 className="font-semibold text-slate-900">{selected.address}</h3>
          <p className="text-sm text-slate-500">{selected.town}, {selected.postcode}</p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
            <span>{selected.beds} bed</span>
            <span>{selected.baths} bath</span>
            <span>{selected.propertyType}</span>
            <span className="font-semibold text-slate-900">{formatPrice(selected.price)}</span>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Change
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-600"
            >
              Use this property
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
