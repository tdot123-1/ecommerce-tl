"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
import { LoaderPinwheelIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";

interface BuyButtonProps {
  product: Product;
  size: string;
  handleSizeError: (arg0: string) => void;
}

const BuyButton = ({ product, size, handleSizeError }: BuyButtonProps) => {
  const { addItem } = useShoppingCart();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    id,
    name,
    price,
    currency,
    description,
    image_url,
    stripe_price_id,
    stripe_product_id,
  } = product;

  const handleBuyItem = async () => {
    // check if size is selected
    handleSizeError("");
    if (!size) {
      // display error in parent component
      handleSizeError("Please select a size.");
      return;
    }

    setIsLoading(true);

    // add size to id to differentiate between same products of different sizes in shopping cart
    addItem({
      id: `${id} - ${size}`,
      name,
      price,
      currency,
      description,
      image_url,
      stripe_price_id,
      stripe_product_id,
      size,
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    router.push("/checkout");

    setIsLoading(false);
  };
  return (
    <>
      <Button className="min-w-20" onClick={handleBuyItem} disabled={isLoading}>
        <div className="flex items-center justify-center gap-2">
          {isLoading ? (
            <LoaderPinwheelIcon size={20} className="animate-spin" />
          ) : (
            <span>Buy Now!</span>
          )}
        </div>
      </Button>
    </>
  );
};

export default BuyButton;
