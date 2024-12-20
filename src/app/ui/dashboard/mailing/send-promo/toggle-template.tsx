"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import SendPromoWithTemplate from "./send-promo-with-template";
import SendPromoPlaintext from "./send-promo-plaintext";

interface PromoData {
  code: string;
  percentOff: number | null;
  couponName: string | null;
  maxRedemptions: number | null;
  minAmount: number | null;
  expiresAt: number | null;
}

interface ToggleTemplateProps {
  promoData?: PromoData;
  type?: string;
}

const ToggleTemplate = ({ promoData, type }: ToggleTemplateProps) => {
  const [useTemplate, setUseTemplate] = useState(type !== "plaintext");
  return (
    <>
      <div>
        <h2>Promo code data:</h2>
        <p>Code: </p>
        <p>Coupon name: </p>
        <p>Percent off: </p>
        <p>Max redemptions: </p>
        <p>Minimum order amount: </p>
        <p>Expires at: </p>
      </div>
      <div className="text-center mb-4">
        <h2 className="font-semibold">
          {useTemplate ? "Using default template" : "Using Plaintext"}
        </h2>
        <p className="text-sm mb-2 text-zinc-800 dark:text-zinc-400 italic">
          {useTemplate
            ? "A template is a pre-crafted email where you only have to add certain dynamic values."
            : "For a plaintext email you write the complete email. The email will include only the text you submit, and every recipient will receive the exact same content."}
        </p>

        <Button
          type="button"
          size={`sm`}
          onClick={() => setUseTemplate(!useTemplate)}
        >
          {useTemplate ? "Use Plaintext" : "Use Template"}
        </Button>
      </div>
      {useTemplate ? (
        <SendPromoWithTemplate code={promoData ? promoData.code : undefined} percentOff={promoData ? promoData.percentOff : undefined} />
      ) : (
        <SendPromoPlaintext />
      )}
    </>
  );
};

export default ToggleTemplate;
