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
import { deleteSecondaryImage } from "@/lib/actions/images/actions";
import { LoaderPinwheelIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

interface DeleteImgButtonProps {
  imageId: string;
  imageUrl: string;
  productId: string;
}

const DeleteImgButton = ({
  imageId,
  imageUrl,
  productId,
}: DeleteImgButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setIsLoading(true);
    setError("");
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      await deleteSecondaryImage(imageUrl, imageId, productId);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error deleting image: ", error);
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={`destructive`}>Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are You Sure?</DialogTitle>
          <DialogDescription>
            This action will permanently delete the selected image. This can not
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={`secondary`} disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isLoading} onClick={handleDelete}>
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

export default DeleteImgButton;
