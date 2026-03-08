"use server";

import { revalidatePath } from "next/cache";
import {
  updateRemovalsStatus,
  updateTaskStatus,
  type MovingTaskStatus,
} from "@/lib/moving-essentials";

export async function updateRemovalsAction(
  projectId: string,
  formData: FormData
) {
  const status = (formData.get("status") as MovingTaskStatus) || "todo";
  const notes = (formData.get("notes") as string)?.trim() || undefined;
  updateRemovalsStatus(projectId, status, notes);
  revalidatePath(`/dashboard/project/${projectId}`);
}

export async function updateMovingTaskAction(
  projectId: string,
  category: "removalsTasks" | "utilitiesTasks" | "packingTasks" | "changeOfAddressTasks",
  taskId: string,
  status: MovingTaskStatus
) {
  updateTaskStatus(projectId, category, taskId, status);
  revalidatePath(`/dashboard/project/${projectId}`);
}
