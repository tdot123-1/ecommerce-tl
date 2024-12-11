import { TableCell, TableRow } from "@/components/ui/table";
import { PromoCode } from "@/lib/types";
import { checkDiscountStatus, formatPrice } from "@/lib/utils";
import ActiveSwitch from "./active-switch";

interface CodeTableRowProps {
  promoCode: PromoCode;
}

const CodeTableRow = ({ promoCode }: CodeTableRowProps) => {
  const codeStatus = checkDiscountStatus(
    promoCode.expires_at,
    promoCode.max_redemptions,
    promoCode.times_redeemed,
    promoCode.active
  );

  return (
    <TableRow>
      <TableCell>{promoCode.code}</TableCell>
      <TableCell>{codeStatus.message}</TableCell>
      <TableCell>
        <ActiveSwitch
          isActive={codeStatus.isActive}
          canActivate={codeStatus.canActivate}
          promoCodeId={promoCode.id}
        />
      </TableCell>
      <TableCell>{promoCode.times_redeemed}</TableCell>
      <TableCell>{promoCode.max_redemptions || "N/A"}</TableCell>
      <TableCell>
        {promoCode.minimum_amount
          ? formatPrice(promoCode.minimum_amount)
          : "N/A"}
      </TableCell>
      <TableCell>
        {promoCode.first_time_transaction ? "True" : "False"}
      </TableCell>
      <TableCell>
        {promoCode.expires_at
          ? new Date(promoCode.expires_at * 1000).toLocaleDateString()
          : "N/A"}
      </TableCell>
      <TableCell>
        {new Date(promoCode.created * 1000).toLocaleDateString()}
      </TableCell>
    </TableRow>
  );
};

export default CodeTableRow;
