import ProductsTable from "@/app/ui/dashboard/table/products-table";
import { montserrat } from "@/app/ui/fonts";
import ProductTableSkeleton from "@/app/ui/skeletons/product-table-skeleton";
import { Suspense } from "react";

const Page = () => {
  return (
    <>
      <h1 className={`${montserrat.className} text-xl font-semibold mt-4`}>
        Products Overview
      </h1>
      <div className="mt-5">
        <Suspense fallback={<ProductTableSkeleton />}>
          <ProductsTable />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
