import { stripe } from "@/lib/stripe";
import { CartItem } from "@/lib/types";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    // (!) validate cart items

    const { cartItems }: { cartItems: CartItem[] } = await req.json();

    const line_items = cartItems.map((item) => ({
      price: item.stripe_price_id,
      quantity: item.quantity,
    }));

    console.log("LINE ITEMS: ", line_items);

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      payment_method_types: ["card", "ideal"],
      success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
      shipping_address_collection: {
        allowed_countries: ["NL", "FR", "US"],
      },
    });

    return NextResponse.json({ sessionID: session.id });
  } catch (error) {
    console.error("Error creating checkout session: ", error);
    return new NextResponse(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
};

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Session ID required" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json(session, { status: 200 });
  } catch (error) {
    console.error("Error retrieving checkout session", error);
    return NextResponse.json(
      { error: "Failed to retrieve session" },
      { status: 500 }
    );
  }
};
