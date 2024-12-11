import { montserrat } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatPrice } from "@/lib/utils";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

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
  return (
    <div className="mb-4">
      <div className="bg-zinc-300 dark:bg-zinc-900 rounded-t-lg p-4">
        <h2 className="text-lg font-semibold">
          {coupon.name || "Unnamed Coupon"}
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Percent off</TableHead>
              <TableHead>Valid</TableHead>
              <TableHead>Times redeemed</TableHead>
              <TableHead>Max redemptions</TableHead>
              <TableHead>Redeem by</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                {coupon.percent_off ? `${coupon.percent_off} %` : "N/A"}
              </TableCell>
              <TableCell>{coupon.valid ? "True" : "False"}</TableCell>
              <TableCell>{coupon.times_redeemed}</TableCell>
              <TableCell>{coupon.max_redemptions || "N/A"}</TableCell>
              <TableCell>
                {coupon.redeem_by
                  ? new Date(coupon.redeem_by * 1000).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell>
                {new Date(coupon.created * 1000).toLocaleDateString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="bg-zinc-50 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-900 rounded-b-lg p-4">
        <div className="flex justify-between items-baseline p-2">
          <h2 className={`${montserrat.className} text-lg`}>Promo Codes</h2>
          <Link href={`/dashboard/discounts/promo-codes/create/${coupon.id}`}>
            <Button>
              <div className="flex justify-center items-center gap-2">
                <PlusCircleIcon size={20} />
                <span>Create Code</span>
              </div>
            </Button>
          </Link>
        </div>
        {promoCodes.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Times redeemed</TableHead>
                <TableHead>Max redemptions</TableHead>
                <TableHead>Minimum order value</TableHead>
                <TableHead>First purchase only</TableHead>
                <TableHead>Expires at</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promoCodes.map((code) => (
                <TableRow key={code.id}>
                  <TableCell>{code.code}</TableCell>
                  <TableCell>{code.active ? "True" : "False"}</TableCell>
                  <TableCell>{code.times_redeemed}</TableCell>
                  <TableCell>{code.max_redemptions || "N/A"}</TableCell>
                  <TableCell>
                    {code.minimum_amount
                      ? formatPrice(code.minimum_amount)
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {code.first_time_transaction ? "True" : "False"}
                  </TableCell>
                  <TableCell>
                    {code.expires_at
                      ? new Date(code.expires_at * 1000).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {new Date(code.created * 1000).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div>
            <p>No promo codes yet!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponDetails;
