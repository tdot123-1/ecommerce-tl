"use client"

import { Button } from "@/components/ui/button";
import SizeSelect from "./size-select";
import AddButton from "./add-button";
import { useState } from "react";

interface AddToBasketProps {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  image: string;
  stripe_price_id: string;
  sizes: string;
}

const AddToBasket = ({
  id,
  name,
  price,
  currency,
  description,
  image,
  stripe_price_id,
  sizes,
}: AddToBasketProps) => {

  const [selectedSize, setSelectedSize] = useState("");

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
  }

  return (
    <>
      <SizeSelect sizes={sizes} handleSizeSelect={handleSizeSelect} />
      <div className="flex justify-center items-center gap-4">
        <Button>Buy Now!</Button>
        <AddButton
          id={id}
          name={name}
          price={price}
          currency={currency}
          description={description}
          image={image}
          stripe_price_id={stripe_price_id}
          size={selectedSize}
        />
      </div>
    </>
  );
};

export default AddToBasket;
