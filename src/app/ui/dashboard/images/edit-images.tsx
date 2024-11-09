import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import UploadSection from "./upload-section";
import Link from "next/link";
import { SearchIcon } from "lucide-react";
import { montserrat } from "../../fonts";
import ScrollToUploadButton from "./scroll-to-upload-btn";
import ChangeDisplayOrderButton from "./change-display-btn";
import SetPrimaryImage from "./set-primary-image";
import DeleteImgButton from "./delete-image-btn";

interface ImageObject {
  image_id: string;
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
    <>
      <div className="flex justify-center items-center p-4 gap-10">
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
        <h2 className={`${montserrat.className} text-xl font-semibold mt-4`}>
          {name}
        </h2>
      </div>
      <div className="border-b border-zinc-300 text-sm italic text-zinc-400 dark:border-zinc-600">
        Secondary images
      </div>
      <div className="flex justify-end my-4">
        <ScrollToUploadButton />
      </div>
      <div className="mb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 border-b border-zinc-300 dark:border-zinc-600 pb-10">
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
                    <Link
                      target="_blank"
                      href={image.image_url}
                      className="text-blue-600 font-semibold"
                    >
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
                  <ChangeDisplayOrderButton
                    productId={productId}
                    imageId={image.image_id}
                  />
                  <SetPrimaryImage
                    primaryUrl={image_url}
                    secondaryUrl={image.image_url}
                    productId={productId}
                    imageId={image.image_id}
                  />
                  <DeleteImgButton
                    imageId={image.image_id}
                    productId={productId}
                    imageUrl={image.image_url}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No additional images yet</p>
          )}
        </div>
        <div className="md:w-fit mx-auto">
          <h3 className="text-lg mb-4 underline">Add Secondary Images</h3>
          <UploadSection productId={productId} />
        </div>
      </div>
    </>
  );
};

export default EditImages;
