"use server";

import { cookies } from "next/headers";

export async function setCookie(customerId: string) {
  const cookieStore = cookies();

  cookieStore.set({
    name: "user",
    value: customerId,
    path: "/",
    httpOnly: true,
    // secure: true,
  });
}

export async function getCookie() {
  const cookieStore = cookies();

  const userId = cookieStore.get("user");

  return userId?.value || null;
}
