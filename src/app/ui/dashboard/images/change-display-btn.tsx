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
import { changeDisplayOrder } from "@/lib/actions";
import { LoaderPinwheelIcon, SaveIcon } from "lucide-react";
import { useState } from "react";

interface ChangeDisplayOrderButtonProps {
  productId: string;
  imageId: string;
}

const ChangeDisplayOrderButton = ({
  productId,
  imageId,
}: ChangeDisplayOrderButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const result = await changeDisplayOrder(imageId, productId, formData);
      if (result) {
        setError(result);
      } else {
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error updating display order: ", error);
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant={`default`}>Change Display Order</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Display Order</DialogTitle>
            <DialogDescription>
              Change the position of this image in the row of secondary images.
              Secondary images are displayed in ascending order (1, 2, 3...).
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-evenly md:justify-center md:gap-2">
              <Label htmlFor="position" className="hidden">
                Change display order
              </Label>
              <Input
                type="number"
                min={1}
                max={99}
                id="position"
                name="position"
                disabled={isLoading}
                className="w-fit"
              />
              <Button type="submit">
                <div className="flex justify-center items-center gap-2">
                  {isLoading ? (
                    <LoaderPinwheelIcon size={20} className="animate-spin" />
                  ) : (
                    <SaveIcon size={20} />
                  )}
                  <span>Save Changes</span>
                </div>
              </Button>
            </div>
            {error && (
              <p className="text-red-600 text-sm italic mt-1 text-center">
                {error}
              </p>
            )}
          </form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={`secondary`} disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChangeDisplayOrderButton;
