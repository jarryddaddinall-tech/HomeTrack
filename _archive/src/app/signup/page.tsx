import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AuthIllustration } from "@/components/auth-illustration";
import { SubmitButton } from "@/components/submit-button";
import { mockSignup, mockDemoLogin } from "../actions/auth";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; reason?: string; postcode?: string; propertyType?: string; name?: string; error?: string }>;
}) {
  const params = await searchParams;
  const fromStart = params.from === "start";
  const showEmailError = params.error === "invalid_email";

  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="auth-signup" />

      <main className="flex min-h-[calc(100vh-65px)] flex-1 flex-col">
        <section className="flex flex-1">
          <AuthIllustration />
          <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 lg:py-24">
            <div className="card-base w-full max-w-md p-8">
          <h1 className="page-title">Create your account</h1>
          <p className="mt-2 text-slate-600">
            {fromStart ? "Create your account to save your move and get started." : "Get started in seconds—we&apos;ll keep it simple."}
          </p>
          {showEmailError && (
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-800" role="alert">
              Please enter a valid email address.
            </p>
          )}
          <form action={mockSignup} className="mt-6 space-y-4">
            {fromStart && (
              <>
                <input type="hidden" name="from" value="start" />
                {params.reason && <input type="hidden" name="reason" value={params.reason} />}
                {params.postcode && <input type="hidden" name="postcode" value={params.postcode} />}
                {params.propertyType && <input type="hidden" name="propertyType" value={params.propertyType} />}
                {params.name && <input type="hidden" name="projectName" value={params.name} />}
              </>
            )}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
              />
            </div>
            <SubmitButton className="btn-primary w-full bg-accent disabled:opacity-70 disabled:cursor-not-allowed">
              Create account
            </SubmitButton>
          </form>
          <form action={mockDemoLogin} className="mt-4">
            <SubmitButton className="inline-flex w-full items-center justify-center rounded-xl border border-dashed border-slate-200 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-600 disabled:opacity-70">
              Demo: skip to dashboard
            </SubmitButton>
          </form>
          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-accent hover:underline">
              Log in
            </Link>
          </p>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
