import PaginationWrapper from "@/app/ui/customer/pagination-wrapper";
import ProductList from "@/app/ui/customer/products/products-list";
import TagsDisplayWrapper from "@/app/ui/customer/tags/tags-display-wrapper";
import { montserrat } from "@/app/ui/fonts";
import ProductListSkeleton from "@/app/ui/skeletons/products-list-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Catalogue",
};

const Page = async (props: { searchParams?: Promise<{ page?: string, tags?: string }> }) => {
  const searchParams = await props.searchParams;

  const currentPage = Math.max(1, Number(searchParams?.page) || 1);
  const urlTags = searchParams?.tags

  let urlTagsArr;
  if (urlTags) {
    urlTagsArr = urlTags.split("-")
  }

  return (
    <>
      <h1 className={`${montserrat.className} font-bold text-2xl mt-6`}>
        Full Catalogue
      </h1>
      <Suspense fallback={<Skeleton className="h-10 w-20 rounded-md" />}>
        <TagsDisplayWrapper />
      </Suspense>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-16 my-10">
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList url_base="products" currentPage={currentPage} tags={urlTagsArr} />
        </Suspense>
      </section>
      <Suspense fallback={<Skeleton className="h-10 w-2/5 mx-auto" />}>
        <PaginationWrapper tags={urlTagsArr} />
      </Suspense>
    </>
  );
};

export default Page;
