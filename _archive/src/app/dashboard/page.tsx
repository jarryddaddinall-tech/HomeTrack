import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Header } from "@/components/header";
import { PropertyCard } from "@/components/property-card";
import { getAllProperties } from "@/lib/properties";
import { getAllProjects, PROBLEM_REASON_LABELS } from "@/lib/projects";

function getUpcomingReminders(properties: Awaited<ReturnType<typeof getAllProperties>>) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const in7Days = new Date(today);
  in7Days.setDate(in7Days.getDate() + 7);

  const reminders: { propertyId: string; propertyAddress: string; type: string; date: string; daysUntil: number }[] = [];

  for (const p of properties) {
    if (p.status === "completion") continue;

    const dates: { label: string; dateStr: string | undefined }[] = [
      { label: "Target completion", dateStr: p.targetCompletionDate },
      { label: "Mortgage expiry", dateStr: p.mortgageOfferExpiry },
    ];

    for (const { label, dateStr } of dates) {
      if (!dateStr) continue;
      const d = new Date(dateStr);
      d.setHours(0, 0, 0, 0);
      if (d >= today && d <= in7Days) {
        const daysUntil = Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        reminders.push({
          propertyId: p.id,
          propertyAddress: p.address,
          type: label,
          date: dateStr,
          daysUntil,
        });
      }
    }
  }

  return reminders.sort((a, b) => a.daysUntil - b.daysUntil).slice(0, 5);
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const user = cookieStore.get("mock-auth")?.value ?? null;

  if (!user) {
    redirect("/login");
  }

  const projects = getAllProjects();
  const allProperties = getAllProperties();
  const sellingProperties = allProperties.filter((p) => p.type === "selling");
  const buyingProperties = allProperties.filter((p) => p.type === "buying");
  const hasProperties = sellingProperties.length > 0 || buyingProperties.length > 0;
  const hasProjects = projects.length > 0;
  const reminders = getUpcomingReminders(allProperties);

  return (
    <div className="min-h-screen">
      <Header variant="dashboard" user={user} />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="page-title">
              Hi{user.includes("@") ? ` ${user.split("@")[0]}` : ""}, here&apos;s where things stand
            </h1>
            <p className="mt-2 text-slate-600">
              Your sale and purchase in one place.
            </p>
          </div>
          <Link href="/dashboard/project/new" className="btn-primary bg-accent">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Start a move
          </Link>
        </div>

        {reminders.length > 0 && (
          <section className="card-base mb-10 p-6">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Upcoming dates
            </h2>
            <ul className="space-y-1">
              {reminders.map((r) => (
                <li key={`${r.propertyId}-${r.type}-${r.date}`}>
                  <Link
                    href={`/dashboard/property/${r.propertyId}`}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-slate-50/80"
                  >
                    <span className="text-slate-900">
                      <span className="font-medium">{r.propertyAddress}</span>
                      <span className="text-slate-600"> — {r.type}</span>
                    </span>
                    <span className="font-medium text-accent">
                      {r.daysUntil === 0 ? "Today" : r.daysUntil === 1 ? "Tomorrow" : `In ${r.daysUntil} days`}
                      <span className="ml-2 text-slate-600">
                        ({new Date(r.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })})
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {!hasProjects ? (
          <div className="card-base p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="mt-4 font-display text-lg font-semibold text-slate-900">I want to move house</h2>
            <p className="mx-auto mt-2 max-w-sm text-slate-600">
              Start with why you&apos;re moving. Add the home you&apos;re selling, then describe your ideal home.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
              <Link href="/start" className="btn-primary w-full bg-accent sm:w-auto">
                Thinking about moving? Start here
              </Link>
              <Link href="/dashboard/project/new" className="btn-secondary w-full sm:w-auto">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Start my move
              </Link>
            </div>
          </div>
        ) : (
          <>
            <section className="mb-10">
              <h2 className="section-title mb-4">Your moves</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/dashboard/project/${project.id}`}
                    className="card-base card-hover block p-6"
                  >
                    <h3 className="font-semibold text-slate-900">{project.name}</h3>
                    {project.reason && (
                      <p className="mt-1 text-xs text-slate-500">
                        {PROBLEM_REASON_LABELS[project.reason]}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-slate-600">
                      {!project.sellingPropertyId && !project.buyingPropertyId
                        ? "Add your home to sell and your ideal home"
                        : project.sellingPropertyId && project.buyingPropertyId
                          ? "Selling & buying"
                          : project.sellingPropertyId
                            ? "Add your ideal home"
                            : "Add your home to sell"}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
                      Open
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
            {hasProperties && (
              <div className="space-y-10">
            {sellingProperties.length > 0 && (
              <section>
                <h2 className="section-title mb-4 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-xs font-medium text-amber-700">
                    S
                  </span>
                  Properties you&apos;re selling
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {sellingProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </section>
            )}

            {buyingProperties.length > 0 && (
              <section>
                <h2 className="section-title mb-4 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs font-medium text-accent">
                    B
                  </span>
                  Properties you&apos;re buying
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {buyingProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </section>
            )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
