"use client";

import Link from "next/link";
import type { Property, TransactionStage } from "@/lib/properties";
import { STAGE_LABELS } from "@/lib/properties";

const STAGE_ORDER: TransactionStage[] = [
  "offer_accepted",
  "survey_searches",
  "mortgage_offer",
  "contracts_exchanged",
  "completion",
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getCurrentStepWith(currentStage: TransactionStage): "agent" | "solicitor" {
  return currentStage === "offer_accepted" ? "agent" : "solicitor";
}

export type ConsumerVariant = "buyer" | "seller";

interface PropertyViewConsumerProps {
  property: Property;
  variant: ConsumerVariant;
  propertyId: string;
}

export function PropertyViewConsumer({ property, variant, propertyId }: PropertyViewConsumerProps) {
  const isSeller = variant === "seller";
  const currentStageIndex = STAGE_ORDER.indexOf(property.status);
  const stepsTotal = STAGE_ORDER.length;
  const stepsLeft =
    property.status === "completion"
      ? 0
      : Math.max(0, stepsTotal - 1 - currentStageIndex);
  const currentStepWith = getCurrentStepWith(property.status);
  const documents = property.documents ?? [];
  const pendingDocs = documents.filter((d) => d.status === "pending" || d.status === "received");
  const docsLeft = pendingDocs.length;
  const completionDate =
    property.completionDate ?? property.targetCompletionDate ?? null;
  const statusLabel = STAGE_LABELS[property.status];

  const copy = isSeller
    ? {
        roleLabel: "Seller",
        completionHeadline: "Completion date",
        stepsLabel: "tasks left",
        currentStepWith: (who: "agent" | "solicitor") =>
          who === "agent" ? "Agent" : "Solicitor",
        documentsLine: (n: number) =>
          n === 0
            ? "No documents waiting."
            : n === 1
              ? "1 document left to approve."
              : `${n} documents left to approve.`,
        currentDocWith: (who: "agent" | "solicitor") =>
          who === "agent"
            ? "Current one is with Agent."
            : "Current one is with Solicitor.",
        holdingUp: "You're holding up nothing.",
        done: "Sale complete. Congratulations!",
      }
    : {
        roleLabel: "Buyer",
        completionHeadline: "Moving in",
        stepsLabel: "tasks left",
        currentStepWith: (who: "agent" | "solicitor") =>
          who === "agent" ? "Agent" : "Solicitor",
        documentsLine: (n: number) =>
          n === 0
            ? "No documents waiting."
            : n === 1
              ? "1 document left to approve."
              : `${n} documents left to approve.`,
        currentDocWith: (who: "agent" | "solicitor") =>
          who === "agent"
            ? "Current one is with Agent."
            : "Current one is with Solicitor.",
        holdingUp: "You're holding up nothing.",
        done: "You're in! Keys are yours.",
      };

  const whoNow = copy.currentStepWith(currentStepWith);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <main className="mx-auto max-w-lg px-4 py-6 pb-16">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center text-sm text-slate-500 hover:text-slate-800"
        >
          <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        {/* Address — one line, subtle */}
        <p className="text-slate-500 text-sm">
          {[property.address, property.town, property.postcode].filter(Boolean).join(", ")}
        </p>
        <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-slate-400">
          View as {copy.roleLabel}
        </p>

        {/* 1. STATUS — biggest, first thing (Instagram-style) */}
        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Status</p>
          <p className="mt-1.5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {property.status === "completion" ? "Complete" : statusLabel}
          </p>
        </div>

        {/* 2. COMPLETION — nice and big, the date that matters */}
        <div className="mt-10 rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            {copy.completionHeadline}
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {property.status === "completion" && completionDate
              ? formatDate(completionDate)
              : completionDate
                ? formatDate(completionDate)
                : "TBC"}
          </p>
          {property.status === "completion" && (
            <p className="mt-3 text-lg font-medium text-emerald-600">{copy.done}</p>
          )}
        </div>

        {/* 3. DATES — clear and visible (only if we have more than completion) */}
        {completionDate && property.status !== "completion" && (
          <div className="mt-6 rounded-xl bg-white/80 px-5 py-4 border border-slate-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Dates</p>
            <p className="mt-2 text-lg font-semibold text-slate-800">
              {formatDate(completionDate)}
            </p>
          </div>
        )}

        {/* 4. WHAT YOU NEED TO KNOW — minimal, no detail */}
        <div className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            What you need to know
          </p>
          <ul className="mt-4 space-y-4">
            {property.status !== "completion" && (
              <>
                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200/80 text-base font-bold text-slate-700">
                    {stepsLeft}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {stepsLeft} {copy.stepsLabel}
                    </p>
                    <p className="mt-0.5 text-slate-600">
                      Current step: {statusLabel}. Handled by {whoNow}.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200/80 text-base font-bold text-slate-700">
                    {docsLeft}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{copy.documentsLine(docsLeft)}</p>
                    {docsLeft > 0 && (
                      <p className="mt-0.5 text-slate-600">{copy.currentDocWith(currentStepWith)}</p>
                    )}
                  </div>
                </li>
                <li className="rounded-xl bg-emerald-50/90 border border-emerald-100 px-4 py-3">
                  <p className="font-medium text-emerald-800">{copy.holdingUp}</p>
                  <p className="mt-1 text-sm text-emerald-700">
                    {whoNow} will be in touch when they need you.
                  </p>
                </li>
              </>
            )}
            {property.status === "completion" && (
              <li className="rounded-xl bg-emerald-50/90 border border-emerald-100 px-4 py-3">
                <p className="font-medium text-emerald-800">{copy.done}</p>
              </li>
            )}
          </ul>
        </div>

        {/* Optional: full detail for Agent & Solicitor */}
        <p className="mt-12 text-center text-xs text-slate-400">
          <Link
            href={`/dashboard/property/${propertyId}?view=expert`}
            className="underline hover:text-slate-600"
          >
            Full detail
          </Link>{" "}
          (Agent & Solicitor view)
        </p>
      </main>
    </div>
  );
}
