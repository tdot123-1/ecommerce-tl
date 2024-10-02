import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <>
      <Skeleton className="rounded-lg w-60 h-64 md:h-72 lg:h-80" />
    </>
  );
};

export default ProductCardSkeleton;
