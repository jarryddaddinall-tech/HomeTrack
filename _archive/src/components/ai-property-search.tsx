"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockAISearchProperties } from "@/lib/mock-ai-property";
import { addToShortlistAction } from "@/app/actions/shortlist";
import type { AIPropertyResult } from "@/lib/mock-ai-property";

interface AIPropertySearchProps {
  projectId: string;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(price);
}

const SOURCE_COLORS: Record<string, string> = {
  Rightmove: "bg-blue-100 text-blue-800",
  Zoopla: "bg-purple-100 text-purple-800",
  OnTheMarket: "bg-emerald-100 text-emerald-800",
  PrimeLocation: "bg-amber-100 text-amber-800",
};

export function AIPropertySearch({ projectId }: AIPropertySearchProps) {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState<AIPropertyResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addingId, setAddingId] = useState<string | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);
    setResults(null);
    try {
      const list = await mockAISearchProperties(prompt.trim());
      setResults(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddToShortlist(result: AIPropertyResult) {
    const id = `${result.address}-${result.postcode}`;
    setAddingId(id);
    try {
      await addToShortlistAction(projectId, result);
      router.refresh();
    } finally {
      setAddingId(null);
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your ideal home… e.g. 3 bed house in Clapham with a garden"
          rows={2}
          disabled={isLoading}
          className="flex-1 resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-soft-sm placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:opacity-70"
        />
        <button
          type="submit"
          disabled={!prompt.trim() || isLoading}
          className="self-end rounded-xl bg-accent px-4 py-3 font-medium text-white transition-colors hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            "Search"
          )}
        </button>
      </form>

      {isLoading && (
        <p className="flex items-center gap-2 text-sm text-slate-500">
          <span className="inline-flex gap-1">
            <span className="animate-pulse">●</span>
            <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>●</span>
            <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>●</span>
          </span>
          Searching Rightmove, Zoopla & more…
        </p>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      {results && results.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-600">Results</p>
          <ul className="divide-y divide-slate-100 rounded-lg border border-slate-100 bg-white shadow-soft">
            {results.map((r, i) => {
              const id = `${r.address}-${r.postcode}-${i}`;
              const isAdding = addingId === id;
              return (
                <li key={id} className="flex items-center justify-between gap-4 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-900">{r.address}</p>
                    <p className="text-sm text-slate-500">{r.town}, {r.postcode}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      {r.beds && <span className="text-xs text-slate-600">{r.beds} bed</span>}
                      {r.baths && <span className="text-xs text-slate-600">{r.baths} bath</span>}
                      {r.propertyType && <span className="text-xs text-slate-600">{r.propertyType}</span>}
                      <span
                        className={`rounded px-2 py-0.5 text-xs font-medium ${SOURCE_COLORS[r.source] ?? "bg-slate-100 text-slate-700"}`}
                      >
                        {r.source}
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="font-semibold text-slate-900">{formatPrice(r.price)}</span>
                    <button
                      type="button"
                      onClick={() => handleAddToShortlist(r)}
                      disabled={isAdding}
                      className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-white hover:bg-accent-600 disabled:opacity-70"
                    >
                      {isAdding ? "Adding…" : "Shortlist"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
