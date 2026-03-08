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

  return (
    <header className="border-b border-white/40 bg-white/90 shadow-soft-sm backdrop-blur-md">
      <div className={`mx-auto flex ${maxWidth} items-center justify-between px-4 py-4`}>
        <div className="flex items-center gap-4">
          {variant === "marketing" ? (
            <Link href="/" className="text-xl font-semibold text-slate-900 transition-colors hover:text-accent">
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

        <nav className="flex items-center gap-6">
          {variant === "marketing" && (
            <>
              <Link href="/login" className="text-slate-600 transition-colors hover:text-slate-900">
                Log in
              </Link>
              <Link href="/signup" className="btn-nav bg-accent">
                Sign up
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
