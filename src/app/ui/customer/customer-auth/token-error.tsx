import { FrownIcon } from "lucide-react";
import { montserrat } from "../../fonts";
import SendMagicLink from "../mailing/send-magic-link";

const TokenError = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-8">
      <FrownIcon size={40} />
      <h2 className={`${montserrat.className} text-2xl font-semibold`}>
        Verification Failed
      </h2>
      <div className="text-center text-sm text-zinc-800 dark:text-zinc-400">
        <p>Unfortunately we failed to verify your account.</p>
        <p>This could be due to several reasons, but most likely the link has expired.</p>
        <p>Please submit your email address below to request a new verification link.</p>
      </div>
      <SendMagicLink />
    </div>
  );
};

export default TokenError;
