import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const appURL = process.env.APP_URL;
  const locale = request.cookies.get("NEXT_LOCALE")?.value ?? "fa";

  if (!request.nextUrl.pathname.includes(locale)) {
    return NextResponse.redirect(new URL(`/${locale}`, appURL));
  }

  return NextResponse.next();
}

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", `/(fa)/:path*`],
};
