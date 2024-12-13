import { fetchOneCouponData } from "@/lib/data/discounts/dashboard/data";

interface RelevantCouponProps {
  couponId: string;
}

const RelevantCoupon = async ({ couponId }: RelevantCouponProps) => {
  try {
    const coupon = await fetchOneCouponData(couponId);

    return (
      <div className="my-4 border-b border-b-zinc-300 bg-zinc-100 dark:bg-zinc-900 dark:border-b-zinc-700 rounded-t-lg px-2 pt-2">
        <h2 className="flex justify-between items-baseline">
          <span className="font-semibold">Coupon: </span>
          <span className="text-zinc-700 dark:text-zinc-400">
            {coupon.name}
          </span>
        </h2>
        <p className="flex justify-between items-baseline">
          <span className="font-semibold">Details: </span>
          <span className="text-zinc-700 dark:text-zinc-400">{`${coupon.percent_off}% off`}</span>
        </p>
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
