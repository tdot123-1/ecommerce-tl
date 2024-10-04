"use client";

import { Button } from "@/components/ui/button";
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

  const handleAddItem = () => {
    addItem({
      id,
      name,
      price,
      currency,
      description,
      image,
      price_id,
    });
  };
  return <Button onClick={handleAddItem}>Add to Cart</Button>;
};

export default AddButton;
