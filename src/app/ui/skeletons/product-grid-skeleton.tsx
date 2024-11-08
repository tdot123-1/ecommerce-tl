import { Skeleton } from "@/components/ui/skeleton";

const ProductGridSkeleton = () => {
  const cards = Array.from({ length: 8 });
  return (
    <>
      {cards.map((_, index) => (
        <Skeleton key={index} className="w-full h-52" />
      ))}
    </>
  );
};

export default ProductGridSkeleton;
