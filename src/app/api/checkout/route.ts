import { stripe } from "@/lib/stripe";
import { CartItem } from "@/lib/types";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { cartItems }: { cartItems: CartItem[] } = await req.json();

    const line_items = cartItems.map((item) => ({
      price: item.price_id,
      quantity: item.quantity,
    }));

    console.log("LINE ITEMS: ", line_items)

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
