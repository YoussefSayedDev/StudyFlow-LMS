import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

// export const middleware = async (req: NextRequest) => {
//   const token = req.cookies.get("StudyFlowToken")?.value;

//   // Redirect to login page if trying to access a protected page

//   return NextResponse.next();
// }

export const config = {
  // Match all public pages except API routes and static files
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
