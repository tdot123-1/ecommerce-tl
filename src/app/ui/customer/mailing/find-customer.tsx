import { setCookie } from "@/lib/actions/cookies/actions";
import { JWT_SECRET } from "@/lib/constants";
import { verifyToken } from "@/lib/customer-auth/token";
import { verifyAndSetCookie } from "@/lib/customer-auth/verify-set-cookie";
import { fetchOneCustomer } from "@/lib/data/customers/data";
import jwt from "jsonwebtoken";

interface FindCustomerProps {
  token: string;
}

const FindCustomer = async ({ token }: FindCustomerProps) => {
  // try {
  //   const decoded = jwt.verify(token, JWT_SECRET!);
  //   console.log("TOKEN DECODED: ", decoded);

  //   const { userId } = decoded as { userId: string };

  //   const customer = await fetchOneCustomer(userId);

  //   await setCookie(customer.stripe_customer_id);

  //   return <div>{`Decoded token for: ${customer.name}`}</div>;
  // } catch (error) {
  //   console.error("Token verification failed: ", error);
  //   return <div>{`Token verification failed: ${error}`}</div>;
  // }

  // console.log("TOKEN DECODED: ", decoded)

  // return <div>{`Decoded token: ${decoded}`}</div>;

  const result = await verifyAndSetCookie(token);

  if (result.message) {
    return <div>{`Verified! ${result.message}`}</div>;
  } else {
    return <div>{`Problem occurred: ${result.error}`}</div>;
  }
};

export default FindCustomer;
