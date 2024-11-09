import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

interface SecondaryImgProps {
  imageUrl: string;
}

const SecondaryImg = ({ imageUrl }: SecondaryImgProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-32 relative md:my-1 mx-1 md:mx-0">
          <AspectRatio ratio={8 / 9}>
            <Image
              src={imageUrl}
              alt={`placeholder`}
              fill
              sizes="(max-width: 640px) 40vw, 
                    (max-width: 1024px) 20vw, 
                    (max-width: 1280px) 10vw, 
                    8vw"
              className="rounded-md"
            />
          </AspectRatio>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="hidden">Image enlarged</DialogTitle>
        <DialogDescription className="hidden">
          The selected product image enlarged
        </DialogDescription>
        <div className="w-full flex justify-center items-center">
          <div className="w-full  relative p-2">
            <AspectRatio ratio={8 / 9}>
              <Image
                src={imageUrl}
                alt={`placeholder`}
                fill
                sizes="(max-width: 640px) 80vw, 
                    (max-width: 1024px) 60vw, 
                    (max-width: 1280px) 50vw, 
                    40vw"
                className="rounded-md"
              />
            </AspectRatio>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SecondaryImg;
