import { fetchOneActiveProduct } from "@/lib/data";
import Image from "next/image";
import { montserrat } from "../../fonts";
import AddToBasket from "../basket/add-to-basket";
import { notFound } from "next/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { capitalize } from "@/lib/utils";
import { Product } from "@/lib/types";

interface ProductDetailsProps {
  productId: string;
}

const ProductDetails = async ({ productId }: ProductDetailsProps) => {
  const product = await fetchOneActiveProduct(productId);

  if (!product || !product.stripe_price_id || !product.stripe_product_id) {
    notFound();
  }

  return (
    <>
      <div className="w-72 sm:w-80 relative overflow-hidden">
        <AspectRatio ratio={4 / 3}>
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 80vw, 
                (max-width: 1024px) 33vw, 
                (max-width: 1280px) 25vw, 
                20vw"
            className="rounded-lg"
          />
        </AspectRatio>
      </div>
      <article className="w-48 flex flex-col gap-5 mb-8">
        <h2 className={`text-2xl ${montserrat.className} font-semibold`}>
          {capitalize(product.name)}
        </h2>
        <p className="text-sm">{product.description}</p>
        <p className="italic">{capitalize(product.category)}</p>
        <Badge className="w-fit text-md">€ {product.price / 100}</Badge>
        <AddToBasket
          product={product}
        />
      </article>
    </>
  );
};

export default ProductDetails;
