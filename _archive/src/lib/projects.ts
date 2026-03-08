/**
 * Project = "I want to move house" - the top-level container.
 * Everything starts with a Problem (reason) which becomes a Project.
 * Each project has: property to sell (current home) + property to buy (ideal home).
 */

export type ProblemReason =
  | "too_small"
  | "too_far"
  | "too_old"
  | "need_garden"
  | "need_schools"
  | "near_family"
  | "downsize"
  | "other";

export const PROBLEM_REASON_LABELS: Record<ProblemReason, string> = {
  too_small: "House too small",
  too_far: "Too far from work",
  too_old: "House too old / repairs",
  need_garden: "Need a garden",
  need_schools: "Better schools",
  near_family: "Near family",
  downsize: "Downsizing",
  other: "Other",
};

export interface Project {
  id: string;
  name: string;
  /** Problem: why they want to move (Stage 1) */
  reason?: ProblemReason;
  /** Initial postcode for valuation (selling) or search (buying) */
  postcode?: string;
  /** Property type: house, flat, etc. */
  propertyType?: string;
  sellingPropertyId?: string;
  buyingPropertyId?: string;
  createdAt: string; // ISO date
}

let projectsStore: Project[] = [
  {
    id: "proj-1",
    name: "Move to a bigger house",
    reason: "too_small",
    sellingPropertyId: "prop-1",
    buyingPropertyId: "prop-2",
    createdAt: new Date().toISOString(),
  },
];

export function getAllProjects(): Project[] {
  return [...projectsStore];
}

export function getProjectById(id: string): Project | undefined {
  return projectsStore.find((p) => p.id === id);
}

export interface AddProjectInput {
  name: string;
  reason?: ProblemReason;
  postcode?: string;
  propertyType?: string;
}

export function addProject(input: string | AddProjectInput): Project {
  const { name, reason, postcode, propertyType } =
    typeof input === "string" ? { name: input, reason: undefined, postcode: undefined, propertyType: undefined } : input;
  const id = `proj-${Date.now()}`;
  const project: Project = {
    id,
    name: name.trim() || "My move",
    reason,
    postcode,
    propertyType,
    createdAt: new Date().toISOString(),
  };
  projectsStore.push(project);
  return project;
}

export function updateProject(id: string, updates: Partial<Project>): Project | undefined {
  const index = projectsStore.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  projectsStore[index] = { ...projectsStore[index], ...updates };
  return projectsStore[index];
}

export function deleteProject(id: string): boolean {
  const index = projectsStore.findIndex((p) => p.id === id);
  if (index === -1) return false;
  projectsStore.splice(index, 1);
  return true;
}

export function linkPropertyToProject(projectId: string, propertyId: string, type: "selling" | "buying"): Project | undefined {
  const project = getProjectById(projectId);
  if (!project) return undefined;
  if (type === "selling") {
    return updateProject(projectId, { sellingPropertyId: propertyId });
  }
  return updateProject(projectId, { buyingPropertyId: propertyId });
}
