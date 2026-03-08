import Link from "next/link";

/**
 * Production-style footer for marketing and auth pages.
 * Tagline, key links, and copyright.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/40 bg-white/70 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="text-center sm:text-left">
            <Link
              href="/"
              className="text-lg font-semibold text-[#333333] transition-colors hover:text-accent"
            >
              HomeClear
            </Link>
            <p className="mt-2 max-w-xs text-sm text-[#888888]">
              One place for your sale, your purchase, and your peace of mind.
            </p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link
              href="/"
              className="text-[#888888] transition-colors hover:text-[#333333]"
            >
              Home
            </Link>
            <Link
              href="/login"
              className="text-[#888888] transition-colors hover:text-[#333333]"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-[#888888] transition-colors hover:text-[#333333]"
            >
              Sign up
            </Link>
            <Link
              href="/start"
              className="text-[#888888] transition-colors hover:text-[#333333]"
            >
              Get started
            </Link>
            <a
              href="#"
              className="text-[#888888] transition-colors hover:text-[#333333]"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-[#888888] transition-colors hover:text-[#333333]"
            >
              Terms
            </a>
          </nav>
        </div>
        <p className="mt-8 border-t border-slate-200/60 pt-6 text-center text-xs text-[#888888] sm:text-left">
          © {year} HomeClear. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
