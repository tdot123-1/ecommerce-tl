import FindCustomer from "@/app/ui/customer/mailing/find-customer";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

const Page = ({ params }: { params: { token: string } }) => {
  const { token } = params;

  return (
    <>
      <div>
        <Suspense fallback={<Skeleton className="h-50 w-50" />}>
          <FindCustomer token={token} />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
