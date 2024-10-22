"use client";

import { Switch } from "@/components/ui/switch";
import { deactivateProduct } from "@/lib/actions";
import { useState } from "react";

interface ActivateSwitchProps {
  defaultValue: boolean;
  productId: string;
  category: string;
}

const ActivateSwitch = ({
  defaultValue,
  productId,
  category,
}: ActivateSwitchProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(defaultValue);

  const handleSwitch = async (checked: boolean) => {
    setIsLoading(true);
    setError("");
    setChecked(checked);

    console.log(checked);
    const result = await deactivateProduct(productId, checked, category);

    if (!result) {
      setError("Something went wrong. Please try again later");
      setChecked(!checked);
    } else if (result.message) {
      setError("Something went wrong. Please try again later");
      setChecked(!checked);
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
  };
  return (
    <>
      <Switch
        checked={checked}
        onCheckedChange={handleSwitch}
        disabled={isLoading}
      />
      {error && <p className="text-red-600 text-xs italic mt-1">{error}</p>}
    </>
  );
};

export default ActivateSwitch;
