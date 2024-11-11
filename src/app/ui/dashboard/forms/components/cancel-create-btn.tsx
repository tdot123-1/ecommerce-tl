"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { deleteImageFromStore } from "@/lib/actions";
import { useRouter } from "next/navigation";

interface CancelButtonProps {
  imageUrl: string;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CancelButton = ({
  imageUrl,
  isLoading,
  setIsLoading,
}: CancelButtonProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleCancel = async () => {
    setIsLoading(true);

    // if an image has been uploaded and then operation is cancelled -> delete uploaded image
    if (imageUrl) {
      try {
        await deleteImageFromStore(imageUrl);
      } catch (error) {
        console.error("Error deleting uploaded image: ", error);
        toast({
          title: "Warning!",
          description: "Failed to delete image from storage.",
          variant: "destructive",
        });
      }
    }

    setIsLoading(false);
    router.push("/dashboard/products");
  };

  return (
    <>
      <Button
        type="button"
        onClick={handleCancel}
        disabled={isLoading}
        variant={`secondary`}
      >
        Cancel
      </Button>
    </>
  );
};

export default CancelButton;
