import Image from "next/image";
import { montserrat } from "../../fonts";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { capitalize, formatPrice } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  sizes: string;
  //description: string;
  category: string;
  image_url: string;
  //is_active: boolean;
  url_base?: string | undefined;
  url_path?: string | undefined;
}

const ProductCard = ({
  id,
  name,
  price,
  category,
  image_url,
  url_base,
  url_path,
}: ProductCardProps) => {
  // optionally include base && path search params to dynamically change breadcrumbs
  // based on where user navigated from
  return (
    <div className="border border-zinc-500 rounded-lg shadow-xl w-full max-w-60 flex flex-col bg-zinc-200 dark:bg-zinc-800 hover:cursor-pointer">
      <Link
        href={`/products/${id}?base=${encodeURIComponent(
          url_base || ""
        )}&path=${encodeURIComponent(url_path || "")}&name=${encodeURIComponent(
          name
        )}`}
      >
        <div className="w-full relative rounded-lg overflow-hidden">
          <AspectRatio className="mx-1 mt-1" ratio={7 / 8}>
            <Image
              src={image_url}
              alt={name}
              fill
              sizes="(max-width: 640px) 50vw, 
                   (max-width: 1024px) 33vw, 
                   (max-width: 1280px) 25vw, 
                   20vw"
              className="rounded-lg"
            />
          </AspectRatio>
        </div>
        <div className="px-5 py-3 text-center">
          <h2
            className={`text-md md:text-xl font-semibold text-nowrap ${montserrat.className}`}
          >
            {capitalize(name)}
          </h2>
          <p className="text-sm italic">{capitalize(category)}</p>
          <Badge className="text-md mt-4">{formatPrice(price)}</Badge>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
