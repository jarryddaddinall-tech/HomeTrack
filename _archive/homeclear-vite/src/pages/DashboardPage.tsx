import { getAllProjects } from "../lib/projects";

interface DashboardPageProps {
  onBackToStart: () => void;
}

export function DashboardPage({ onBackToStart }: DashboardPageProps) {
  const projects = getAllProjects();

  return (
    <div className="min-h-screen bg-foliage">
      <header className="border-b border-white/50 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <span className="text-xl font-semibold tracking-tight text-gray-900">HomeClear</span>
          <button
            type="button"
            onClick={onBackToStart}
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
          >
            New search
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Your moves</h1>
        <p className="mt-2 text-gray-600">
          Projects you&apos;ve started. Add your home to sell and your ideal home next.
        </p>

        {projects.length === 0 ? (
          <div className="card-base mt-10 p-12 text-center shadow-lg">
            <p className="text-gray-600">No projects yet.</p>
            <button
              type="button"
              onClick={onBackToStart}
              className="mt-4 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-accent-600"
            >
              Search a property
            </button>
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="card-base card-hover p-6 shadow-md">
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                {project.postcode && (
                  <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {project.postcode}
                  </p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  Created {new Date(project.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </p>
                <p className="mt-3 text-sm font-medium text-accent">View project →</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
