import Image from "next/image";
import { montserrat } from "../../fonts";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

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
        <div className="w-fit self-center pt-1 px-1">
          <Image
            src={image_url}
            alt={name}
            width={2400}
            height={2400}
            className="rounded-lg"
          />
        </div>
        <div className="px-5 py-3 text-center">
          <h2 className={`text-xl font-semibold ${montserrat.className}`}>
            {name}
          </h2>
          <p className="text-sm italic">
            <span>{category}</span>
          </p>
          <Badge className="text-md mt-4">€ {price / 100}</Badge>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;