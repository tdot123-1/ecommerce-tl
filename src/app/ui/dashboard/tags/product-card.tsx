import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { EditIcon, TagIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardTagsProps {
  productId: string;
  imageUrl: string;
  name: string;
  tags: string[];
}

const ProductCardTags = ({
  productId,
  imageUrl,
  name,
  tags,
}: ProductCardTagsProps) => {
  return (
    <>
      <div className="border border-zinc-300 dark:border-zinc-600 rounded-lg p-4 relative bg-zinc-100 dark:bg-zinc-800">
        <div className="flex justify-center items-center gap-1 border-b border-b-zinc-300 dark:border-zinc-600 pb-1 mb-1">
          <div className="w-20 relative">
            <AspectRatio ratio={8 / 9}>
              <Image
                src={imageUrl}
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
            <Link href={`/dashboard/products/tags/edit/${productId}`}>
              <Button variant="ghost" className="p-2">
                <p className="hidden">Edit Tags</p>
                <EditIcon size={24} />
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <ScrollArea className="h-24">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {tags.length > 0 ? (
                tags.map((tagName, i) => (
                  <li key={`${tagName}-${i}`}>
                    <Badge className="w-fit">
                      <div className="flex justify-center gap-1">
                        {tagName} <TagIcon size={18} />
                      </div>
                    </Badge>
                  </li>
                ))
              ) : (
                <li className="text-sm text-zinc-600 dark:text-zinc-400 italic">
                  No tags yet.
                </li>
              )}
            </ul>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default ProductCardTags;
