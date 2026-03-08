import Link from "next/link";

/**
 * Hero features: benefit callouts for unlogged-in homepage.
 * Polished card layout with one accent card and light feature cards.
 */
export function HeroVisual() {
  const features = [
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: "Track every stage",
      description: "Offer accepted, surveys, mortgage, contracts—see exactly where you are.",
      done: true,
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Key dates in one place",
      description: "No more chasing solicitors. Target completion and milestones at a glance.",
      done: true,
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Your team at a glance",
      description: "Solicitor, agent, and contacts—all in one place when you need them.",
      done: true,
    },
  ];

  return (
    <section id="features" className="mx-auto max-w-6xl px-4 pb-24 pt-4 sm:pb-32">
      <h2 className="font-display text-center text-xl font-semibold sm:text-2xl" style={{ color: "var(--color-primary-dark)" }}>
        Built for how you actually move
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-[15px] opacity-90" style={{ color: "var(--color-primary-dark)" }}>
        HomeClear brings your sale and purchase together—so you stay in control.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
        {/* Accent card: left column, spans 2 rows on md+ */}
        <div
          className="rounded-2xl p-6 text-white shadow-[var(--shadow-card-polished)] md:row-span-2 md:min-h-0"
          style={{ backgroundColor: "var(--color-primary-mid)" }}
        >
          <div className="text-xs font-medium uppercase tracking-wider opacity-90">Your move</div>
          <h3 className="mt-1 font-semibold text-lg">All in one place</h3>
          <p className="mt-2 text-sm opacity-90">
            Sale and purchase, key dates, and your contacts—no more scattered spreadsheets or missed deadlines.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300" aria-hidden />
            <span className="opacity-90">Ready when you are</span>
          </div>
        </div>

        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border bg-white/95 p-6 shadow-[var(--shadow-card-polished)] transition-shadow hover:shadow-[var(--shadow-card-lift)]"
            style={{ borderColor: "var(--color-border-subtle)" }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent">
              {feature.icon}
            </div>
            <h3 className="mt-4 font-semibold" style={{ color: "var(--color-primary-dark)" }}>
              {feature.title}
            </h3>
            <p className="mt-2 text-sm opacity-85" style={{ color: "var(--color-primary-dark)" }}>
              {feature.description}
            </p>
            {feature.done && (
              <div className="mt-4 flex items-center gap-2 text-sm text-accent-600">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Included</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-12 text-center">
        <Link
          href="/start"
          className="text-sm font-medium opacity-90 transition-opacity hover:opacity-100"
          style={{ color: "var(--color-primary-mid)" }}
        >
          Get started →
        </Link>
      </p>

      {/* Trusted by */}
      <div className="mt-24 border-t pt-16" style={{ borderColor: "var(--color-border-subtle)" }}>
        <h3 className="text-center text-sm font-semibold uppercase tracking-wider opacity-70" style={{ color: "var(--color-primary-dark)" }}>
          Trusted by people moving home
        </h3>
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {["Sellers", "First-time buyers", "Chain movers", "Renters buying"].map((label) => (
            <span
              key={label}
              className="text-sm font-medium opacity-60"
              style={{ color: "var(--color-primary-dark)" }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
