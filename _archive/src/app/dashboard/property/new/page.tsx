import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createProperty } from "@/app/actions/properties";
import { AddressInput } from "@/components/address-input";
import { UserMenu } from "@/components/user-menu";
import { STAGE_LABELS, type TransactionStage } from "@/lib/properties";

const STAGES: TransactionStage[] = [
  "offer_accepted",
  "survey_searches",
  "mortgage_offer",
  "contracts_exchanged",
  "completion",
];

export default async function AddPropertyPage() {
  const cookieStore = await cookies();
  const user = cookieStore.get("mock-auth")?.value ?? null;

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <Link href="/dashboard" className="text-xl font-semibold text-slate-800">
            HomeClear
          </Link>
          <UserMenu user={user} />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="font-display text-2xl font-bold text-slate-900">Let&apos;s add your property</h1>
        <p className="mt-2 text-slate-600">
          We&apos;ll keep it simple.
        </p>

        <form action={createProperty} className="mt-8 space-y-6">
          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-soft">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Property details
            </h2>
            <div className="mt-5 space-y-5">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-slate-700">
                  Address *
                </label>
                <AddressInput
                  name="address"
                  postcodeName="postcode"
                  townName="town"
                  priceInputId="price"
                  placeholder="Start typing address, town or postcode (e.g. Clapham, SW4 2PQ)"
                  required
                  showMap
                />
                <p className="mt-1.5 text-xs text-slate-500">
                  Select an address to auto-fill estimated price
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-slate-700">
                    Transaction type
                  </label>
                  <select
                    id="type"
                    name="type"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 shadow-soft-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
                  >
                    <option value="buying">Buying</option>
                    <option value="selling">Selling</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-slate-700">
                    Price (£)
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="1000"
                    required
                    className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 shadow-soft-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
                    placeholder="e.g. 485000"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-slate-700">
                    Current stage
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 shadow-soft-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
                  >
                    {STAGES.map((s) => (
                      <option key={s} value={s}>
                        {STAGE_LABELS[s]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="offerAcceptedDate" className="block text-sm font-medium text-slate-700">
                    Offer accepted date
                  </label>
                  <input
                    id="offerAcceptedDate"
                    name="offerAcceptedDate"
                    type="date"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 shadow-soft-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="targetCompletionDate" className="block text-sm font-medium text-slate-700">
                  Target completion date
                </label>
                <input
                  id="targetCompletionDate"
                  name="targetCompletionDate"
                  type="date"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 shadow-soft-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-soft">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Your solicitor
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="solicitor" className="block text-sm font-medium text-slate-700">
                  Firm name
                </label>
                <input
                  id="solicitor"
                  name="solicitor"
                  type="text"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 shadow-soft-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
                  placeholder="e.g. Barton & Co Solicitors"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="solicitorEmail" className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    id="solicitorEmail"
                    name="solicitorEmail"
                    type="email"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 shadow-soft-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
                    placeholder="enquiries@firm.co.uk"
                  />
                </div>
                <div>
                  <label htmlFor="solicitorPhone" className="block text-sm font-medium text-slate-700">
                    Phone
                  </label>
                  <input
                    id="solicitorPhone"
                    name="solicitorPhone"
                    type="tel"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 shadow-soft-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
                    placeholder="020 7123 4567"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="solicitorCaseRef" className="block text-sm font-medium text-slate-700">
                  Case reference
                </label>
                <input
                  id="solicitorCaseRef"
                  name="solicitorCaseRef"
                  type="text"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 shadow-soft-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
                  placeholder="e.g. BART-2025-001"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-soft">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Estate agent
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="agent" className="block text-sm font-medium text-slate-700">
                  Agent name
                </label>
                <input
                  id="agent"
                  name="agent"
                  type="text"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 shadow-soft-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
                  placeholder="e.g. Knight Frank"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="agentEmail" className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    id="agentEmail"
                    name="agentEmail"
                    type="email"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 shadow-soft-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
                  />
                </div>
                <div>
                  <label htmlFor="agentPhone" className="block text-sm font-medium text-slate-700">
                    Phone
                  </label>
                  <input
                    id="agentPhone"
                    name="agentPhone"
                    type="tel"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 shadow-soft-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm" id="buyer-only">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Mortgage (buyers only)
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="mortgageOfferExpiry" className="block text-sm font-medium text-slate-700">
                  Mortgage offer expiry date
                </label>
                <input
                  id="mortgageOfferExpiry"
                  name="mortgageOfferExpiry"
                  type="date"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 shadow-soft-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
                />
              </div>
              <div>
                <label htmlFor="depositAmount" className="block text-sm font-medium text-slate-700">
                  Deposit amount (£)
                </label>
                <input
                  id="depositAmount"
                  name="depositAmount"
                  type="number"
                  min="0"
                  step="1000"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 shadow-soft-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400/30"
                  placeholder="e.g. 62000"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              href="/dashboard"
              className="rounded-lg border border-slate-300 bg-white px-6 py-2 font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-xl bg-accent px-6 py-2.5 font-medium text-white transition-colors hover:bg-accent-600"
            >
              Add property
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
