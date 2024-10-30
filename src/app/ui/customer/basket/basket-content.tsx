"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { capitalize, formatPrice } from "@/lib/utils";
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
              <div className="w-16  sm:w-20  relative">
                <AspectRatio ratio={7 / 8}>
                  <Image
                    className="rounded-lg"
                    src={product.image_url!}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 40vw, 
                            (max-width: 1024px) 20vw, 
                            (max-width: 1280px) 10vw, 
                            8vw"
                  />
                </AspectRatio>
              </div>
              <div className="flex flex-col max-w-12 md:max-w-36 justify-center items-center text-sm">
                <p className="font-bold text-center">
                  {capitalize(product.name)}
                </p>
                <p>{product.size}</p>
              </div>
              <p>-</p>
              <div className="flex flex-col justify-center items-center text-sm">
                <p>{formatPrice(product.price)}</p>
                <p>x {product.quantity}</p>
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
        <span className="font-bold">Total: </span>
        {formatPrice(totalPrice!)}
      </p>
      <div className="flex flex-col sm:flex-row items-center sm:justify-evenly gap-3 sm:gap-0 mt-4">
        <Button className="w-fit" onClick={clearCart}>
          Clear Basket
        </Button>
        <Link href="/checkout">
          <Button>To Checkout</Button>
        </Link>
      </div>
    </div>
  );
};

export default BasketContent;
