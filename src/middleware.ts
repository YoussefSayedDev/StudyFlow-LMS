import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { verifyToken } from "./lib/auth/token-verification";

const intlMiddleware = createMiddleware({
  ...routing,
  defaultLocale: "en",
  localePrefix: "always",
});

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const pathname = req.nextUrl.pathname;

  // First, check if the path is missing a locale prefix
  // If it's the root path or doesn't start with a locale, let intlMiddleware handle it first
  if (pathname === "/" || !pathname.match(/^\/(en|ar)\//)) {
    // For root paths, let intlMiddleware handle the locale redirect
    return intlMiddleware(req);
  }

  // Define public routes that don't require authentication
  const publicRoutes = [
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
  ];

  // Check if the current path is a public route (considering locale prefixes)
  const isPublicRoute = publicRoutes.some(
    (route) => pathname.endsWith(route) || pathname.includes(`${route}/`),
  );

  // Properly verify the token if it exists
  const isValidToken = token ? await verifyToken(token) : false;

  // Handle authentication logic
  if (!isValidToken && !isPublicRoute) {
    // User is not authenticated and trying to access a protected route
    // Redirect to sign-in page while preserving the locale
    const locale = pathname.split("/")[1]; // Extract locale from URL
    const signInUrl = new URL(`/${locale}/sign-in`, req.url);

    // Add return URL as a query parameter for redirect after login
    signInUrl.searchParams.set("returnUrl", pathname);

    return NextResponse.redirect(signInUrl);
  }

  // For all other cases, apply the internationalization middleware
  return intlMiddleware(req);
}

export const config = {
  // Match all public pages except API routes and static files
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
