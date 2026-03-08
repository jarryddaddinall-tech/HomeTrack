import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroVisual } from "@/components/hero-visual";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header variant="marketing" />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-4 pt-24 pb-16 sm:pt-32 sm:pb-24 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl lg:leading-tight" style={{ color: "var(--color-primary-dark)" }}>
            Moving home is a{" "}
            <span className="relative inline-block">
              big deal
              <span className="absolute bottom-1 left-0 right-0 h-2 bg-accent-300/60 rounded-full -z-10" aria-hidden />
            </span>
            .
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl opacity-90" style={{ color: "var(--color-primary-dark)" }}>
            HomeClear helps you stay on top of your sale and purchase—so you spend less time chasing and more time planning.
          </p>
          <p className="mt-2 text-sm opacity-75" style={{ color: "var(--color-primary-dark)" }}>
            Free to try · No jargon, no chasing
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-4">
            <Link href="/start" className="btn-landing-primary w-full sm:w-auto">
              Get started
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium opacity-80 transition-colors hover:opacity-100"
              style={{ color: "var(--color-primary-dark)" }}
            >
              Log in
            </Link>
          </div>
        </section>

        {/* How it works / Features */}
        <section id="how-it-works" className="scroll-mt-20">
          <HeroVisual />
        </section>
      </main>

      <Footer />
    </div>
  );
}
