"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";

const BasketContent = () => {
  const cart = useShoppingCart();
  const { cartCount, cartDetails, totalPrice, clearCart, removeItem } = cart;

  if (cartCount === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p>Nothing here yet!</p>
      </div>
    );
  }

  return (
    <div>
      <ScrollArea className="h-96">
        <ul>
          {Object.entries(cartDetails!).map(([id, product]) => (
            <li
              key={id}
              className=" flex justify-between items-center py-2 border-b border-zinc-400"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 relative">
                <Image
                  className="rounded-lg"
                  src={product.image!}
                  alt={product.name}
                  fill
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="font-bold text-sm">{product.name}</p>
                <p className="text-sm">{product.size}</p>
              </div>
              <p>-</p>
              <div className="flex flex-col justify-center items-center">
                <p>€{product.price / 100}</p>
                <p className="text-sm">x {product.quantity}</p>
              </div>
              <Button
                onClick={() => removeItem(id)}
                className="p-1"
                variant="default"
              >
                <TrashIcon size={16} />
              </Button>
            </li>
          ))}
        </ul>
      </ScrollArea>
      <p className="text-right underline my-2">
        <span className="font-bold">Total:</span> €{totalPrice! / 100}
      </p>
      <div className="flex flex-col sm:flex-row items-center sm:justify-evenly gap-3 sm:gap-0 mt-4">
        <Link href="/checkout">
          <Button>To Checkout</Button>
        </Link>
        <Button className="w-fit" onClick={clearCart}>
          Clear Basket
        </Button>
      </div>
    </div>
  );
};

export default BasketContent;
