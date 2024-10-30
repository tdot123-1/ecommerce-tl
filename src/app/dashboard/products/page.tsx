import PaginationWrapper from "@/app/ui/customer/pagination-wrapper";
import ProductsTable from "@/app/ui/dashboard/table/products-table";
import { montserrat } from "@/app/ui/fonts";
import ProductTableSkeleton from "@/app/ui/skeletons/product-table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Products",
};

const Page = async (props: { searchParams?: Promise<{ page?: string }> }) => {
  const searchParams = await props.searchParams;

  const currentPage = Math.max(1, Number(searchParams?.page) || 1);

  return (
    <>
      <h1 className={`${montserrat.className} text-xl font-semibold mt-4`}>
        Products Overview
      </h1>
      <div className="mt-5">
        <Suspense fallback={<ProductTableSkeleton />}>
          <ProductsTable currentPage={currentPage} />
        </Suspense>
      </div>
      <Suspense fallback={<Skeleton className="h-10 w-2/5 mx-auto" />}>
        <PaginationWrapper dashboard />
      </Suspense>
    </>
  );
};

export default Page;
