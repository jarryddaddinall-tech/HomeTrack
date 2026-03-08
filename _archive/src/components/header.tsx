import Link from "next/link";
import { UserMenu } from "@/components/user-menu";

type HeaderVariant = "marketing" | "auth-login" | "auth-signup" | "dashboard" | "property";

interface HeaderProps {
  variant: HeaderVariant;
  user?: string | null;
}

const Logo = ({ href }: { href: string }) => (
  <Link href={href} className="text-xl font-semibold text-slate-900 transition-colors hover:text-accent">
    HomeClear
  </Link>
);

export function Header({ variant, user }: HeaderProps) {
  const maxWidth = variant === "property" ? "max-w-4xl" : "max-w-6xl";

  const isMarketing = variant === "marketing";
  const isDashboard = variant === "dashboard" || variant === "property";
  /* Same structure as marketing: subtle border, backdrop blur; dashboard uses white to match logged-in pages */
  const headerBg = isMarketing
    ? "border-b border-black/5 bg-[var(--color-surface-warm)]/95 backdrop-blur-md"
    : isDashboard
      ? "border-b border-black/5 bg-white/95 backdrop-blur-md"
      : "border-b border-white/40 bg-white/90 shadow-soft-sm backdrop-blur-md";

  return (
    <header className={headerBg}>
      <div className={`mx-auto ${maxWidth} grid items-center px-4 py-4 ${isMarketing ? "grid-cols-[1fr_auto_1fr] gap-4" : "flex justify-between"}`}>
        <div className="flex items-center gap-4 min-w-0">
          {isMarketing ? (
            <Link href="/" className="text-xl font-semibold transition-colors hover:opacity-80" style={{ color: "var(--color-primary-dark)" }}>
              HomeClear
            </Link>
          ) : (
            <>
              {variant === "property" && (
                <Link
                  href="/dashboard"
                  className="back-link"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to dashboard
                </Link>
              )}
              <Logo
                href={variant === "dashboard" || variant === "property" ? "/dashboard" : "/"}
              />
            </>
          )}
        </div>

        {isMarketing && (
          <nav className="hidden sm:flex items-center justify-center gap-8 text-sm font-medium" style={{ color: "var(--color-primary-dark)" }}>
            <Link href="/#how-it-works" className="transition-colors hover:opacity-70">How it works</Link>
            <Link href="/#features" className="transition-colors hover:opacity-70">Features</Link>
            <Link href="/start" className="transition-colors hover:opacity-70">Start</Link>
          </nav>
        )}

        <nav className={`flex items-center justify-end gap-3 ${isMarketing ? "" : "flex-1"}`}>
          {isMarketing && (
            <>
              <Link href="/login" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: "var(--color-primary-dark)" }}>
                Log in
              </Link>
              <Link href="/start" className="btn-landing-nav">
                Get started
              </Link>
            </>
          )}
          {variant === "auth-login" && (
            <Link href="/signup" className="btn-nav bg-accent">
              Sign up
            </Link>
          )}
          {variant === "auth-signup" && (
            <Link href="/login" className="text-slate-600 transition-colors hover:text-slate-900">
              Log in
            </Link>
          )}
          {(variant === "dashboard" || variant === "property") && user && (
            <UserMenu user={user} />
          )}
        </nav>
      </div>
    </header>
  );
}
