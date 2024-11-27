"use server";

import { verifyToken } from "@/lib/customer-auth/verify-token";
import SetCookieButton from "./set-cookie-btn";
import TokenError from "./token-error";

interface FindCustomerProps {
  token: string;
}

const FindCustomer = async ({ token }: FindCustomerProps) => {
  const result = await verifyToken(token);

  if (result.error) {
    return <TokenError />;
  } else {
    return (
      <SetCookieButton name={result.name} customerId={result.customerId} />
    );
  }
};

export default FindCustomer;
