"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface ActivateSwitchProps {
  defaultValue: boolean;
  productId: string;
}

const ActivateSwitch = ({ defaultValue, productId }: ActivateSwitchProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSwitch = (checked: boolean) => {
    
    console.log(checked);
  };
  return <Switch defaultChecked={defaultValue} onCheckedChange={handleSwitch} disabled={isLoading} />;
};

export default ActivateSwitch;
