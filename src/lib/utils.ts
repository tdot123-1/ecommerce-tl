import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// import { stripe } from "./stripe";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const getSession = async (sessionId: string) => {
//   const sessionData = await stripe.checkout.sessions.retrieve(sessionId);
//   console.log("session: ", sessionData);
// }
