import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { fetchFeaturedProducts } from "@/lib/data/products/store/data";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const FeaturedProducts = async () => {
  const featured = await fetchFeaturedProducts();

  return (
    <div className="mx-auto w-full md:w-1/2">
      <h2 className="text-lg italic">Featured Products</h2>
      <ScrollArea className="max-w-full whitespace-nowrap ">
        <div className="flex w-max space-x-4 p-4">
          {featured.map((product) => (
            <Link
              key={product.id}
              href={`/products/${
                product.id
              }?base=products&path=&name=${encodeURIComponent(product.name)}`}
            >
              <div className="relative w-64 h-72 rounded-lg p-2 border border-zinc-400">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="rounded-lg object-cover"
                  sizes="(max-width: 640px) 50vw, 
                   (max-width: 1024px) 33vw, 
                   (max-width: 1280px) 25vw, 
                   20vw"
                />
                <Badge className="z-10 absolute">
                  {formatPrice(product.price)}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default FeaturedProducts;
