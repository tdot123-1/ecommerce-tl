import PaginationWrapper from "@/app/ui/customer/pagination-wrapper";
import ProductsGrid from "@/app/ui/dashboard/images/products-grid";
import ProductGridSkeleton from "@/app/ui/skeletons/product-grid-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Product Images",
};

const Page = async (props: { searchParams?: Promise<{ page?: string }> }) => {
  const searchParams = await props.searchParams;

  const currentPage = Math.max(1, Number(searchParams?.page) || 1);

  return (
    <>
      <h1>Product Images</h1>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10">
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductsGrid currentPage={currentPage} />
        </Suspense>
      </section>

      <Suspense fallback={<Skeleton className="h-10 w-2/5 mx-auto" />}>
        <PaginationWrapper dashboard />
      </Suspense>
    </>
  );
};

export default Page;
