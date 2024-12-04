import { getCookie } from "@/lib/actions/cookies/actions";
import { fetchPriceValidationProducts } from "@/lib/data/products/store/data";
import { stripe } from "@/lib/stripe-object";
import { CartItem } from "@/lib/types";
import { validateCart } from "@/lib/utils";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    // get cart items in request
    const { cartItems }: { cartItems: CartItem[] } = await req.json();
    console.log("CART ITEMS: ", cartItems);

    // get list of price id's and product id's from db
    const inventory = await fetchPriceValidationProducts();
    console.log("INVENTORY: ", inventory);

    // return array of only validated cart items (matching price and product id's)
    const validatedItems = validateCart(inventory, cartItems);
    console.log("VALIDATED ITEMS: ", validatedItems);

    // create array of line items with price id to send to Stripe checkout
    const line_items = validatedItems.map((item) => ({
      price: item.stripe_price_id,
      quantity: item.quantity,
    }));

    // add metadata to display size for selected items in Stripe dashboard
    const metadata = validatedItems.reduce((acc, item, index) => {
      acc[`item_${index}_quantity`] = item.quantity.toString();
      acc[`item_${index}_size`] = item.size;
      acc[`item_${index}_name`] = item.name;
      return acc;
    }, {} as Record<string, string>);

    // console.log("LINE ITEMS: ", line_items);
    // console.log("META: ", metadata);

    //(!) TESTING DISCOUNTS ///

    /* 
    1. create session params
    2. check for first time purchase
    3. check for other discounts
    4. apply discounts if necessary
    */

    const customerId = await getCookie();
    // console.log("CUSTOMER ID COOKIE: ", customerId)

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      payment_method_types: ["card", "ideal"],
      success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
      shipping_address_collection: {
        allowed_countries: ["NL", "FR", "US"],
      },
      payment_intent_data: {
        metadata: { ...metadata },
      },
      ...(customerId && {
        customer: customerId,
        allow_promotion_codes: true,
      }),
    });

    return NextResponse.json({ sessionID: session.id });
  } catch (error) {
    console.error("Error creating checkout session: ", error);
    return new NextResponse(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
};

// get checkout session (probably not used anymore)

// export const GET = async (req: Request) => {
//   const { searchParams } = new URL(req.url);

//   const sessionId = searchParams.get("session_id");

//   if (!sessionId) {
//     return NextResponse.json({ error: "Session ID required" }, { status: 400 });
//   }

//   try {
//     const session = await stripe.checkout.sessions.retrieve(sessionId);

//     return NextResponse.json(session, { status: 200 });
//   } catch (error) {
//     console.error("Error retrieving checkout session", error);
//     return NextResponse.json(
//       { error: "Failed to retrieve session" },
//       { status: 500 }
//     );
//   }
// };
