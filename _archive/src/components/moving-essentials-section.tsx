"use client";

import { updateMovingTaskAction } from "@/app/actions/moving-essentials";
import type { MovingEssentials, MovingTask, MovingTaskStatus } from "@/lib/moving-essentials";

const STATUS_OPTIONS: { value: MovingTaskStatus; label: string }[] = [
  { value: "todo", label: "To do" },
  { value: "in_progress", label: "In progress" },
  { value: "done", label: "Done" },
];

function TaskList({
  projectId,
  category,
  tasks,
  title,
}: {
  projectId: string;
  category: "removalsTasks" | "utilitiesTasks" | "packingTasks" | "changeOfAddressTasks";
  tasks: MovingTask[];
  title: string;
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-slate-700">{title}</h4>
      <ul className="mt-2 space-y-1">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center gap-2">
            <form
              action={async (fd) => {
                await updateMovingTaskAction(
                  projectId,
                  category,
                  task.id,
                  fd.get("status") as MovingTaskStatus
                );
              }}
              className="flex items-center gap-2"
            >
              <select
                name="status"
                defaultValue={task.status}
                onChange={(e) => e.currentTarget.form?.requestSubmit()}
                className={`rounded border px-2 py-1 text-xs ${
                  task.status === "done"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : task.status === "in_progress"
                      ? "border-amber-200 bg-amber-50 text-amber-800"
                      : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <span
                className={
                  task.status === "done" ? "text-slate-600 line-through" : "text-slate-800"
                }
              >
                {task.label}
              </span>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MovingEssentialsSection({
  projectId,
  essentials,
}: {
  projectId: string;
  essentials: MovingEssentials;
}) {
  return (
    <div className="card-base p-6">
      <h2 className="section-title mb-1 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-medium text-slate-600">
          M
        </span>
        Moving essentials
      </h2>
      <p className="mb-6 text-sm text-slate-600">
        Get ready for moving day. Tick off tasks as you go.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-4">
          <TaskList
            projectId={projectId}
            category="removalsTasks"
            tasks={essentials.removalsTasks}
            title="Removals"
          />
        </div>
        <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-4">
          <TaskList
            projectId={projectId}
            category="utilitiesTasks"
            tasks={essentials.utilitiesTasks}
            title="Utilities"
          />
        </div>
        <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-4">
          <TaskList
            projectId={projectId}
            category="packingTasks"
            tasks={essentials.packingTasks}
            title="Packing"
          />
        </div>
        <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-4">
          <TaskList
            projectId={projectId}
            category="changeOfAddressTasks"
            tasks={essentials.changeOfAddressTasks}
            title="Change of address"
          />
        </div>
      </div>
    </div>
  );
}
