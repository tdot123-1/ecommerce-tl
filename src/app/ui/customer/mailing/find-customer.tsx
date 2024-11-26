"use server"

import { verifyAndSetCookie } from "@/lib/customer-auth/verify-set-cookie";


interface FindCustomerProps {
  token: string;
}

const FindCustomer = async ({ token }: FindCustomerProps) => {

  const result = await verifyAndSetCookie(token);

  if (result.message) {
    return <div>{`Verified! ${result.message}`}</div>;
  } else {
    return <div>{`Problem occurred: ${result.error}`}</div>;
  }
};

export default FindCustomer;
