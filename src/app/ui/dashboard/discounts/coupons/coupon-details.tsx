interface PromoCode {
  id: string;
  code: string;
  max_redemptions: number | null;
  times_redeemed: number;
  active: boolean;
  minimum_amount: number | null;
  first_time_transaction: boolean;
  expires_at: number | null;
  created: number;
}

interface Coupon {
  id: string;
  name: string | null;
  percent_off: number | null;
  redeem_by: number | null;
  max_redemptions: number | null;
  times_redeemed: number;
  valid: boolean;
  created: number;
}

interface CouponDetailsProps {
  coupon: Coupon;
  promoCodes: PromoCode[];
}

const CouponDetails = ({ coupon, promoCodes }: CouponDetailsProps) => {
  return <div></div>;
};

export default CouponDetails;
