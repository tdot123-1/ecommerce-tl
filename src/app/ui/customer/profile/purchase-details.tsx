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

interface PurchaseDetailsProps {
  purchaseDate: string;
  sessionId: string;
}

const PurchaseDetails = ({ purchaseDate, sessionId }: PurchaseDetailsProps) => {
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
        <PurchaseDetailsReceipt sessionId={sessionId} />
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseDetails;
