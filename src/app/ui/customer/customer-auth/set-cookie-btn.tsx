"use client";

import { Button } from "@/components/ui/button";
import { setCookie } from "@/lib/actions/cookies/actions";
import { capitalize } from "@/lib/utils";
import { Check, CheckCheck } from "lucide-react";
import { useState } from "react";

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
    <div>
      <h2>{`Welcome Back ${capitalize(name)}`}</h2>
      <p>
        Please click the link below to verify it is you, and to start taking
        advantage of possible discounts while shopping!
      </p>
      <Button onClick={handleSetCookie} disabled={isLoading || verified}>
        <div>
          {verified ? (
            <>
              <span>Verified</span> <CheckCheck />
            </>
          ) : (
            <>
              <span>Verify</span>
              <Check />
            </>
          )}
        </div>
      </Button>
    </div>
  );
};

export default SetCookieButton;
