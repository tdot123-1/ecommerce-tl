import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ImageUpload from "../forms/components/image-upload";
import UploadSection from "./upload-section";
import Link from "next/link";
import { SearchIcon } from "lucide-react";
import { montserrat } from "../../fonts";

interface ImageObject {
  image_url: string;
  display_order: number;
  created_at: string;
}

interface EditImagesProps {
  name: string;
  image_url: string;
  productId: string;
  images: ImageObject[] | null;
}

const EditImages = ({
  name,
  image_url,
  productId,
  images,
}: EditImagesProps) => {
  return (
    <section>
      <div className="flex justify-center items-center p-4 gap-10 border-b border-zinc-300">
        <div className="w-40 relative">
          <AspectRatio ratio={8 / 9}>
            <Image
              src={image_url}
              alt={name}
              fill
              sizes="(max-width: 640px) 50vw, 
                            (max-width: 1024px) 30vw, 
                            (max-width: 1280px) 20vw, 
                            15vw"
              className="rounded-md"
            />
          </AspectRatio>
        </div>
        <h2 className={`${montserrat.className} text-xl font-semibold mt-4`}>{name}</h2>
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
          {images && images[0].image_url ? (
            images.map((image) => (
              <div
                key={image.image_url}
                className="flex flex-col md:flex-row items-center justify-evenly py-4 px-2 border-2 border-zinc-300 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 rounded-md"
              >
                <div className="">
                  <div className="w-20 relative mx-auto md:mx-0 mb-2">
                    <AspectRatio ratio={8 / 9}>
                      <Image
                        src={image.image_url}
                        alt={`additional image ${image.display_order}`}
                        fill
                        sizes="(max-width: 640px) 40vw, 
                            (max-width: 1024px) 20vw, 
                            (max-width: 1280px) 10vw, 
                            8vw"
                        className="rounded-md"
                      />
                    </AspectRatio>
                  </div>
                  <div className="text-sm">
                    <Link target="_blank" href={image.image_url} className="text-blue-600 font-semibold">
                      <div className="flex justify-start items-start gap-1">
                        Zoom in <SearchIcon size={12} />
                      </div>
                    </Link>
                    <p>
                      <span className="font-semibold">Display order:</span>{" "}
                      {image.display_order}
                    </p>
                    <p>
                      <span className="font-semibold">Created at:</span>{" "}
                      {new Date(image.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-2 md:mt-0">
                  <Button variant={`default`}>Change Display Order</Button>
                  <Button variant={`default`}>Set as Primary</Button>
                  <Button variant={`destructive`}>Delete</Button>
                </div>
              </div>
            ))
          ) : (
            <p>No additional images yet</p>
          )}
        </div>
        <UploadSection productId={productId} />
      </div>
    </section>
  );
};

export default EditImages;