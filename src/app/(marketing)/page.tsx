import Link from "next/link";
import { Header } from "@/components/header";
import { HeroVisual } from "@/components/hero-visual";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header variant="marketing" />

      <main className="mx-auto max-w-6xl px-4 py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Know exactly where your sale or purchase stands
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Track offers, surveys, contracts and completion in one place—without chasing solicitors.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Free to try · No credit card required
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="w-full rounded-lg bg-slate-900 px-6 py-3 text-base font-medium text-white shadow-sm transition-all duration-200 hover:bg-slate-800 hover:shadow-md sm:w-auto"
            >
              Get started free
            </Link>
            <Link
              href="/login"
              className="w-full rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto"
            >
              Log in
            </Link>
          </div>
        </div>
        <HeroVisual />
      </main>
    </div>
  );
}
