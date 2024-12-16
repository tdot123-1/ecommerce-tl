"use client";

import { Button } from "@/components/ui/button";
import { resendEmail } from "@/lib/actions/mailing/actions";
import { LoaderPinwheelIcon, SendIcon } from "lucide-react";
import { useState } from "react";

interface ResendEmailProps {
  email: string;
}

const ResendMail = ({ email }: ResendEmailProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleResend = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      await resendEmail(email);
    } catch (error) {
      console.error("Error resending: ", error);
      setError("Something went wrong, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="text-center">
        <p className="text-sm text-green-600 italic mt-1">
          Click the link in your email to complete the process!
        </p>
        <p className="text-xs italic my-1">
          It could take a few seconds before you receive the email. Click the
          button below to re-send the email in case it takes too long.
        </p>

        <Button type="button" onClick={handleResend} disabled={isLoading}>
          <div className="flex justify-center items-center gap-2">
            {isLoading ? (
              <LoaderPinwheelIcon size={20} className="animate-spin" />
            ) : (
              <SendIcon size={20} />
            )}
            <span>Re-send email</span>
          </div>
        </Button>
        {error && <p className="text-red-600 text-sm italic mt-1">{error}</p>}
      </div>
    </>
  );
};

export default ResendMail;
