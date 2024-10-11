"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftCircleIcon, LinkIcon, TrashIcon } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import CheckoutButton from "./checkout-button";
import Image from "next/image";
import { montserrat } from "../../fonts";
import Link from "next/link";

const ItemsOverview = () => {
  const { cartDetails, removeItem, clearCart, cartCount } = useShoppingCart();

  if (cartCount === 0) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-8 mt-20">
        <p>Nothing here yet!</p>
        <Link href="/products">
          <Button>
            <div className="flex justify-center gap-2 items-center">
              <span>Start Shopping!</span>
              <ArrowLeftCircleIcon />
            </div>
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <section>
      <h1
        className={`${montserrat.className} text-center my-8 text-2xl font-semibold`}
      >
        Your Basket Overview
      </h1>

      <div className="w-full">
        <ul className="sm:w-11/12 md:w-3/4 lg:w-1/2 mx-auto">
          {Object.entries(cartDetails!).map(([id, product]) => (
            <li
              key={id}
              className="w-full flex justify-between gap-4 items-center py-2 sm:px-4 border-b border-zinc-400"
            >
              <div className="w-20 h-20 relative">
                <Image
                  className="rounded-lg"
                  src={product.image!}
                  alt={product.name}
                  fill
                />
              </div>
              <p>{product.name}</p>
              <p>{product.size}</p>
              <p>€{product.price / 100}</p>
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
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center w-full md:w-10/12 mx-auto mt-4">
        Please review the items in your shopping basket. When ready, click the
        checkout button and you will be redirected to the{" "}
        <a target="_blank" href="https://stripe.com/">
          <span className="text-blue-600 font-semibold inline-flex w-fit gap-1 mx-1">
            Stripe
            <LinkIcon size={10} />
          </span>
        </a>
        hosted checkout page to facilitate safe and easy payment.
      </p>
      <div className="mt-4 flex justify-center gap-8 items-center">
        <Button onClick={clearCart}>Clear Cart</Button>
        <CheckoutButton />
      </div>
    </section>
  );
};

export default ItemsOverview;
