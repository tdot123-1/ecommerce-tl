import BreadCrumbComponent from "@/app/ui/customer/breadcrumbs";
import PaginationWrapper from "@/app/ui/customer/pagination-wrapper";
import ProductList from "@/app/ui/customer/products/products-list";
import TagsDisplayWrapper from "@/app/ui/customer/tags/tags-display-wrapper";
import { montserrat } from "@/app/ui/fonts";
import ProductListSkeleton from "@/app/ui/skeletons/products-list-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { capitalize } from "@/lib/utils";
import { Suspense } from "react";

const Page = async ({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: Promise<{ page?: string; tags?: string }>;
}) => {
  const { category } = params;
  const resolvedSearchParams = await searchParams;

  const currentPage = Number(resolvedSearchParams?.page) || 1;

  const urlTags = resolvedSearchParams?.tags;

  let urlTagsArr;
  if (urlTags) {
    urlTagsArr = urlTags.split("-");
  }

  return (
    <>
      <div className="my-6">
        <BreadCrumbComponent />
      </div>
      <h1 className={`${montserrat.className} font-bold text-2xl`}>
        {capitalize(category)} Catalogue
      </h1>
      <Suspense fallback={<Skeleton className="h-10 w-20 rounded-md" />}>
        <TagsDisplayWrapper category={category} />
      </Suspense>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-16 my-10">
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList
            category={category}
            url_base="categories"
            url_path={`${encodeURIComponent(category)}`}
            currentPage={currentPage}
            tags={urlTagsArr}
          />
        </Suspense>
      </section>
      <Suspense fallback={<Skeleton className="h-10 w-2/5 mx-auto" />}>
        <PaginationWrapper category={category} tags={urlTagsArr} />
      </Suspense>
    </>
  );
};

export default Page;
