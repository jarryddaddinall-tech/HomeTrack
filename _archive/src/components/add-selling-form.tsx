"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PostcodeLookup } from "@/components/postcode-lookup";
import { addSellingPropertyFromLookup } from "@/app/actions/selling";
import type { PropertyListing } from "@/lib/mock-property-lookup";

interface AddSellingFormProps {
  projectId: string;
}

export function AddSellingForm({ projectId }: AddSellingFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSelect(listing: PropertyListing) {
    setIsSubmitting(true);
    setError(null);
    try {
      await addSellingPropertyFromLookup(projectId, listing);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-4">
      <PostcodeLookup onSelect={handleSelect} placeholder="Enter postcode (e.g. SW4 2PQ)" />
      {isSubmitting && (
        <p className="flex items-center gap-2 text-sm text-slate-500">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Adding your property…
        </p>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
