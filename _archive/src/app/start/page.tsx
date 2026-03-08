import Link from "next/link";
import { cookies } from "next/headers";
import { Header } from "@/components/header";
import { StartHereForm } from "@/components/start-here-form";

export default async function StartPage() {
  const cookieStore = await cookies();
  const user = cookieStore.get("mock-auth")?.value ?? null;

  return (
    <div className="min-h-screen">
      <Header variant="marketing" />

      <main className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Thinking about moving?
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Start here. Tell us a bit about your situation and we&apos;ll help you understand what&apos;s possible—no signup required.
          </p>
        </div>

        <div className="mt-10">
          <StartHereForm isLoggedIn={!!user} />
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Free to try · No jargon, no chasing
        </p>
      </main>
    </div>
  );
}
