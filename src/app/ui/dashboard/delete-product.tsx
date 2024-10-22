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
import { deleteProduct } from "@/lib/actions";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";

interface DeleteButtonProps {
  isActive: boolean;
  productId: string;
}

const DeleteButton = ({ isActive, productId }: DeleteButtonProps) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id: string) => {
    // set error state, loading state
    setIsLoading(true);
    setError("");

    // timeout preventing excessive clicks
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const result = await deleteProduct(id);

      // if no result, or message was not an empty string -> something went wrong
      if (!result || result.message) {
        setError("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error deleting product: ", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      // update loading state
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog>
        <div>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              className="p-2"
              disabled={isActive || isLoading}
            >
              <Trash2Icon size={24} />
            </Button>
          </DialogTrigger>
          {error && <p className="text-red-600 text-xs italic mt-1">{error}</p>}
        </div>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action will permanently delete this product. This can not be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center items-center gap-4">
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant="destructive"
                onClick={() => handleDelete(productId)}
              >
                Delete
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteButton;
