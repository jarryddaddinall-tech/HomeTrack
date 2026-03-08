import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserMenu } from "@/components/user-menu";

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const user = cookieStore.get("mock-auth")?.value ?? null;

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="border-b border-slate-100 bg-white/80 shadow-soft-sm backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <Link href="/dashboard" className="text-xl font-semibold text-slate-900">
            HomeClear
          </Link>
          <UserMenu user={user} />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="page-title">Settings</h1>
        <p className="mt-2 text-slate-600">
          Account settings coming soon.
        </p>
        <Link href="/dashboard" className="back-link mt-6 inline-flex">
          Back to dashboard
        </Link>
      </main>
    </div>
  );
}
