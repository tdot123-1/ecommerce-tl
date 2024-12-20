"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import SendPromoWithTemplate from "./send-promo-with-template";
import SendPromoPlaintext from "./send-promo-plaintext";
import { formatPrice } from "@/lib/utils";

interface PromoData {
  code: string;
  percentOff: number | null;
  couponName: string | null;
  maxRedemptions: number | null;
  minAmount: number | null;
  expiresAt: number | null;
}

interface ToggleTemplateProps {
  promoData: PromoData;
  type?: string;
}

const ToggleTemplate = ({ promoData, type }: ToggleTemplateProps) => {
  const [useTemplate, setUseTemplate] = useState(type !== "plaintext");
  return (
    <>
      <div className="mb-3 text-sm">
        <h2 className="pl-2 font-semibold text-lg bg-zinc-200 dark:bg-zinc-900 rounded-t-lg">
          Promo code data
        </h2>
        <div className="p-2 rounded-b-lg bg-zinc-100 dark:bg-zinc-800">
          <p className="flex justify-between">
            <span>Code:</span>{" "}
            <span className="text-zinc-700 dark:text-zinc-300 italic">
              {promoData.code}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Coupon name: </span>
            <span className="text-zinc-700 dark:text-zinc-300 italic">
              {promoData.couponName}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Discount:</span>
            <span className="text-zinc-700 dark:text-zinc-300 italic">
              {" "}
              {`${promoData.percentOff} % off` || "N/A"}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Max redemptions:</span>
            <span className="text-zinc-700 dark:text-zinc-300 italic">
              {promoData.maxRedemptions || "N/A"}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Minimum order amount:</span>
            <span className="text-zinc-700 dark:text-zinc-300 italic">
              {promoData.minAmount ? formatPrice(promoData.minAmount) : "N/A"}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Expires at:</span>

            <span className="text-zinc-700 dark:text-zinc-300 italic">
              {promoData.expiresAt
                ? new Date(promoData.expiresAt * 1000).toLocaleDateString()
                : "N/A"}
            </span>
          </p>
        </div>
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
        <SendPromoWithTemplate
          code={promoData ? promoData.code : undefined}
          percentOff={promoData ? promoData.percentOff : undefined}
        />
      ) : (
        <SendPromoPlaintext />
      )}
    </>
  );
};

export default ToggleTemplate;
