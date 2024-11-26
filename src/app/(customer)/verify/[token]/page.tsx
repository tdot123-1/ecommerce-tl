import FindCustomer from "@/app/ui/customer/mailing/find-customer";
import { Skeleton } from "@/components/ui/skeleton";
import { verifyAndSetCookie } from "@/lib/customer-auth/verify-set-cookie";
import { Suspense } from "react";

const Page = ({ params }: { params: { token: string } }) => {
  const { token } = params;

  // const result = await verifyAndSetCookie(token);

  // if (result.message) {
  //   return <div>{`Verified! ${result.message}`}</div>;
  // } else {
  //   return <div>{`Problem occurred: ${result.error}`}</div>;
  // }

  return (
    <>
      <div>
        <Suspense fallback={<Skeleton className="h-50 w-50" />}>
          <FindCustomer token={token} />
        </Suspense>
      </div>
    </>
  );

  // return <div>Page unavailable</div>;
};

export default Page;
