import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroVisual } from "@/components/hero-visual";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="marketing" />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-28 sm:py-32">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Moving home is a big deal.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600 sm:text-xl">
              We&apos;re here to make it feel less chaotic. One place for your sale, your purchase, and your peace of mind.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Free to try · No jargon, no chasing
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-4">
              <Link
                href="/start"
                className="btn-primary-lg w-full bg-accent sm:w-auto"
              >
                Thinking about moving? Start here
              </Link>
              <Link
                href="/login"
                className="text-slate-600 underline-offset-4 transition-colors hover:text-slate-900 hover:underline sm:ml-0"
              >
                Log in
              </Link>
            </div>
          </div>
          <HeroVisual />
        </div>
      </main>

      <Footer />
    </div>
  );
}
