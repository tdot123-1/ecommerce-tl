"use client";

import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/lib/types";
import { LoaderPinwheelIcon, ShoppingBasketIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";

interface AddButtonProps {
  product: Product;
  size: string;
  handleSizeError: (arg0: string) => void;
}

const AddButton = ({ product, size, handleSizeError }: AddButtonProps) => {
  const { addItem } = useShoppingCart();
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

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

  const handleAddItem = async () => {
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

    await new Promise((resolve) => setTimeout(resolve, 300));

    setIsLoading(false);

    toast({
      title: "Success!",
      description: "Item was succesfully added to your basket",
      action: (
        <ToastAction
          onClick={() => router.push("/checkout")}
          altText="Go to checkout"
        >
          Checkout
        </ToastAction>
      ),
    });
  };
  return (
    <>
      <Button onClick={handleAddItem} disabled={isLoading}>
        <div className="flex items-center justify-center gap-2">
          {isLoading ? (
            <LoaderPinwheelIcon size={20} className="animate-spin" />
          ) : (
            <ShoppingBasketIcon size={20} />
          )}

          <span>Add to Cart</span>
        </div>
      </Button>
    </>
  );
};

export default AddButton;
