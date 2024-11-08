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
import { swapPrimaryImage } from "@/lib/actions";
import { ImagePlusIcon, LoaderPinwheelIcon } from "lucide-react";
import { useState } from "react";

interface SetPrimaryImageProps {
  primaryUrl: string;
  secondaryUrl: string;
  productId: string;
  imageId: string;
}

const SetPrimaryImage = ({
  primaryUrl,
  secondaryUrl,
  productId,
  imageId,
}: SetPrimaryImageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSwapPrimary = async () => {
    setError("");
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const result = await swapPrimaryImage(
        productId,
        imageId,
        primaryUrl,
        secondaryUrl
      );

      if (result.message) {
        setError(result.message);
      } else {
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error swapping primary image: ", error);
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant={`default`}>Set as Primary</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Primary Image?</DialogTitle>
            <DialogDescription>
              This action will replace the current primary image with this
              image. The primary image is the first image that visitors see in
              the product list.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={`secondary`} disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleSwapPrimary} disabled={isLoading}>
              <div className="flex justify-center items-center gap-2">
                {isLoading ? (
                  <LoaderPinwheelIcon size={20} className="animate-spin" />
                ) : (
                  <ImagePlusIcon size={20} />
                )}
                <span>Proceed</span>
              </div>
            </Button>
          </DialogFooter>
          <p className="text-red-600 text-sm italic mt-1 text-center">
            {error}
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SetPrimaryImage;
