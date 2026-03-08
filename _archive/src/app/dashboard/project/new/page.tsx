import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createProject } from "@/app/actions/projects";
import { UserMenu } from "@/components/user-menu";
import { SubmitButton } from "@/components/submit-button";
import { PROBLEM_REASON_LABELS, type ProblemReason } from "@/lib/projects";

const REASONS: ProblemReason[] = [
  "too_small",
  "too_far",
  "too_old",
  "need_garden",
  "need_schools",
  "near_family",
  "downsize",
  "other",
];

export default async function NewProjectPage() {
  const cookieStore = await cookies();
  const user = cookieStore.get("mock-auth")?.value ?? null;

  if (!user) redirect("/login");

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

      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="page-title">I want to move house</h1>
        <p className="mt-2 text-slate-600">
          Start with why you&apos;re moving. We&apos;ll use this to personalise your experience.
        </p>

        <form action={createProject} className="mt-8">
          <div className="card-base space-y-6 p-6">
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-slate-700">
                Why are you thinking about moving?
              </label>
              <select
                id="reason"
                name="reason"
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
              >
                <option value="">Select a reason</option>
                {REASONS.map((r) => (
                  <option key={r} value={r}>
                    {PROBLEM_REASON_LABELS[r]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="postcode" className="block text-sm font-medium text-slate-700">
                Your postcode (optional — for valuation)
              </label>
              <input
                id="postcode"
                name="postcode"
                type="text"
                placeholder="e.g. SW4 2PQ"
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
              />
            </div>

            <div>
              <label htmlFor="propertyType" className="block text-sm font-medium text-slate-700">
                Property type (optional)
              </label>
              <select
                id="propertyType"
                name="propertyType"
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
              >
                <option value="">Select type</option>
                <option value="house">House</option>
                <option value="flat">Flat</option>
                <option value="bungalow">Bungalow</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Name your move
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Move to a bigger house, Downsize, Relocate for work"
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/dashboard" className="btn-secondary">
              Cancel
            </Link>
            <SubmitButton className="btn-primary bg-accent disabled:opacity-70">
              Start my move
            </SubmitButton>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Prefer to explore first?{" "}
          <Link href="/start" className="font-medium text-accent hover:underline">
            Start with a valuation and mortgage calculator
          </Link>
        </p>
      </main>
    </div>
  );
}
