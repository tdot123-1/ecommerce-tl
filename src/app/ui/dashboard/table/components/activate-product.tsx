"use client";

import { Switch } from "@/components/ui/switch";
import { deactivateProduct } from "@/lib/actions";
import { useState } from "react";

interface ActivateSwitchProps {
  defaultValue: boolean;
  productId: string;
  category: string;
  isFeatured: boolean;
}

const ActivateSwitch = ({
  defaultValue,
  productId,
  category,
  isFeatured
}: ActivateSwitchProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(defaultValue);

  const handleSwitch = async (checked: boolean) => {
    // set loading state, error state
    // initially update switch position
    setIsLoading(true);
    setError("");
    setChecked(checked);

    // set timeout to prevent excessive server actions
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      // server action to activate/deactivate product
      const result = await deactivateProduct(productId, checked, category);

      // if no result, or message was not empty string -> something went wrong
      // undo switch
      if (!result || result.message) {
        setError("Something went wrong. Please try again later.");
        setChecked(!checked);
      }

    } catch (error) {
      // in case of error -> undo switch, set error message
      console.error("Error deleting product: ", error);
      setError("Something went wrong. Please try again later.");
      setChecked(!checked);
    } finally {
      // update loading state
      setIsLoading(false);
    }
  };
  return (
    <>
      <Switch
        checked={checked}
        onCheckedChange={handleSwitch}
        disabled={isLoading || isFeatured}
      />
      {error && <p className="text-red-600 text-xs italic mt-1">{error}</p>}
    </>
  );
};

export default ActivateSwitch;
