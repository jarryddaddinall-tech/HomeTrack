import Link from "next/link";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { getProjectById, PROBLEM_REASON_LABELS } from "@/lib/projects";
import { getPropertyById } from "@/lib/properties";
import { getShortlistByProject } from "@/lib/shortlist";
import { getMovingEssentials } from "@/lib/moving-essentials";
import { PropertyCard } from "@/components/property-card";
import { UserMenu } from "@/components/user-menu";
import { AIPropertySearch } from "@/components/ai-property-search";
import { ShortlistItem } from "@/components/shortlist-item";
import { MovingEssentialsSection } from "@/components/moving-essentials-section";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const user = cookieStore.get("mock-auth")?.value ?? null;

  if (!user) redirect("/login");

  const project = getProjectById(id);
  if (!project) notFound();

  const sellingProperty = project.sellingPropertyId ? getPropertyById(project.sellingPropertyId) : undefined;
  const shortlist = getShortlistByProject(id);
  const movingEssentials = getMovingEssentials(id);

  return (
    <div className="min-h-screen">
      <header className="border-b border-black/5 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link href="/dashboard" className="text-xl font-semibold text-slate-900">
            HomeClear
          </Link>
          <UserMenu user={user} />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <Link href="/dashboard" className="back-link mb-6">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to dashboard
        </Link>

        <h1 className="page-title">{project.name}</h1>
        {project.reason && (
          <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {PROBLEM_REASON_LABELS[project.reason]}
          </p>
        )}
        <p className="mt-2 text-slate-600">
          Add the home you&apos;re selling, then search for your ideal home. Shortlist from Rightmove, Zoopla & more.
        </p>

        <div className="mt-10 space-y-10">
          {/* Property to sell - postcode lookup */}
          <section className="card-base p-6">
            <h2 className="section-title mb-1 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-xs font-medium text-amber-700">
                S
              </span>
              Property you&apos;re selling
            </h2>
            <p className="mb-4 text-sm text-slate-600">
              Enter your postcode to find your home. We&apos;ll pull in the details like Zoopla.
            </p>

            {sellingProperty ? (
              <div className="mt-4">
                <PropertyCard property={sellingProperty} />
              </div>
            ) : (
              <Link
                href={`/dashboard/project/${project.id}/add-selling`}
                className="mt-4 flex items-center gap-3 rounded-xl border-2 border-dashed border-slate-200 p-6 transition-colors hover:border-amber-300 hover:bg-amber-50/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                  <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-slate-900">Add your home to sell</p>
                  <p className="text-sm text-slate-500">Postcode lookup • Full property details</p>
                </div>
                <svg className="ml-auto h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </section>

          {/* Property to buy - AI search + shortlist */}
          <section className="card-base p-6">
            <h2 className="section-title mb-1 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-medium text-emerald-700">
                B
              </span>
              Properties you want to buy
            </h2>
            <p className="mb-4 text-sm text-slate-600">
              Describe your ideal home. We&apos;ll search Rightmove, Zoopla & more. Shortlist the ones you like.
            </p>

            <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-4">
              <AIPropertySearch projectId={project.id} />
            </div>

            {shortlist.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 text-sm font-semibold text-slate-700">Your shortlist</h3>
                <ul className="space-y-2">
                  {shortlist.map((item) => (
                    <ShortlistItem key={item.id} item={item} projectId={project.id} />
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>

        {/* Stage 3: Moving essentials */}
        <section className="mt-10">
          <MovingEssentialsSection projectId={id} essentials={movingEssentials} />
        </section>

        {sellingProperty && (
          <Link
            href={`/dashboard/property/${sellingProperty.id}`}
            className="mt-10 block rounded-xl border border-accent/20 bg-accent/5 p-4 transition-colors hover:bg-accent/10"
          >
            <p className="text-sm font-medium text-accent-800">
              <strong>Next:</strong> View your sale progress, key dates, and documents on your property page →
            </p>
          </Link>
        )}
      </main>
    </div>
  );
}
