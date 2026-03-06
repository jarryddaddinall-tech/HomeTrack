import Link from "next/link";
import { mockLogout } from "@/app/actions/auth";

type HeaderVariant = "marketing" | "auth-login" | "auth-signup" | "dashboard" | "property";

interface HeaderProps {
  variant: HeaderVariant;
  user?: string | null;
}

const Logo = ({ href }: { href: string }) => (
  <Link href={href} className="text-xl font-semibold text-slate-800 transition-colors hover:text-slate-900">
    HomeClear
  </Link>
);

export function Header({ variant, user }: HeaderProps) {
  const maxWidth = variant === "property" ? "max-w-4xl" : "max-w-6xl";

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className={`mx-auto flex ${maxWidth} items-center justify-between px-4 py-4`}>
        <div className="flex items-center gap-4">
          {variant === "property" && (
            <Link
              href="/dashboard"
              className="text-slate-600 transition-colors hover:text-slate-900"
              aria-label="Back to dashboard"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          )}
          {variant === "marketing" ? (
            <span className="text-xl font-semibold text-slate-800">HomeClear</span>
          ) : (
            <Logo
              href={variant === "dashboard" || variant === "property" ? "/dashboard" : "/"}
            />
          )}
        </div>

        <nav className="flex items-center gap-6">
          {variant === "marketing" && (
            <>
              <Link href="/login" className="text-slate-600 transition-colors hover:text-slate-900">
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
              >
                Sign up
              </Link>
            </>
          )}
          {variant === "auth-login" && (
            <Link
              href="/signup"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              Sign up
            </Link>
          )}
          {variant === "auth-signup" && (
            <Link
              href="/login"
              className="text-slate-600 transition-colors hover:text-slate-900"
            >
              Log in
            </Link>
          )}
          {(variant === "dashboard" || variant === "property") && user && (
            <>
              <span className="text-sm text-slate-600">{user}</span>
              <form action={mockLogout}>
                <button
                  type="submit"
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Log out
                </button>
              </form>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
