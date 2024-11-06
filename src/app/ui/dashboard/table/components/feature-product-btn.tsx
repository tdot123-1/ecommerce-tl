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
import { toggleFeaturedProduct } from "@/lib/actions";
import { LucideStar, LucideStarOff } from "lucide-react";
import { useState } from "react";

interface FeatureButtonProps {
  isFeatured: boolean;
  isActive: boolean;
  productId: string;
}

const FeatureButton = ({
  isFeatured,
  isActive,
  productId,
}: FeatureButtonProps) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async (id: string, featured: boolean, active: boolean) => {
    // set error state, loading state
    setIsLoading(true);
    setError("");

    // timeout preventing excessive clicks
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      await toggleFeaturedProduct(id, featured, active);
    } catch (error) {
      console.error("Error toggling product: ", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Dialog>
        <div>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="p-2"
              disabled={isLoading || !isActive}
            >
              <p className="hidden">Toggle Featured</p>
              {isFeatured ? (
                <LucideStarOff size={24} />
              ) : (
                <LucideStar size={24} />
              )}
            </Button>
          </DialogTrigger>
          {error && <p className="text-red-600 text-xs italic mt-1">{error}</p>}
        </div>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isFeatured ? <>Remove From Featured?</> : <>Add To Featured?</>}
            </DialogTitle>
            <DialogDescription>
              {isFeatured ? (
                <>
                  This action will remove the product from your list of featured
                  products displayed on the home page.
                </>
              ) : (
                <>
                  This action will add the product to your list of featured
                  products displayed on the home page.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center items-center gap-4">
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant="default"
                onClick={() => handleToggle(productId, isFeatured, isActive)}
              >
                Proceed
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FeatureButton;
