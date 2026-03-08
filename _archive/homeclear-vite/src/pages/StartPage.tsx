import { useState } from "react";
import { addProject } from "../lib/projects";
import { mockParsePromptAndGetProperty, type PropertyDetails } from "../lib/mockProperty";
import type { Project } from "../lib/projects";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(price);
}

interface StartPageProps {
  onProjectCreated: (project: Project) => void;
}

const MOCK_AGENTS = [
  { name: "Sarah Mitchell", company: "Stonegate York", area: "York & surrounding", tag: "Highly rated for sales" },
  { name: "James Chen", company: "Purplebricks", area: "York", tag: "Fixed fee option" },
  { name: "Emma Walsh", company: "Connells", area: "North Yorkshire", tag: "Local expert" },
];

const MOCK_SOLICITORS = [
  { name: "Harrison Clark", price: "From £1,100", why: "They handle the legal side of your sale — contracts, searches, and transfer — so nothing gets missed." },
  { name: "Taylor Rose", price: "From £950", why: "Fixed-fee conveyancing. You’ll know the cost upfront and they keep you updated at every step." },
  { name: "Countrywide Conveyancing", price: "From £1,250", why: "End-to-end support for both sale and purchase if you’re buying your next home too." },
];

export function StartPage({ onProjectCreated }: StartPageProps) {
  const [userName, setUserName] = useState("Jarryd");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGo() {
    const trimmed = prompt.trim();
    if (!trimmed) {
      setError("Type what you want to do and include your address or postcode.");
      return;
    }
    setError(null);
    setProperty(null);
    setIsLoading(true);
    // Mock AI delay
    await new Promise((r) => setTimeout(r, 800));
    const result = mockParsePromptAndGetProperty(trimmed);
    setIsLoading(false);
    if (result) {
      setProperty(result);
    } else {
      setError("Couldn’t read an address from that. Try including a postcode, e.g. YO30 6QN");
    }
  }

  function handleStartMyMove() {
    if (!property) return;
    const project = addProject({
      name: "My move",
      postcode: property.postcode !== "—" ? property.postcode : undefined,
    });
    onProjectCreated(project);
  }

  return (
    <div className="min-h-screen bg-foliage">
      <header className="border-b border-white/50 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <span className="text-xl font-semibold tracking-tight text-gray-900">HomeClear</span>
          <label className="flex items-center gap-2 text-sm text-gray-500">
            Your name
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Jarryd"
              className="w-28 rounded-lg border border-gray-200 px-2 py-1.5 text-gray-900 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
            />
          </label>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What do you want to do?
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Describe it in your own words. Include your address or postcode and we’ll look up your property.
          </p>
        </div>

        <div className="mt-10">
          <div className="card-base p-6 shadow-lg">
            <label htmlFor="prompt" className="sr-only">
              Your message
            </label>
            <textarea
              id="prompt"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. My house is too small, I want to sell it. 10 Granary Walk, YO30 6QN"
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20"
              disabled={isLoading}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            <button
              type="button"
              onClick={handleGo}
              disabled={isLoading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-semibold text-white shadow-md transition hover:bg-accent-600 disabled:opacity-70 sm:w-auto sm:min-w-[140px]"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Looking up…
                </>
              ) : (
                "Go"
              )}
            </button>
          </div>
        </div>

        {property && (
          <div className="mt-10 opacity-0 animate-[fadeIn_0.35s_ease-out_forwards]">
            <PropertyCard
              details={property}
              userName={userName}
              agents={MOCK_AGENTS}
              solicitors={MOCK_SOLICITORS}
              onStartMyMove={handleStartMyMove}
            />
          </div>
        )}

        <p className="mt-12 text-center text-sm text-gray-500">
          Free to try · No signup required
        </p>
      </main>
    </div>
  );
}

function PropertyCard({
  details,
  userName,
  agents,
  solicitors,
  onStartMyMove,
}: {
  details: PropertyDetails;
  userName: string;
  agents: typeof MOCK_AGENTS;
  solicitors: typeof MOCK_SOLICITORS;
  onStartMyMove: () => void;
}) {
  const displayName = userName.trim() || "there";
  return (
    <div className="space-y-6">
      <div className="card-base overflow-hidden shadow-lg">
        <div className="border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white px-6 py-5">
          <h2 className="text-xl font-bold text-gray-900">
            Hey {displayName}, here&apos;s your house details — ready to find an agent?
          </h2>
          <p className="mt-2 text-lg font-semibold text-gray-900">{details.address}</p>
          <p className="text-gray-600">{details.postcode}</p>
          <p className="mt-2 text-lg font-semibold text-accent-700">
            {formatPrice(details.valuedPriceMin)} – {formatPrice(details.valuedPriceMax)}
          </p>
          <p className="text-sm text-gray-500">Estimated value range</p>
        </div>

        <div className="grid gap-0 sm:grid-cols-2">
          <DetailRow label="Last sold" value={formatPrice(details.lastSoldPrice)} sub={details.lastSoldDate} />
          <DetailRow label="Council tax" value={`Band ${details.councilTaxBand}`} sub={formatPrice(details.councilTaxAnnual) + "/year"} />
          <DetailRow label="Est. mortgage" value={formatPrice(details.estimatedMonthlyMortgage) + "/mo"} sub="Example at 5% over 25y (80% LTV)" />
          <DetailRow label="Stamp duty (if buying)" value={formatPrice(details.estimatedStampDuty)} sub="Based on current value" />
        </div>
      </div>

      <div className="card-base overflow-hidden shadow-lg">
        <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <h3 className="font-semibold text-gray-900">Recommended agents in the area</h3>
          <p className="mt-1 text-sm text-gray-500">Based on your property and location</p>
        </div>
        <ul className="divide-y divide-gray-100">
          {agents.map((agent) => (
            <li key={agent.name + agent.company} className="px-6 py-4">
              <p className="font-medium text-gray-900">{agent.name}</p>
              <p className="text-sm text-gray-600">{agent.company} · {agent.area}</p>
              <p className="mt-1 text-xs font-medium text-accent-600">{agent.tag}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="card-base overflow-hidden shadow-lg">
        <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <h3 className="font-semibold text-gray-900">Solicitors</h3>
          <p className="mt-1 text-sm text-gray-500">Why you need them: they handle the legal side of your sale or purchase so contracts, searches, and transfers are done properly.</p>
        </div>
        <ul className="divide-y divide-gray-100">
          {solicitors.map((sol) => (
            <li key={sol.name} className="px-6 py-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="font-medium text-gray-900">{sol.name}</p>
                <p className="text-sm font-semibold text-accent-700">{sol.price}</p>
              </div>
              <p className="mt-2 text-sm text-gray-600">{sol.why}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="card-base border-t border-gray-100 bg-gray-50/50 px-6 py-4 shadow-lg">
        <button
          type="button"
          onClick={onStartMyMove}
          className="w-full rounded-xl bg-accent px-6 py-3 font-semibold text-white shadow-md transition hover:bg-accent-600 sm:w-auto"
        >
          Start my move
        </button>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="border-b border-gray-100 px-6 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">{label}</p>
      <p className="mt-0.5 font-semibold text-gray-900">{value}</p>
      {sub && <p className="text-sm text-gray-500">{sub}</p>}
    </div>
  );
}
