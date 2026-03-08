/**
 * Moving essentials = Stage 3 sub-elements (project-level).
 * Removals, utilities, packing, change of address.
 */

export type MovingTaskStatus = "todo" | "in_progress" | "done";

export interface MovingTask {
  id: string;
  label: string;
  status: MovingTaskStatus;
}

export interface MovingEssentials {
  projectId: string;
  removals: {
    status: MovingTaskStatus;
    notes?: string;
  };
  removalsTasks: MovingTask[];
  utilitiesTasks: MovingTask[];
  packingTasks: MovingTask[];
  changeOfAddressTasks: MovingTask[];
}

const DEFAULT_REMOVALS_TASKS: Omit<MovingTask, "id">[] = [
  { label: "Get removals quotes", status: "todo" },
  { label: "Book removals company", status: "todo" },
  { label: "Confirm date and time", status: "todo" },
];

const DEFAULT_UTILITIES_TASKS: Omit<MovingTask, "id">[] = [
  { label: "Notify current gas & electric", status: "todo" },
  { label: "Set up gas & electric at new property", status: "todo" },
  { label: "Switch broadband", status: "todo" },
];

const DEFAULT_PACKING_TASKS: Omit<MovingTask, "id">[] = [
  { label: "Pack non-essentials", status: "todo" },
  { label: "Pack kitchen", status: "todo" },
  { label: "Pack bedrooms", status: "todo" },
  { label: "Pack living areas", status: "todo" },
  { label: "Label boxes by room", status: "todo" },
];

const DEFAULT_CHANGE_OF_ADDRESS_TASKS: Omit<MovingTask, "id">[] = [
  { label: "Redirect mail (Royal Mail)", status: "todo" },
  { label: "Update bank & credit cards", status: "todo" },
  { label: "Update driving licence", status: "todo" },
  { label: "Update insurance", status: "todo" },
  { label: "Notify employer & HMRC", status: "todo" },
];

function createTask(t: Omit<MovingTask, "id">, id: string): MovingTask {
  return { ...t, id };
}

const essentialsStore = new Map<string, MovingEssentials>();

function getOrCreate(projectId: string): MovingEssentials {
  let essentials = essentialsStore.get(projectId);
  if (!essentials) {
    essentials = {
      projectId,
      removals: { status: "todo" },
      removalsTasks: DEFAULT_REMOVALS_TASKS.map((t, i) => createTask(t, `rem-${i}`)),
      utilitiesTasks: DEFAULT_UTILITIES_TASKS.map((t, i) => createTask(t, `util-${i}`)),
      packingTasks: DEFAULT_PACKING_TASKS.map((t, i) => createTask(t, `pack-${i}`)),
      changeOfAddressTasks: DEFAULT_CHANGE_OF_ADDRESS_TASKS.map((t, i) => createTask(t, `addr-${i}`)),
    };
    essentialsStore.set(projectId, essentials);
  }
  return essentials;
}

export function getMovingEssentials(projectId: string): MovingEssentials {
  return getOrCreate(projectId);
}

export function updateRemovalsStatus(projectId: string, status: MovingTaskStatus, notes?: string): MovingEssentials | undefined {
  const essentials = getOrCreate(projectId);
  essentials.removals = { status, notes };
  return essentials;
}

export function updateTaskStatus(
  projectId: string,
  category: "removalsTasks" | "utilitiesTasks" | "packingTasks" | "changeOfAddressTasks",
  taskId: string,
  status: MovingTaskStatus
): MovingTask | undefined {
  const essentials = getOrCreate(projectId);
  const tasks = essentials[category];
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return undefined;
  task.status = status;
  return task;
}
