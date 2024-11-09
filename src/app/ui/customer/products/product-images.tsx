import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";

const ProductImages = () => {
  const testArr = Array.from({ length: 4 });
  return (
    <>
      <ScrollArea className="h-fit md:h-80 w-screen md:w-fit">
        <div className="flex md:flex-col mx-3 md:mx-0">
          {testArr.map((test, i) => (
            <div key={i} className="w-32 relative md:my-1 mx-1 md:mx-0">
              <AspectRatio ratio={8 / 9}>
                <Image
                  src={`/placeholder.png`}
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
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
};

export default ProductImages;
