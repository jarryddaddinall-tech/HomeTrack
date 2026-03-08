"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDocumentAction } from "@/app/actions/properties";

interface AddDocumentFormProps {
  propertyId: string;
  documentTypes: readonly string[];
}

export function AddDocumentForm({ propertyId, documentTypes }: AddDocumentFormProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    try {
      await addDocumentAction(propertyId, formData);
      setIsOpen(false);
      router.refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to add document");
    }
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-4 flex items-center gap-2 rounded-lg border border-dashed border-slate-100 px-4 py-2 text-sm text-slate-600 hover:border-slate-300 hover:text-slate-700"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add document
      </button>
    );
  }

  return (
    <form action={handleSubmit} className="mt-4 space-y-3 rounded-lg border border-slate-100 bg-white p-4">
      <div>
        <label htmlFor="doc-name" className="block text-sm font-medium text-slate-700">
          Document name *
        </label>
        <input
          id="doc-name"
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          placeholder="e.g. Survey report"
        />
      </div>
      <div>
        <label htmlFor="doc-type" className="block text-sm font-medium text-slate-700">
          Type
        </label>
        <select
          id="doc-type"
          name="type"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        >
          {documentTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="doc-status" className="block text-sm font-medium text-slate-700">
          Status
        </label>
        <select
          id="doc-status"
          name="status"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        >
          <option value="pending">Pending</option>
          <option value="received">Received</option>
          <option value="signed">Signed</option>
        </select>
      </div>
      <div>
        <label htmlFor="doc-url" className="block text-sm font-medium text-slate-700">
          Link (optional)
        </label>
        <input
          id="doc-url"
          name="url"
          type="url"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          placeholder="https://..."
        />
      </div>
      <div>
        <label htmlFor="doc-notes" className="block text-sm font-medium text-slate-700">
          Notes (optional)
        </label>
        <input
          id="doc-notes"
          name="notes"
          type="text"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          placeholder="e.g. Received 15 Mar"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="rounded-lg border border-slate-100 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
