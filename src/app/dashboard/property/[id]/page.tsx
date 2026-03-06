import Link from "next/link";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { Header } from "@/components/header";
import {
  getPropertyById,
  STAGE_LABELS,
  type TransactionStage,
} from "@/lib/properties";

const STAGE_ORDER: TransactionStage[] = [
  "offer_accepted",
  "survey_searches",
  "mortgage_offer",
  "contracts_exchanged",
  "completion",
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const user = cookieStore.get("mock-auth")?.value ?? null;

  if (!user) {
    redirect("/login");
  }

  const property = getPropertyById(id);
  if (!property) {
    notFound();
  }

  const isSelling = property.type === "selling";
  const currentStageIndex = STAGE_ORDER.indexOf(property.status);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header variant="property" user={user} />

      <main className="mx-auto max-w-4xl px-4 py-8">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center text-sm text-slate-600 hover:text-slate-900"
        >
          <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to dashboard
        </Link>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <span
              className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                isSelling ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
              }`}
            >
              {isSelling ? "Selling" : "Buying"}
            </span>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">
              {property.address}
            </h1>
            <p className="text-slate-500">{property.postcode}</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">
              {formatPrice(property.price)}
            </p>
          </div>

          <div className="border-b border-slate-200 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Transaction progress
            </h2>
            <div className="mt-4">
              {STAGE_ORDER.map((stage, index) => {
                const isComplete = index < currentStageIndex;
                const isCurrent = index === currentStageIndex;
                const isLast = index === STAGE_ORDER.length - 1;

                return (
                  <div key={stage} className="flex">
                    {/* Vertical stepper: line + node */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                          isComplete
                            ? "bg-emerald-100 text-emerald-700"
                            : isCurrent
                              ? "bg-amber-500 text-amber-950"
                              : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {isComplete ? (
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          index + 1
                        )}
                      </div>
                      {!isLast && (
                        <div
                          className={`mt-1 h-6 w-0.5 ${
                            isComplete ? "bg-emerald-200" : "bg-slate-200"
                          }`}
                        />
                      )}
                    </div>
                    <div className={`ml-4 ${isLast ? "pb-0" : "pb-6"}`}>
                      <p
                        className={
                          isCurrent ? "font-medium text-slate-900" : "text-slate-600"
                        }
                      >
                        {STAGE_LABELS[stage]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6 p-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-500">Key dates</h3>
              <dl className="mt-2 space-y-2">
                {property.offerAcceptedDate && (
                  <div>
                    <dt className="text-xs text-slate-500">Offer accepted</dt>
                    <dd className="font-medium text-slate-900">
                      {formatDate(property.offerAcceptedDate)}
                    </dd>
                  </div>
                )}
                {property.targetCompletionDate && (
                  <div>
                    <dt className="text-xs text-slate-500">Target completion</dt>
                    <dd className="font-medium text-slate-900">
                      {formatDate(property.targetCompletionDate)}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-500">Your team</h3>
              <dl className="mt-2 space-y-2">
                {property.solicitor && (
                  <div>
                    <dt className="text-xs text-slate-500">Solicitor</dt>
                    <dd className="font-medium text-slate-900">{property.solicitor}</dd>
                  </div>
                )}
                {property.agent && (
                  <div>
                    <dt className="text-xs text-slate-500">Estate agent</dt>
                    <dd className="font-medium text-slate-900">{property.agent}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          <div className="border-t border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-500">Next steps</h3>
            <p className="mt-2 text-slate-700">
              {property.status === "contracts_exchanged"
                ? "Awaiting completion date. Your solicitor will confirm the final transfer."
                : property.status === "completion"
                  ? "Transaction complete. Keys have been transferred."
                  : `Complete the ${STAGE_LABELS[property.status].toLowerCase()} stage. Your ${property.solicitor ? "solicitor" : "agent"} will be in touch with updates.`}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
