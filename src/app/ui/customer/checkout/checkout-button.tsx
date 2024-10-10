"use client";

import { Button } from "@/components/ui/button";
import { LoaderPinwheelIcon, LucideCreditCard } from "lucide-react";
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";

const CheckoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("")
  const { cartDetails, redirectToCheckout, cartCount } = useShoppingCart();

  const handleCheckout = async () => {
    setError("")
    setIsLoading(true);

    if (!cartCount) {
      setError("No items in basket yet")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: Object.values(cartDetails!).map((item) => ({
            id: item.id,
            name: item.name,
            stripe_price_id: item.stripe_price_id,
            quantity: item.quantity,
            size: item.size
          })),
        }),
      });

      const data = await response.json();

      if (typeof data.sessionID === "string") {
        redirectToCheckout(data.sessionID);
      } else {
        throw new Error("session ID error");
      }
    } catch (error) {
      console.error("Error during checkout: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    
    <Button className="" disabled={isLoading} onClick={handleCheckout}>
      <div className="flex justify-center items-center gap-2">
        {isLoading ? (
          <LoaderPinwheelIcon size={20} className="animate-spin" />
        ) : (
          <LucideCreditCard size={20} />
        )}
        <span>Checkout</span>
      </div>
    </Button>
    {
      error && <p className="text-xs font-light text-red-600 italic">{error}</p>
    }
    </>
  );
};

export default CheckoutButton;
