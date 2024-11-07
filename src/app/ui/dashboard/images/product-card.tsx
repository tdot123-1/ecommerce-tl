import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { EditIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


interface ProductImagesCardProps {
  productId: string;
  image_url: string;
  name: string;
  images: string[];
}

const ProductImagesCard = ({
  productId,
  image_url,
  name,
  images,
}: ProductImagesCardProps) => {
  const validImages = images.filter((url) => url !== null);

  return (
    <div className="border border-zinc-300 dark:border-zinc-600 rounded-lg p-4 relative bg-zinc-100 dark:bg-zinc-800">
      <div className="flex justify-center items-center gap-1 border-b border-b-zinc-300 dark:border-zinc-600 pb-1 mb-1">
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
        <h2 className="font-semibold">{name}</h2>
        <div className="absolute top-2 right-2 ">
          <Link href={`/dashboard/products/images/edit/${productId}`}>
            <Button variant="ghost" className="p-2">
              <p className="hidden">Edit images</p>
              <EditIcon size={24} />
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <ul>
          {validImages.length > 0 ? (
            validImages.map((url, i) => (
              <li className="text-blue-600 text-sm" key={url}>
                <Link target="_blank" href={url}>
                  <div className="flex justify-start items-start gap-1">
                    {`Image ${i + 1}`}
                    <SearchIcon size={12} />
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li className="text-sm text-zinc-600 dark:text-zinc-400 italic">
              No additional images
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductImagesCard;
