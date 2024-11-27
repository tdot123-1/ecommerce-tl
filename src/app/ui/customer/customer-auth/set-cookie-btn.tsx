"use client";

import { Button } from "@/components/ui/button";
import { setCookie } from "@/lib/actions/cookies/actions";
import { capitalize } from "@/lib/utils";
import { Check, CheckCheck } from "lucide-react";
import { useState } from "react";
import { montserrat } from "../../fonts";

interface SetCookieButtonProps {
  name: string;
  customerId: string;
}

const SetCookieButton = ({ name, customerId }: SetCookieButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleSetCookie = async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));
    await setCookie(customerId);

    setIsLoading(false);
    setVerified(true);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20 gap-8">
      <h2
        className={`${montserrat.className} text-xl font-semibold`}
      >{`Welcome Back ${capitalize(name)}`}</h2>
      <p className="text-sm text-zinc-800 dark:text-zinc-400 text-center">
        Please click the button below to verify it is you, and to start taking
        advantage of possible discounts while shopping!
      </p>
      <Button onClick={handleSetCookie} disabled={isLoading || verified}>
        <div className="flex flex-row justify-center items-center gap-1">
          {verified ? (
            <>
              <span>Verified</span>
              <CheckCheck size={20} />
            </>
          ) : (
            <>
              <span>Verify</span>
              <Check size={20} />
            </>
          )}
        </div>
      </Button>
      {verified && (
        <div className="text-center text-sm text-zinc-800 dark:text-zinc-400">
          <p className="mb-2">
            That's all! Remember to take advantage of discounts by adding your
            promo code at the checkout
          </p>
          <p>You can now continue shopping from this window,</p>
          <p>
            or you can continue in the window you had previously open, just make
            sure to reload the page.
          </p>
        </div>
      )}
    </div>
  );
};

export default SetCookieButton;
