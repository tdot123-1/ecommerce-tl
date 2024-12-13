"use client";

import { Button } from "@/components/ui/button";
import { resendEmail } from "@/lib/actions/mailing/actions";

interface ResendEmailProps {
  email: string;
}

const ResendMail = ({ email }: ResendEmailProps) => {
  const handleResend = async () => {
    try {
      await resendEmail(email);
    } catch (error) {
      console.error("Error resending: ", error);
    }
  };
  return (
    <>
      <div>
        <p className="text-sm text-green-600 italic mt-1">
          Click the link in your email to complete the process!
        </p>
        <p className="text-xs italic">
          This could take a few seconds, click the button below to re-send the
          email
        </p>
        <Button onClick={handleResend}>Re-send email</Button>
      </div>
    </>
  );
};

export default ResendMail;
