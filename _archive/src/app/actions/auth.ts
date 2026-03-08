"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { addProject, type ProblemReason } from "@/lib/projects";

const MOCK_AUTH_COOKIE = "mock-auth";

export async function mockLogin(formData: FormData) {
  const email = formData.get("email") as string;
  (await cookies()).set(MOCK_AUTH_COOKIE, email || "demo@homeclear.app", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
  redirect("/dashboard");
}

export async function mockSignup(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  (await cookies()).set(MOCK_AUTH_COOKIE, email || "demo@homeclear.app", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  // If coming from /start, create project with problem data and redirect there
  const from = formData.get("from") as string | null;
  if (from === "start") {
    const reason = (formData.get("reason") as ProblemReason) || undefined;
    const postcode = (formData.get("postcode") as string)?.trim() || undefined;
    const propertyType = (formData.get("propertyType") as string)?.trim() || undefined;
    const projectName = (formData.get("projectName") as string)?.trim() || "My move";
    const project = addProject({ name: projectName, reason, postcode, propertyType });
    redirect(`/dashboard/project/${project.id}`);
  }

  redirect("/dashboard");
}

export async function mockLogout() {
  (await cookies()).delete(MOCK_AUTH_COOKIE);
  redirect("/");
}

export async function mockDemoLogin() {
  (await cookies()).set(MOCK_AUTH_COOKIE, "demo@homeclear.app", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  redirect("/dashboard");
}
