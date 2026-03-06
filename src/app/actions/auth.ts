"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const MOCK_AUTH_COOKIE = "mock-auth";

export async function mockLogin(formData: FormData) {
  const email = formData.get("email") as string;
  cookies().set(MOCK_AUTH_COOKIE, email || "demo@homeclear.app", {
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
  cookies().set(MOCK_AUTH_COOKIE, email || "demo@homeclear.app", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
  redirect("/dashboard");
}

export async function mockLogout() {
  cookies().delete(MOCK_AUTH_COOKIE);
  redirect("/");
}

export async function mockDemoLogin() {
  cookies().set(MOCK_AUTH_COOKIE, "demo@homeclear.app", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  redirect("/dashboard");
}
