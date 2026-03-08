"use client";

import { useRouter } from "next/navigation";
import { deletePropertyAction } from "@/app/actions/properties";

export function DeletePropertyButton({ propertyId }: { propertyId: string }) {
  const router = useRouter();

  async function handleClick() {
    if (!confirm("Delete this property? This cannot be undone.")) return;
    try {
      await deletePropertyAction(propertyId);
      router.push("/dashboard");
      router.refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to delete");
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
    >
      Delete property
    </button>
  );
}
