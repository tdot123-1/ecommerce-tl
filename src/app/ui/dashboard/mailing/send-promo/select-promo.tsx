import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

const SelectPromo = () => {
  const promoId = "";
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button type="button">Use Template</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div></div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant={`secondary`}>
                Cancel
              </Button>
            </DialogClose>
            <Link href={`/dashboard/mailing/promo-codes/${promoId}`}>
              <Button type="button">Craft email</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SelectPromo;
