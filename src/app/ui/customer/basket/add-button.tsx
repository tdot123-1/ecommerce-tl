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
}: AddButtonProps) => {
  const { addItem } = useShoppingCart();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(false);

  const handleAddItem = () => {

    // check if size is selected
    setError(false);
    if (!size) {
      setError(true);
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
      {error && (
        <span className="text-red-600 text-sm italic">
          Please select a size
        </span>
      )}
    </>
  );
};

export default AddButton;
