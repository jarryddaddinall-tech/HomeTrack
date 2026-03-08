import Link from "next/link";

/**
 * Hero features: benefit callouts for unlogged-in homepage.
 * Proper SaaS marketing section—no dashboard CTA.
 */
export function HeroVisual() {
  const features = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: "Track every stage",
      description: "Offer accepted, surveys, mortgage, contracts—see exactly where you are.",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Key dates in one place",
      description: "No more chasing solicitors. Target completion and milestones at a glance.",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Your team at a glance",
      description: "Solicitor, agent, and contacts—all in one place when you need them.",
    },
  ];

  return (
    <section className="mx-auto mt-28 max-w-4xl">
      <h2 className="font-display text-center text-xl font-semibold text-slate-900 sm:text-2xl">
        Built for how you actually move
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
        HomeClear brings your sale and purchase together—so you stay in control.
      </p>
      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="card-base card-hover p-6"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent">
              {feature.icon}
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">{feature.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-center">
        <Link
          href="/start"
          className="text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          Get started →
        </Link>
      </p>
    </section>
  );
}
