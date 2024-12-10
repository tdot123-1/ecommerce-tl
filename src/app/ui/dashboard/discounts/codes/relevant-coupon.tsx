import { fetchOneCouponData } from "@/lib/data/discounts/dashboard/data";

interface RelevantCouponProps {
  couponId: string;
}

const RelevantCoupon = async ({ couponId }: RelevantCouponProps) => {
  try {
    const coupon = await fetchOneCouponData(couponId);

    return (
      <div className="my-4">
        <h2>{coupon.name}</h2>
        <p>{`${coupon.percent_off} % off`}</p>
      </div>
    );
  } catch (error) {
    console.error("Error retrieving coupon: ", error);
    return (
      <div className="my-4">
        <h2>Coupon name not found</h2>
      </div>
    );
  }
};

export default RelevantCoupon;
