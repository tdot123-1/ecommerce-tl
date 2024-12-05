"use server";

import { cookies } from "next/headers";

const cookieStore = cookies();

export async function setCookie(customerId: string) {
  cookieStore.set({
    name: "user",
    value: customerId,
    path: "/",
    httpOnly: true,
    secure: true,
  });
}

export async function getCookie() {
  const userId = cookieStore.get("user");

  return userId?.value || null;
}

export async function deleteCookie() {
  cookieStore.delete("user");
}
