import { Skeleton } from "@/components/ui/skeleton";

const ProductTableSkeleton = () => {
  const rows = Array.from({ length: 8 });
  return (
    <>
      {rows.map((row, i) => (
        <Skeleton key={i} className="h-20 w-full mb-2" />
      ))}
    </>
  );
};

export default ProductTableSkeleton;
