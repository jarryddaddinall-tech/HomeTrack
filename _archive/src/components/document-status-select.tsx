"use client";

import { useRouter } from "next/navigation";
import { updateDocumentAction } from "@/app/actions/properties";
import type { DocumentStatus } from "@/lib/properties";

const STATUS_LABELS: Record<DocumentStatus, string> = {
  pending: "Pending",
  received: "Received",
  signed: "Signed",
};

export function DocumentStatusSelect({
  propertyId,
  docId,
  currentStatus,
}: {
  propertyId: string;
  docId: string;
  currentStatus: DocumentStatus;
}) {
  const router = useRouter();

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const status = e.target.value as DocumentStatus;
    const formData = new FormData();
    formData.set("status", status);
    await updateDocumentAction(propertyId, docId, formData);
    router.refresh();
  }

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      className={`rounded px-2 py-1 text-xs font-medium ${
        currentStatus === "signed"
          ? "bg-emerald-100 text-emerald-800"
          : currentStatus === "received"
            ? "bg-amber-100 text-amber-800"
            : "bg-slate-100 text-slate-600"
      }`}
    >
      {(Object.keys(STATUS_LABELS) as DocumentStatus[]).map((s) => (
        <option key={s} value={s}>
          {STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  );
}
