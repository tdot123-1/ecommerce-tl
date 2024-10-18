import ProductsTable from "@/app/ui/dashboard/products-table";
import ProductTableSkeleton from "@/app/ui/skeletons/product-table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

const Page = () => {
  return (
    <>
      <h1>Dashboard/Products</h1>
      <div className="mt-5">
        <Suspense fallback={<ProductTableSkeleton />}>
          <ProductsTable />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
