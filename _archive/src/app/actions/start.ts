"use server";

import { mockValuationRange } from "@/lib/mock-pricing";
import { addProject, type ProblemReason } from "@/lib/projects";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function getValuation(postcode: string): Promise<{ min: number; max: number } | null> {
  const trimmed = postcode?.trim();
  if (!trimmed || trimmed.length < 4) return null;
  return mockValuationRange(trimmed);
}

export async function createProjectFromStart(formData: FormData) {
  const reason = (formData.get("reason") as ProblemReason) || undefined;
  const postcode = (formData.get("postcode") as string)?.trim() || undefined;
  const propertyType = (formData.get("propertyType") as string)?.trim() || undefined;
  const name = (formData.get("name") as string)?.trim() || "My move";

  const cookieStore = await cookies();
  const user = cookieStore.get("mock-auth")?.value ?? null;

  if (user) {
    const project = addProject({ name, reason, postcode, propertyType });
    revalidatePath("/dashboard");
    redirect(`/dashboard/project/${project.id}`);
  }

  // Not logged in: redirect to signup with params so we can create project after
  const params = new URLSearchParams();
  if (reason) params.set("reason", reason);
  if (postcode) params.set("postcode", postcode);
  if (propertyType) params.set("propertyType", propertyType);
  if (name && name !== "My move") params.set("name", name);
  params.set("from", "start");
  redirect(`/signup?${params.toString()}`);
}
