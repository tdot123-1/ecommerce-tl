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
import { Coupon, PromoCode } from "@/lib/types";
import { checkDiscountStatus } from "@/lib/utils";
import { EditIcon, PlusCircleIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import CodeTableRow from "../codes/code-table-row";

interface CouponDetailsProps {
  coupon: Coupon;
  promoCodes: PromoCode[];
}

const CouponDetails = ({ coupon, promoCodes }: CouponDetailsProps) => {
  return (
    <div className="mb-4">
      <div className="bg-zinc-300 dark:bg-zinc-900 rounded-t-lg p-4">
        <div className="flex justify-between items-baseline mb-2">
          <h2 className="text-lg font-semibold">
            {coupon.name || "Unnamed Coupon"}
          </h2>
          <div>
            <Button variant="ghost" className="p-2 mr-1.5">
              <EditIcon size={24} />
              <p className="hidden">Edit name</p>
            </Button>
            <Button variant="ghost" className="p-2">
              <Trash2Icon size={24} />
              <p className="hidden">Delete</p>
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Percent off</TableHead>
              <TableHead>Status</TableHead>
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
              <TableCell>
                {
                  checkDiscountStatus(
                    coupon.redeem_by,
                    coupon.max_redemptions,
                    coupon.times_redeemed,
                    coupon.valid
                  ).message
                }
              </TableCell>
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
                <TableHead>Status</TableHead>
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
                <CodeTableRow promoCode={code} key={code.id} />
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
