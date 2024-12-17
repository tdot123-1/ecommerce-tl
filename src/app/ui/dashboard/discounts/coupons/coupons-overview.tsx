import { fetchAllCouponsAndCodes } from "@/lib/data/discounts/dashboard/data";
import CouponDetails from "./coupon-details";

const CouponsOverview = async () => {
  const couponData = await fetchAllCouponsAndCodes();

  return (
    <section className="mb-10 mt-5 md:mt-10">
      {couponData.map((coupon) => (
        <CouponDetails
          key={coupon.coupon.id}
          coupon={coupon.coupon}
          promoCodes={coupon.promoCodes}
        />
      ))}
    </section>
  );
};

export default CouponsOverview;
