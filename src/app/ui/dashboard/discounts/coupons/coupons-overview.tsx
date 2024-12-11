import { fetchAllCouponsAndCodes } from "@/lib/data/discounts/dashboard/data";
import CouponDetails from "./coupon-details";

const CouponsOverview = async () => {
  const couponData = await fetchAllCouponsAndCodes();

  return (
    <section className="my-10">
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
