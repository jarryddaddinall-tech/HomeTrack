"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { mockAddressLookup, type AddressSuggestion } from "@/lib/mock-addresses";
import { mockPriceByPostcode } from "@/lib/mock-pricing";
import { AddressMapPreview } from "@/components/address-map-preview";

interface AddressInputProps {
  name?: string;
  postcodeName?: string;
  townName?: string;
  defaultValue?: string;
  defaultPostcode?: string;
  defaultTown?: string;
  onAddressSelect?: (address: string, town: string, postcode: string, estimatedPrice?: number) => void;
  priceInputId?: string;
  placeholder?: string;
  required?: boolean;
  showMap?: boolean;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

export function AddressInput({
  name = "address",
  postcodeName = "postcode",
  townName = "town",
  defaultValue = "",
  defaultPostcode = "",
  defaultTown = "",
  onAddressSelect,
  priceInputId,
  placeholder = "Start typing address, town or postcode",
  required = true,
  showMap = true,
}: AddressInputProps) {
  const [query, setQuery] = useState(defaultValue || defaultPostcode || defaultTown || "");
  const [postcode, setPostcode] = useState(defaultPostcode);
  const [town, setTown] = useState(defaultTown);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    defaultValue && (defaultTown || defaultPostcode) ? defaultValue : null
  );
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  // Clear town/postcode when user edits the input (manual entry)
  useEffect(() => {
    if (query && selectedAddress && query !== selectedAddress) {
      setSelectedAddress(null);
      setTown("");
      setPostcode("");
    }
  }, [query, selectedAddress]);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    mockAddressLookup(debouncedQuery).then((results) => {
      setSuggestions(results);
      setIsOpen(results.length > 0);
      setIsLoading(false);
    });
  }, [debouncedQuery]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = useCallback(
    (suggestion: AddressSuggestion) => {
      setQuery(suggestion.address);
      setPostcode(suggestion.postcode);
      setTown(suggestion.town);
      setSelectedAddress(suggestion.address);
      setIsOpen(false);
      setSuggestions([]);
      const estimatedPrice = mockPriceByPostcode(suggestion.postcode);
      onAddressSelect?.(suggestion.address, suggestion.town, suggestion.postcode, estimatedPrice);
      if (priceInputId && typeof document !== "undefined") {
        const priceEl = document.getElementById(priceInputId) as HTMLInputElement | null;
        if (priceEl && estimatedPrice) priceEl.value = String(estimatedPrice);
      }
    },
    [onAddressSelect, priceInputId]
  );

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        name={name}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => suggestions.length > 0 && setIsOpen(true)}
        placeholder={placeholder}
        required={required}
        autoComplete="off"
        className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 shadow-soft-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
      />
      <input type="hidden" name={postcodeName} value={postcode} />
      <input type="hidden" name={townName} value={town} />
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <svg className="h-4 w-4 animate-spin text-slate-400" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      )}
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-slate-100 bg-white py-1 shadow-soft">
          {suggestions.map((s, i) => (
            <li key={`${s.address}-${s.town}-${s.postcode}-${i}`}>
              <button
                type="button"
                onClick={() => handleSelect(s)}
                className="w-full px-4 py-2.5 text-left text-sm text-slate-700 transition-colors hover:bg-slate-50"
              >
                <span className="font-medium">{s.address}</span>
                <span className="ml-2 text-slate-500">{s.town}, {s.postcode}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {showMap && selectedAddress && town && postcode && (
        <AddressMapPreview address={selectedAddress} town={town} postcode={postcode} />
      )}
    </div>
  );
}
