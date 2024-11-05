import FeaturedTable from "@/app/ui/dashboard/featured/featured-table";
import ProductTableSkeleton from "@/app/ui/skeletons/product-table-skeleton";
import { Suspense } from "react";

const Page = () => {
  return (
    <div>
      <h1>Featured Products</h1>
      <Suspense fallback={<ProductTableSkeleton />}>
        <FeaturedTable />
      </Suspense>
    </div>
  );
};

export default Page;
