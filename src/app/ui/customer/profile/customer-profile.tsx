import { fetchOneCustomer } from "@/lib/data/customers/data";
import PurchaseHistory from "./purchase-history";

interface CustomerProfileProps {
  customerStripeId: string;
}

const CustomerProfile = async ({ customerStripeId }: CustomerProfileProps) => {
  const customer = await fetchOneCustomer(customerStripeId);
  return (
    <>
      <div className="my-8">
        <h2 className="italic">Signed in as <span className="font-semibold text-lg">{`${customer.name}`}</span></h2>
        <div>{`Deleted: ${customer.deleted}`}</div>
        <PurchaseHistory customerStripeId={customerStripeId} />
      </div>
    </>
  );
};

export default CustomerProfile;
