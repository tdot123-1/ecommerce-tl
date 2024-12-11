import CouponsOverview from "@/app/ui/dashboard/discounts/coupons/coupons-overview";
import { montserrat } from "@/app/ui/fonts";

const Page = () => {
  return (
    <>
      <h1 className={`${montserrat.className} text-xl font-semibold mt-4`}>
        Discounts Overview
      </h1>
      <CouponsOverview />
      <p>Create new coupon</p>
      <p>Create new promo codes</p>
      <p>Deactivate coupon/promo code</p>
      <p>Delete coupon/promo code</p>
    </>
  );
};

export default Page;
