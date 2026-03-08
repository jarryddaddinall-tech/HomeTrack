import Link from "next/link";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { updatePropertyAction } from "@/app/actions/properties";
import { AddressInput } from "@/components/address-input";
import { UserMenu } from "@/components/user-menu";
import { DeletePropertyButton } from "@/components/delete-property-button";
import { getPropertyById, STAGE_LABELS, type TransactionStage } from "@/lib/properties";

const STAGES: TransactionStage[] = [
  "offer_accepted",
  "survey_searches",
  "mortgage_offer",
  "contracts_exchanged",
  "completion",
];

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const user = cookieStore.get("mock-auth")?.value ?? null;

  if (!user) redirect("/login");

  const property = getPropertyById(id);
  if (!property) notFound();

  const isSelling = property.type === "selling";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="border-b border-black/5 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <Link href="/dashboard" className="text-xl font-semibold text-slate-900">
            HomeClear
          </Link>
          <UserMenu user={user} />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="page-title">Edit property</h1>
        <p className="mt-1 text-slate-600">{property.address}</p>

        <form action={updatePropertyAction.bind(null, id)} className="mt-8 space-y-6">
          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-soft">
            <h2 className="section-title">Property & progress</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-slate-700">Address *</label>
                <AddressInput
                  name="address"
                  postcodeName="postcode"
                  townName="town"
                  defaultValue={property.address}
                  defaultPostcode={property.postcode}
                  defaultTown={property.town}
                  placeholder="Start typing address, town or postcode"
                  required
                  showMap
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-slate-700">Price (£)</label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="1000"
                    defaultValue={property.price}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                  />
                </div>
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-slate-700">Current stage</label>
                  <select
                    id="status"
                    name="status"
                    defaultValue={property.status}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                  >
                    {STAGES.map((s) => (
                      <option key={s} value={s}>
                        {STAGE_LABELS[s]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="offerAcceptedDate" className="block text-sm font-medium text-slate-700">Offer accepted</label>
                  <input
                    id="offerAcceptedDate"
                    name="offerAcceptedDate"
                    type="date"
                    defaultValue={property.offerAcceptedDate ?? ""}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                  />
                </div>
                <div>
                  <label htmlFor="targetCompletionDate" className="block text-sm font-medium text-slate-700">Target completion</label>
                  <input
                    id="targetCompletionDate"
                    name="targetCompletionDate"
                    type="date"
                    defaultValue={property.targetCompletionDate ?? ""}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="exchangeDate" className="block text-sm font-medium text-slate-700">Exchange date</label>
                  <input
                    id="exchangeDate"
                    name="exchangeDate"
                    type="date"
                    defaultValue={property.exchangeDate ?? ""}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                  />
                </div>
                <div>
                  <label htmlFor="completionDate" className="block text-sm font-medium text-slate-700">Completion date</label>
                  <input
                    id="completionDate"
                    name="completionDate"
                    type="date"
                    defaultValue={property.completionDate ?? ""}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                  />
                </div>
              </div>
              {!isSelling && (
                <>
                  <div>
                    <label htmlFor="mortgageOfferExpiry" className="block text-sm font-medium text-slate-700">Mortgage offer expiry</label>
                    <input
                      id="mortgageOfferExpiry"
                      name="mortgageOfferExpiry"
                      type="date"
                      defaultValue={property.mortgageOfferExpiry ?? ""}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="depositAmount" className="block text-sm font-medium text-slate-700">Deposit (£)</label>
                    <input
                      id="depositAmount"
                      name="depositAmount"
                      type="number"
                      min="0"
                      step="1000"
                      defaultValue={property.depositAmount ?? ""}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-soft">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Your team</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="solicitor" className="block text-sm font-medium text-slate-700">Solicitor</label>
                <input
                  id="solicitor"
                  name="solicitor"
                  type="text"
                  defaultValue={property.solicitor ?? ""}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 shadow-soft-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="solicitorEmail" className="block text-sm font-medium text-slate-700">Solicitor email</label>
                  <input
                    id="solicitorEmail"
                    name="solicitorEmail"
                    type="email"
                    defaultValue={property.solicitorEmail ?? ""}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                  />
                </div>
                <div>
                  <label htmlFor="solicitorPhone" className="block text-sm font-medium text-slate-700">Solicitor phone</label>
                  <input
                    id="solicitorPhone"
                    name="solicitorPhone"
                    type="tel"
                    defaultValue={property.solicitorPhone ?? ""}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="solicitorCaseRef" className="block text-sm font-medium text-slate-700">Case reference</label>
                <input
                  id="solicitorCaseRef"
                  name="solicitorCaseRef"
                  type="text"
                  defaultValue={property.solicitorCaseRef ?? ""}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 shadow-soft-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
                />
              </div>
              <div>
                <label htmlFor="agent" className="block text-sm font-medium text-slate-700">Estate agent</label>
                <input
                  id="agent"
                  name="agent"
                  type="text"
                  defaultValue={property.agent ?? ""}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 shadow-soft-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="agentEmail" className="block text-sm font-medium text-slate-700">Agent email</label>
                  <input
                    id="agentEmail"
                    name="agentEmail"
                    type="email"
                    defaultValue={property.agentEmail ?? ""}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                  />
                </div>
                <div>
                  <label htmlFor="agentPhone" className="block text-sm font-medium text-slate-700">Agent phone</label>
                  <input
                    id="agentPhone"
                    name="agentPhone"
                    type="tel"
                    defaultValue={property.agentPhone ?? ""}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className="btn-primary bg-accent">
              Save changes
            </button>
            <Link href={`/dashboard/property/${id}`} className="btn-secondary">
              Cancel
            </Link>
            <div className="ml-auto">
              <DeletePropertyButton propertyId={id} />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
