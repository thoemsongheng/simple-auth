import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./libs/session";

const publicRoutes = ["/login"];

export default async function middleware(req: NextRequest, res: NextResponse) {
  const path = req.nextUrl.pathname;

  const session = await getSession();
  // check if route is the protected one
  if (!publicRoutes.includes(path) && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (publicRoutes.includes(path) && session?.userId) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|.*\\..*).*)"],
};
