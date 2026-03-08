import Link from "next/link";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import {
  getPropertyById,
  STAGE_LABELS,
  STAGE_DETAILS,
  type TransactionStage,
  DOCUMENT_TYPES,
} from "@/lib/properties";
import { mockSolicitorCost, mockStampDuty, mockEstateAgentFee, mockValuationRange } from "@/lib/mock-pricing";
import { AddressMapPreview } from "@/components/address-map-preview";
import { UserMenu } from "@/components/user-menu";
import { AddDocumentForm } from "@/components/add-document-form";
import { DocumentStatusSelect } from "@/components/document-status-select";
import { MortgageCalculator } from "@/components/mortgage-calculator";

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
  const documents = property.documents ?? [];
  const solicitorCost = property.solicitorCost ?? mockSolicitorCost(property.price, property.type);
  const stampDuty = !isSelling ? mockStampDuty(property.price) : 0;
  const estateAgentFee = isSelling ? mockEstateAgentFee(property.price) : 0;
  const valuation = isSelling && property.postcode ? mockValuationRange(property.postcode) : null;

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/40 bg-white/90 shadow-soft-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link href="/dashboard" className="text-xl font-semibold text-slate-900">
            HomeClear
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href={`/dashboard/property/${id}/edit`}
              className="btn-secondary"
            >
              Edit
            </Link>
            <UserMenu user={user} />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <Link href="/dashboard" className="back-link mb-6">
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to dashboard
        </Link>

        <div className="card-base overflow-hidden">
          <div className="border-b border-slate-100 p-6">
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
            <p className="text-slate-500">
              {[property.town, property.postcode].filter(Boolean).join(", ")}
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">
              {formatPrice(property.price)}
            </p>
            {valuation && (
              <div className="mt-2 rounded-lg bg-accent/10 px-3 py-2">
                <p className="text-sm font-medium text-accent-800">
                  Valuation: {formatPrice(valuation.min)}–{formatPrice(valuation.max)}
                </p>
                <p className="text-xs text-accent-700/80">
                  Based on similar sales in your area. For guidance only.
                </p>
              </div>
            )}
            {property.address && (property.town || property.postcode) && (
              <div className="mt-4 max-w-sm">
                <AddressMapPreview
                  address={property.address}
                  town={property.town || "—"}
                  postcode={property.postcode}
                />
              </div>
            )}
          </div>

          <div className="border-b border-slate-100 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Transaction progress
            </h2>
            <div className="mt-4 space-y-4">
              {STAGE_ORDER.map((stage, index) => {
                const isComplete = index < currentStageIndex;
                const isCurrent = index === currentStageIndex;

                return (
                  <div key={stage} className="flex items-center gap-4">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
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
                    <div className="flex-1">
                      <p
                        className={
                          isCurrent ? "font-medium text-slate-900" : "text-slate-600"
                        }
                      >
                        {STAGE_LABELS[stage]}
                      </p>
                      {(isCurrent || isComplete) && (
                        <p className="mt-1 text-sm text-slate-500">
                          {STAGE_DETAILS[stage].description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6 border-b border-slate-100 p-6 sm:grid-cols-2">
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
                {property.exchangeDate && (
                  <div>
                    <dt className="text-xs text-slate-500">Exchange date</dt>
                    <dd className="font-medium text-slate-900">
                      {formatDate(property.exchangeDate)}
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
                {property.completionDate && (
                  <div>
                    <dt className="text-xs text-slate-500">Completion</dt>
                    <dd className="font-medium text-slate-900">
                      {formatDate(property.completionDate)}
                    </dd>
                  </div>
                )}
                {!isSelling && property.mortgageOfferExpiry && (
                  <div>
                    <dt className="text-xs text-slate-500">Mortgage offer expires</dt>
                    <dd className="font-medium text-slate-900">
                      {formatDate(property.mortgageOfferExpiry)}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-500">Your team</h3>
              <dl className="mt-2 space-y-3">
                {property.solicitor && (
                  <div>
                    <dt className="text-xs text-slate-500">Solicitor</dt>
                    <dd className="font-medium text-slate-900">{property.solicitor}</dd>
                    {property.solicitorCaseRef && (
                      <dd className="text-xs text-slate-500">Ref: {property.solicitorCaseRef}</dd>
                    )}
                    <dd className="mt-1 flex flex-wrap gap-2">
                      {property.solicitorEmail && (
                        <a
                          href={`mailto:${property.solicitorEmail}`}
                          className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Email
                        </a>
                      )}
                      {property.solicitorPhone && (
                        <a
                          href={`tel:${property.solicitorPhone.replace(/\s/g, "")}`}
                          className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          Call
                        </a>
                      )}
                    </dd>
                  </div>
                )}
                {property.agent && (
                  <div>
                    <dt className="text-xs text-slate-500">Estate agent</dt>
                    <dd className="font-medium text-slate-900">{property.agent}</dd>
                    <dd className="mt-1 flex flex-wrap gap-2">
                      {property.agentEmail && (
                        <a
                          href={`mailto:${property.agentEmail}`}
                          className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
                        >
                          Email
                        </a>
                      )}
                      {property.agentPhone && (
                        <a
                          href={`tel:${property.agentPhone.replace(/\s/g, "")}`}
                          className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
                        >
                          Call
                        </a>
                      )}
                    </dd>
                  </div>
                )}
                {!isSelling && property.depositAmount !== undefined && property.depositAmount > 0 && (
                  <div>
                    <dt className="text-xs text-slate-500">Deposit</dt>
                    <dd className="font-medium text-slate-900">{formatPrice(property.depositAmount)}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          {!isSelling && (
            <div className="border-b border-slate-100 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Mortgage & affordability
              </h2>
              <div className="mt-4">
                <MortgageCalculator
                  defaultPrice={property.price}
                  defaultDeposit={property.depositAmount}
                />
              </div>
            </div>
          )}

          <div className="border-b border-slate-100 p-6">
            <h3 className="text-sm font-semibold text-slate-500">Costs (estimated)</h3>
            <dl className="mt-3 space-y-2">
              <div className="flex justify-between">
                <dt className="text-slate-600">Solicitor fees</dt>
                <dd className="font-medium text-slate-900">{formatPrice(solicitorCost)}</dd>
              </div>
              {!isSelling && stampDuty > 0 && (
                <div className="flex justify-between">
                  <dt className="text-slate-600">Stamp duty</dt>
                  <dd className="font-medium text-slate-900">{formatPrice(stampDuty)}</dd>
                </div>
              )}
              {isSelling && estateAgentFee > 0 && (
                <div className="flex justify-between">
                  <dt className="text-slate-600">Estate agent (approx.)</dt>
                  <dd className="font-medium text-slate-900">{formatPrice(estateAgentFee)}</dd>
                </div>
              )}
            </dl>
            <p className="mt-2 text-xs text-slate-500">
              Estimates are for guidance. Your solicitor will confirm final figures.
            </p>
          </div>

          <div className="border-b border-slate-100 p-6">
            <h3 className="text-sm font-semibold text-slate-500">Documents</h3>
            {documents.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {documents.map((doc) => (
                  <li
                    key={doc.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50/50 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-slate-900">{doc.name}</p>
                      {doc.notes && (
                        <p className="text-xs text-slate-500">{doc.notes}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <DocumentStatusSelect
                        propertyId={id}
                        docId={doc.id}
                        currentStatus={doc.status}
                      />
                      {doc.url && (
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded bg-slate-200 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-300"
                        >
                          View
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-slate-500">No documents added yet.</p>
            )}
            <AddDocumentForm propertyId={id} documentTypes={DOCUMENT_TYPES} />
          </div>

          <div className="border-t border-slate-100 p-6">
            <h3 className="text-sm font-semibold text-slate-500">Next steps</h3>
            <p className="mt-2 text-slate-700">
              {property.status === "contracts_exchanged"
                ? "Awaiting completion date. Your solicitor will confirm the final transfer and key handover."
                : property.status === "completion"
                  ? "You're in! Keys have been handed over. Congratulations on your move."
                  : `Focus on the ${STAGE_LABELS[property.status].toLowerCase()} stage. Your ${property.solicitor ? "solicitor" : "agent"} will be in touch with updates.`}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
