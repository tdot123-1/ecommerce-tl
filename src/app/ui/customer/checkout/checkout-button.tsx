"use client";

import { Button } from "@/components/ui/button";
import { LoaderPinwheelIcon, LucideCreditCard } from "lucide-react";
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";

const CheckoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { cartDetails, redirectToCheckout } = useShoppingCart();

  const handleCheckout = async () => {
    setIsLoading(true);

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
            price_id: item.price_id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      console.log("session: ", data);

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
    <Button className="p-1" disabled={isLoading} onClick={handleCheckout}>
      <div className="flex justify-center items-center gap-2">
        {isLoading ? (
          <LoaderPinwheelIcon size={20} className="animate-spin" />
        ) : (
          <LucideCreditCard size={20} />
        )}
        <span>Checkout</span>
      </div>
    </Button>
  );
};

export default CheckoutButton;
