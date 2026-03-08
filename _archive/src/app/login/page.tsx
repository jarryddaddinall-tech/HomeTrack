import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AuthIllustration } from "@/components/auth-illustration";
import { SubmitButton } from "@/components/submit-button";
import { mockLogin, mockDemoLogin } from "../actions/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const showEmailError = error === "invalid_email";

  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="auth-login" />

      <main className="flex min-h-[calc(100vh-65px)] flex-1 flex-col">
        <section className="flex flex-1">
          <AuthIllustration />
          <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 lg:py-24">
            <div className="w-full max-w-md space-y-6">
              <div className="text-center lg:text-left">
                <h1 className="page-title text-2xl sm:text-3xl">Welcome back</h1>
                <p className="mt-2 text-slate-600">
                  HomeClear keeps your sale and purchase in one place. Sign in to see where your move stands and pick up where you left off.
                </p>
              </div>
              <div className="card-base p-8">
          {showEmailError && (
            <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-800" role="alert">
              Please enter a valid email address.
            </p>
          )}
          <form action={mockLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email
              </label>
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
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 shadow-soft-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
              />
            </div>
            <SubmitButton className="btn-primary w-full bg-accent disabled:opacity-70 disabled:cursor-not-allowed">
              Log in
            </SubmitButton>
          </form>
          <form action={mockDemoLogin} className="mt-4">
            <SubmitButton className="inline-flex w-full items-center justify-center rounded-xl border border-dashed border-slate-200 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-600 disabled:opacity-70">
              Demo: skip to dashboard
            </SubmitButton>
          </form>
          <p className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-accent hover:underline">
              Sign up
            </Link>
          </p>
              </div>
              <p className="text-center">
                <Link
                  href="/"
                  className="text-sm text-slate-600 transition-colors hover:text-slate-900"
                >
                  ← Back to home
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
