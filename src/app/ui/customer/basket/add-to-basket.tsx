"use client";

// one component where size is selected and can be passed to 'add-button'

import SizeSelect from "./size-select";
import AddButton from "./add-button";
import { useState } from "react";
import BuyButton from "./buy-button";
import { Product } from "@/lib/types";

interface AddToBasketProps {
  product: Product;
}

const AddToBasket = ({
  product
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
      <SizeSelect sizes={product.sizes} handleSizeSelect={handleSizeSelect} />
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center gap-4">
          <BuyButton
            product={product}
            size={selectedSize}
            handleSizeError={handleSizeError}
          />
          <AddButton
            product={product}
            size={selectedSize}
            handleSizeError={handleSizeError}
          />
        </div>
        {sizeError && (
          <p
            aria-atomic="true"
            aria-live="polite"
            id="size-error"
            className="text-red-600 text-sm italic mt-1"
          >
            {sizeError}
          </p>
        )}
      </div>
    </>
  );
};

export default AddToBasket;
