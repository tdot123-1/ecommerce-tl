"use client";

// one component where size is selected and can be passed to 'add-button'

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

  // save selected size in this component, so that 'add-button' child component can use it
  const [selectedSize, setSelectedSize] = useState("");

  // save error in this component to display centered under both buttons
  const [sizeError, setSizeError] = useState("");

  // set error in 'add-btn' component if no size was selected
  const handleSizeError = (error: string) => {
    setSizeError(error);
  };

  // pass function to set size to 'size select' component
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <>
      <SizeSelect sizes={sizes} handleSizeSelect={handleSizeSelect} />
      <div className="flex flex-col justify-center items-center">
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
            handleSizeError={handleSizeError}
          />
        </div>
        <p className="text-red-600 text-sm italic mt-1">{sizeError}</p>
      </div>
    </>
  );
};

export default AddToBasket;
