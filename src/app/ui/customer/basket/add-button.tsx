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
  price_id: string;
}

const AddButton = ({
  id,
  name,
  price,
  currency,
  description,
  image,
  price_id,
}: AddButtonProps) => {
  const { addItem } = useShoppingCart();

  const [isLoading, setIsLoading] = useState(false);

  const handleAddItem = () => {
    setIsLoading(true);
    addItem({
      id,
      name,
      price,
      currency,
      description,
      image,
      price_id,
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };
  return (
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
  );
};

export default AddButton;
