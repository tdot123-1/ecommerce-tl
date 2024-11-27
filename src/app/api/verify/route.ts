// import { setCookie } from "@/lib/actions/cookies/actions";

export async function POST(req: Request) {

  return Response.json({ message: "route disabled" });

  // const { customerId } = await req.json();

  // console.log("ROUTE: CUSTOMER ID: ", customerId);

  // if (!customerId) {
  //   return Response.json({ error: "customer ID not found. " }, { status: 400 });
  // }

  // try {
  //   await setCookie(customerId);

  //   console.log("COOKIE SET IN ROUTE");

  //   return Response.json({ success: true }, { status: 200 });
  // } catch (error) {
  //   console.error("Failed to set cookie in route: ", error);
  //   return Response.json({ error: "failed to set cookie" }, { status: 500 });
  // }
}
