import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReceiptEuroIcon } from "lucide-react";
import PurchaseDetailsReceipt from "./purchase-details-receipt";
import { Suspense } from "react";
import PurchaseDetailsLoading from "./purchase-details-loading";

interface PurchaseDetailsProps {
  purchaseDate: string;
  sessionId: string;
  amountTotal: number | null;
}

const PurchaseDetails = ({
  purchaseDate,
  sessionId,
  amountTotal,
}: PurchaseDetailsProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <div className="flex items-center justify-center gap-1">
            <ReceiptEuroIcon size={20} />
            <span>Details</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Purchase Details</DialogTitle>
          <DialogDescription>
            {`An overview of the purchase made from this account on ${purchaseDate}`}
          </DialogDescription>
        </DialogHeader>
        <Suspense fallback={<PurchaseDetailsLoading />}>
          <PurchaseDetailsReceipt
            sessionId={sessionId}
            amountTotal={amountTotal}
          />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseDetails;
