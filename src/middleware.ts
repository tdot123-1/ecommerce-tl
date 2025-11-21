// import NextAuth from "next-auth";
// import { authConfig } from "./auth.config";

// export default NextAuth(authConfig).auth;

// export const config = {
//   matcher: ["/dashboard"],
// };


// paused the project
export function middleware() {
  return new Response("This project is temporarily inactive.", { status: 403 });
}

export const config = {
  matcher: "/:path*", 
};
