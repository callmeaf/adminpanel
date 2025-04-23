"use server";

import { cookies } from "next/headers";

export const clearAuthCookies = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("laravel_session");
  cookieStore.delete("XSRF-TOKEN");
};

export const clearRevalidateCookie = async (revalidate: string) => {
  const coockieStore = await cookies();
  coockieStore.delete("revalidate");
};
