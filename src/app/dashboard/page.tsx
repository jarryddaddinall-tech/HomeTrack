import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Header } from "@/components/header";
import { EmptyState } from "@/components/empty-state";
import { PropertyCard } from "@/components/property-card";
import { MOCK_PROPERTIES } from "@/lib/properties";

const SellingIcon = () => (
  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const BuyingIcon = () => (
  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const user = cookieStore.get("mock-auth")?.value ?? null;

  if (!user) {
    redirect("/login");
  }

  const sellingProperties = MOCK_PROPERTIES.filter((p) => p.type === "selling");
  const buyingProperties = MOCK_PROPERTIES.filter((p) => p.type === "buying");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header variant="dashboard" user={user} />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Your transactions</h1>
          <p className="mt-1 text-slate-600">
            Track your property sale and purchase in one place.
          </p>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-xs text-amber-700">
                S
              </span>
              Properties you&apos;re selling
            </h2>
            {sellingProperties.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sellingProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <EmptyState
                variant="selling"
                icon={<SellingIcon />}
                title="No properties to sell"
                description="When you list a property, it will appear here."
              />
            )}
          </section>

          <section>
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-700">
                B
              </span>
              Properties you&apos;re buying
            </h2>
            {buyingProperties.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {buyingProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <EmptyState
                variant="buying"
                icon={<BuyingIcon />}
                title="No properties to buy"
                description="When you make an offer, it will appear here."
              />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
