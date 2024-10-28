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
import { ExternalLinkIcon } from "lucide-react";

interface DeleteImageProps {
  imageUrl: string;
  setImageChange: React.Dispatch<React.SetStateAction<boolean>>;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
}

const DeleteImage = ({
  imageUrl,
  setImageChange,
  setImageUrl,
}: DeleteImageProps) => {
  const handleDelete = () => {
    // on delete -> set flag to true in parent component
    // set url to empty string in parent component
    setImageUrl("");
    setImageChange(true);
  };

  return (
    <div className="mb-4">
      <div className="mb-2">
        <p className="text-sm">Review current image</p>
        <div className="flex justify-start items-start gap-1 text-xs ml-4 mt-1 italic text-blue-600">
          <a target="_blank" href={imageUrl}>
            View image
          </a>
          <ExternalLinkIcon size={10} />
        </div>
      </div>
      <div>
        <p className="text-sm mb-2">*Delete current image to add a new image</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-4" variant="destructive">
              Delete Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action will permanently delete this image. This can not be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-center items-center gap-4">
              <DialogClose asChild>
                <Button>Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="destructive" onClick={() => handleDelete()}>
                  Delete
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DeleteImage;
