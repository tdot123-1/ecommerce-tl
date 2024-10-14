"use client";

import { Button } from "@/components/ui/button";
import { LoaderPinwheelIcon, ShoppingBasketIcon } from "lucide-react";
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";

interface AddButtonProps {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  image: string;
  stripe_price_id: string;
  size: string;
  handleSizeError: (arg0: string) => void;
}

const AddButton = ({
  id,
  name,
  price,
  currency,
  description,
  image,
  stripe_price_id,
  size,
  handleSizeError,
}: AddButtonProps) => {
  const { addItem } = useShoppingCart();

  const [isLoading, setIsLoading] = useState(false);



  const handleAddItem = () => {
    // check if size is selected
    handleSizeError("")
    if (!size) {
      // display error in parent component
      handleSizeError("Please select a size.")
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
      image,
      stripe_price_id,
      size,
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 300);
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
