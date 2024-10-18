import ProductsTable from "@/app/ui/dashboard/products-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

const Page = () => {
  return (
    <>
      <h1>Dashboard/Products</h1>
      <Suspense fallback={<Skeleton className="w-full h-96" />}>
        <ProductsTable />
      </Suspense>
    </>
  );
};

export default Page;
