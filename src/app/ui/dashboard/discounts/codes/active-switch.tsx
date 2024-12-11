"use client";

import { Switch } from "@/components/ui/switch";
import { deactivatePromoCode } from "@/lib/actions/discounts/codes/actions";
import { useState } from "react";

interface ActiveSwitchProps {
  isActive: boolean;
  canActivate: boolean;
  promoCodeId: string;
}

const ActiveSwitch = ({
  isActive,
  canActivate,
  promoCodeId,
}: ActiveSwitchProps) => {
  const [checked, setChecked] = useState(isActive);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
      const result = await deactivatePromoCode(promoCodeId, checked);

      // if no result, or success -> something went wrong
      // undo switch
      if (!result || !result.success) {
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
        disabled={isLoading || !canActivate}
        onCheckedChange={handleSwitch}
      />
      {error && <p className="text-red-600 text-xs italic mt-1">{error}</p>}
    </>
  );
};

export default ActiveSwitch;
