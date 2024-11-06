import PaginationWrapper from "@/app/ui/customer/pagination-wrapper";
import ProductsTable from "@/app/ui/dashboard/table/products-table";
import { montserrat } from "@/app/ui/fonts";
import ProductTableSkeleton from "@/app/ui/skeletons/product-table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { LinkIcon, LucideStar, LucideStarOff } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
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
      <div className="my-4 ml-4 text-sm">
        <p>
          Click the star button to
          <span className="inline-flex items-center ml-1">
            <span className="underline">add</span>
            <span className="mx-1 p-1 border border-zinc-400 rounded-md bg-zinc-200 dark:bg-zinc-700">
              <LucideStar size={18} />
            </span>
          </span>
          or
          <span className="inline-flex items-center ml-1">
            <span className="underline">remove</span>
            <span className="mx-1 p-1 border border-zinc-400 rounded-md bg-zinc-200 dark:bg-zinc-700">
              <LucideStarOff size={18} />
            </span>
          </span>
          items to/from your featured products, displayed on the homepage.
        </p>
        <p className="mt-3">
          Get an overview of all featured products
          <span className="inline-flex ml-1">
            <Link
              href="/dashboard/products/featured"
              className="text-blue-600 flex items-start"
            >
              here
              <LinkIcon size={12} className="ml-0.5" />
            </Link>
          </span>
        </p>
      </div>
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
