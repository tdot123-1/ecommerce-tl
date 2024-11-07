import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ImageUpload from "../forms/components/image-upload";
import UploadSection from "./upload-section";

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
      <div>
        <div className="w-20 relative">
          <AspectRatio ratio={8 / 9}>
            <Image
              src={image_url}
              alt={name}
              fill
              sizes="(max-width: 640px) 40vw, 
                            (max-width: 1024px) 20vw, 
                            (max-width: 1280px) 10vw, 
                            8vw"
              className="rounded-md"
            />
          </AspectRatio>
        </div>
        <h2>{name}</h2>
      </div>
      <div>
        {images && images[0].image_url ? (
          images.map((image) => (
            <div key={image.image_url}>
              <div className="w-20 relative">
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
              <p>{`Display order: ${image.display_order}`}</p>
              <p>{`Created at: ${image.created_at}`}</p>
              <Button>Change Display Order</Button>
              <Button>Set as Primary</Button>
              <Button>Delete</Button>
            </div>
          ))
        ) : (
          <p>No additional images yet</p>
        )}
        <UploadSection productId={productId} />
      </div>
    </section>
  );
};

export default EditImages;
