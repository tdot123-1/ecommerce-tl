"use client";

import { Button } from "@/components/ui/button";
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
      <ul>
        {Object.entries(cartDetails!).map(([id, product]) => (
          <li
            key={id}
            className="flex justify-between items-center py-2 border-b border-zinc-400"
          >
            <div className="w-20 h-20 relative">
              <Image
                className="rounded-lg"
                src={product.image!}
                alt={product.name}
                fill
              />
            </div>
            <p className="font-bold text-sm">{product.name}</p>
            <p className="text-sm">{product.size}</p>
            <p>- €{product.price / 100}</p>
            <p>x {product.quantity}</p>
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
      <p className="text-right underline my-2"><span className="font-bold">Total:</span> €{totalPrice! / 100}</p>
      <div className="flex justify-evenly mt-4">
        <Link href="/checkout">
          <Button>Checkout</Button>
        </Link>
        <Button onClick={clearCart}>Clear Cart</Button>
      </div>
    </div>
  );
};

export default BasketContent;
