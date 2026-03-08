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
  reason?: ProblemReason;
  postcode?: string;
  propertyType?: string;
  createdAt: string;
}

const projects: Project[] = [];

export function getAllProjects(): Project[] {
  return [...projects];
}

export function addProject(input: {
  name: string;
  reason?: ProblemReason;
  postcode?: string;
  propertyType?: string;
}): Project {
  const project: Project = {
    id: `proj-${Date.now()}`,
    name: input.name.trim() || "My move",
    reason: input.reason,
    postcode: input.postcode,
    propertyType: input.propertyType,
    createdAt: new Date().toISOString(),
  };
  projects.push(project);
  return project;
}
