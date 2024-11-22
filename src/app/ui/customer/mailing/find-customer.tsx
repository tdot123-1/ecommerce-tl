import { verifyToken } from "@/lib/customer-auth/token";

interface FindCustomerProps {
  token: string;
}

const FindCustomer = async ({ token }: FindCustomerProps) => {
  const decoded = verifyToken(token);
  if (!decoded) {
    return <div>Failed to verify token</div>;
  }

  console.log("TOKEN: ", decoded)

  return <div>{`Decoded token: ${decoded}`}</div>;
};

export default FindCustomer;
