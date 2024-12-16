import { fetchOneCustomer } from "@/lib/data/customers/data";
import PurchaseHistory from "./purchase-history";
import { Button } from "@/components/ui/button";
import { LucideTrash2 } from "lucide-react";
import SignoutButton from "./signout-btn";

interface CustomerProfileProps {
  customerStripeId: string;
}

const CustomerProfile = async ({ customerStripeId }: CustomerProfileProps) => {
  const customer = await fetchOneCustomer(customerStripeId);
  return (
    <>
      <div className="my-8">
        <h2 className="italic">
          Signed in as{" "}
          <span className="font-semibold text-lg">{`${customer.name}`}</span>
        </h2>
        {!customer.deleted && (
          <div className="my-8 text-center">
            <h3 className="text-xl font-semibold text-red-600 ">Warning</h3>
            <p className="italic text-sm">
              Your profile will be permanently deleted in [delete_expiry_date]
              days.
            </p>
            <p className="italic mb-4 text-sm">
              To restore your profile, click the button below.
            </p>
            <Button>Restore Profile</Button>
          </div>
        )}

        <PurchaseHistory customerStripeId={customerStripeId} />
        <div>Active promotions</div>
        <div className="flex justify-around mt-24 bg-zinc-100 dark:bg-zinc-700 rounded-lg py-10 md:px-10 mx-auto shadow-lg">
          <SignoutButton />
          <Button variant={`destructive`}>
            <div className="flex items-center justify-center gap-1">
              <LucideTrash2 size={20} />
              <span>Delete profile</span>
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};

export default CustomerProfile;
