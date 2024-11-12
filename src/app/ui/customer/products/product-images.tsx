import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SecondaryImg from "./secondary-img";
import { fetchOneProductImages } from "@/lib/data/images/store/data";

interface ProductImagesProps {
  productId: string;
}
const ProductImages = async ({ productId }: ProductImagesProps) => {
  //   const testArr = Array.from({ length: 4 });

  const productImages = await fetchOneProductImages(productId);

  return (
    <>
      <ScrollArea className="h-fit md:h-80 w-screen md:w-fit md:min-w-32">
        <div className="flex md:flex-col mx-3 md:mx-0">
          {productImages.map((image, i) => (
            <SecondaryImg key={i} imageUrl={image.image_url} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
};

export default ProductImages;
