"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addProject, type ProblemReason } from "@/lib/projects";

export async function createProject(formData: FormData) {
  const name = (formData.get("name") as string)?.trim() || "My move";
  const reason = (formData.get("reason") as ProblemReason) || undefined;
  const postcode = (formData.get("postcode") as string)?.trim() || undefined;
  const propertyType = (formData.get("propertyType") as string)?.trim() || undefined;
  const project = addProject({ name, reason, postcode, propertyType });
  revalidatePath("/dashboard");
  redirect(`/dashboard/project/${project.id}`);
}
