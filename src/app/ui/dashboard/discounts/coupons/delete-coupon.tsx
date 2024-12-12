"use client";

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
import { deleteCoupon } from "@/lib/actions/discounts/coupons/actions";
import { LoaderPinwheelIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

interface DeleteCouponProps {
  couponId: string;
}

const DeleteCoupon = ({ couponId }: DeleteCouponProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setIsLoading(true);
    setError("");
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const result = await deleteCoupon(couponId);

      if (!result || !result.success) {
        throw new Error("Failed to delete coupon");
      }

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error deleting coupon: ", error);
      setError("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-2">
          <Trash2Icon size={24} />
          <p className="hidden">Delete Coupon</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are You Sure?</DialogTitle>
          <DialogDescription>
            This action will permanently delete this coupon. This means that this
            discount will no longer be usable to customers, and any assosciated
            promo codes will become invalid. This can not be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={`default`} disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant={`destructive`}
            disabled={isLoading}
            onClick={handleDelete}
          >
            <div className="flex justify-center items-center gap-2">
              {isLoading ? (
                <LoaderPinwheelIcon size={20} className="animate-spin" />
              ) : (
                <Trash2Icon size={20} />
              )}
              <span>Delete</span>
            </div>
          </Button>
        </DialogFooter>
        {error && (
          <p className="text-red-600 text-sm italic mt-1 text-center">
            {error}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCoupon;
