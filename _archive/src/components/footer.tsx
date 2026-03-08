import Link from "next/link";

type FooterVariant = "marketing" | "dashboard";

/**
 * Production-style footer for marketing, auth, and dashboard pages.
 * Tagline, key links, and copyright. Use variant="dashboard" for logged-in (white background).
 */
export function Footer({ variant = "marketing" }: { variant?: FooterVariant }) {
  const year = new Date().getFullYear();
  const isDashboard = variant === "dashboard";

  const footerClassName = isDashboard
    ? "border-t border-slate-200/80 bg-white"
    : "border-t bg-[var(--color-surface-warm)]";
  const borderStyle = isDashboard ? undefined : { borderColor: "var(--color-border-subtle)" };
  const textColor = isDashboard ? "text-slate-900" : "";
  const linkStyle = isDashboard ? undefined : { color: "var(--color-primary-dark)" };
  const copyrightClassName = isDashboard
    ? "mt-8 border-t border-slate-200/80 pt-6 text-center text-xs text-slate-600 opacity-60 sm:text-left"
    : "mt-8 border-t pt-6 text-center text-xs opacity-60 sm:text-left";
  const copyrightStyle = isDashboard ? undefined : { borderColor: "var(--color-border-subtle)", color: "var(--color-primary-dark)" };

  return (
    <footer className={footerClassName} style={borderStyle}>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="text-center sm:text-left">
            <Link
              href={isDashboard ? "/dashboard" : "/"}
              className={`text-lg font-semibold transition-colors hover:opacity-80 ${textColor}`}
              style={linkStyle}
            >
              HomeClear
            </Link>
            <p className={`mt-2 max-w-xs text-sm opacity-70 ${textColor}`} style={linkStyle}>
              One place for your sale, your purchase, and your peace of mind.
            </p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link href="/" className="opacity-70 transition-colors hover:opacity-100" style={linkStyle}>
              Home
            </Link>
            <Link href="/login" className="opacity-70 transition-colors hover:opacity-100" style={linkStyle}>
              Log in
            </Link>
            <Link href="/signup" className="opacity-70 transition-colors hover:opacity-100" style={linkStyle}>
              Sign up
            </Link>
            <Link href="/start" className="opacity-70 transition-colors hover:opacity-100" style={linkStyle}>
              Get started
            </Link>
            <a href="#" className="opacity-70 transition-colors hover:opacity-100" style={linkStyle}>
              Privacy
            </a>
            <a href="#" className="opacity-70 transition-colors hover:opacity-100" style={linkStyle}>
              Terms
            </a>
          </nav>
        </div>
        <p className={copyrightClassName} style={copyrightStyle}>
          © {year} HomeClear. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
