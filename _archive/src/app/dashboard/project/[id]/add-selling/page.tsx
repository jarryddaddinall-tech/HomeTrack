import Link from "next/link";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { getProjectById } from "@/lib/projects";
import { UserMenu } from "@/components/user-menu";
import { AddSellingForm } from "@/components/add-selling-form";

export default async function AddSellingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: projectId } = await params;
  const cookieStore = await cookies();
  const user = cookieStore.get("mock-auth")?.value ?? null;

  if (!user) redirect("/login");

  const project = getProjectById(projectId);
  if (!project) notFound();

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/40 bg-white/90 shadow-soft-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <Link href="/dashboard" className="text-xl font-semibold text-slate-900">
            HomeClear
          </Link>
          <UserMenu user={user} />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <Link href={`/dashboard/project/${projectId}`} className="back-link mb-6">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to {project.name}
        </Link>

        <h1 className="page-title">Add your home to sell</h1>
        <p className="mt-2 text-slate-600">
          Enter your postcode to find your property. We&apos;ll pull in the details like Zoopla.
        </p>

        <div className="card-base mt-8 p-6">
          <label className="block text-sm font-medium text-slate-700">Postcode</label>
          <AddSellingForm projectId={projectId} />
        </div>
      </main>
    </div>
  );
}
