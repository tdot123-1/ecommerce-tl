import PaginationWrapper from "@/app/ui/customer/pagination-wrapper";
import ProductsGridTags from "@/app/ui/dashboard/tags/products-grid";
import { montserrat } from "@/app/ui/fonts";
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
      <h1 className={`${montserrat.className} text-xl font-semibold mt-4`}>
        Product Tags
      </h1>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10">
        {/* grid of item cards */}
        <ProductsGridTags currentPage={currentPage} />
      </section>
      <Suspense fallback={<Skeleton className="h-10 w-2/5 mx-auto" />}>
        <PaginationWrapper dashboard />
      </Suspense>
    </>
  );
};

export default Page;
