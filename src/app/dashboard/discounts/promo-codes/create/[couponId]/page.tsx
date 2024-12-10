import RelevantCoupon from "@/app/ui/dashboard/discounts/codes/relevant-coupon";
import Form from "@/app/ui/dashboard/discounts/forms/create-promo-code";
import { montserrat } from "@/app/ui/fonts";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

const Page = ({ params }: { params: { couponId: string } }) => {
  const { couponId } = params;

  return (
    <>
      <h1 className={`${montserrat.className} text-xl font-semibold mt-4`}>
        Create Promo Code
      </h1>
      <section className="my-10 sm:w-1/2 sm:mx-auto">
        <Suspense fallback={<Skeleton className="w-full h-32 my-4" />}>
          <RelevantCoupon couponId={couponId} />
        </Suspense>
        <Form couponId={couponId} />
      </section>
    </>
  );
};

export default Page;
