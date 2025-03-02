"use server";

import { cookies } from "next/headers";

export async function setAuthCookie(name: string, token: string) {
  cookies().set({
    name: name,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
    sameSite: "strict",
  });

  return { success: true };
}

export async function removeAuthCookie(name: string) {
  cookies().delete(name);
  return { success: true };
}
