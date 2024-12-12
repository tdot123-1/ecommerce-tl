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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { editCouponName } from "@/lib/actions/discounts/coupons/actions";
import { State } from "@/lib/actions/products/actions";
import { EditIcon, LoaderPinwheelIcon, SaveIcon } from "lucide-react";
import { useState } from "react";

interface EditCouponNameProps {
  couponId: string;
}

const EditCouponName = ({ couponId }: EditCouponNameProps) => {
  const [state, setState] = useState<State>({ message: null, errors: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // set loading state, prevent default
    setIsLoading(true);
    event.preventDefault();

    

    // create form data object, call server action
    const formData = new FormData(event.currentTarget);

    try {
      const result = await editCouponName(couponId, formData);
      if (!result.success) {
        setState(result);
      } else {
        toast({
          title: "Coupon name updated!",
        });

        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error creating product: ", error);
      setState({ message: "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-2 mr-1.5">
          <EditIcon size={24} />
          <p className="hidden">Edit name</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Coupon Name</DialogTitle>
          <DialogDescription>
            This name will appear on customers&apos; receipts.
          </DialogDescription>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit} id="editNameForm">
            <div className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                id="name"
                type="text"
                disabled={isLoading}
                className="ml-4"
              />
              <div>
                {state.errors?.name &&
                  state.errors.name.map((error: string, index) => (
                    <p
                      key={`${error}-${index}`}
                      className="text-red-600 text-sm italic mt-1"
                    >
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </form>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={`secondary`} disabled={isLoading} type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant={`default`}
            disabled={isLoading}
            type="submit"
            form="editNameForm"
          >
            <div className="flex justify-center items-center gap-2">
              {isLoading ? (
                <LoaderPinwheelIcon size={20} className="animate-spin" />
              ) : (
                <SaveIcon size={20} />
              )}
              <span>Save Changes</span>
            </div>
          </Button>
        </DialogFooter>
        {state.message && (
          <p className="text-red-600 text-sm italic mt-1 text-right">{state.message}</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditCouponName;
