import BreadCrumbComponent from "@/app/ui/customer/breadcrumbs";
import ProductList from "@/app/ui/customer/products/products-list";
import ProductListSkeleton from "@/app/ui/skeletons/products-list-skeleton";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import Link from "next/link";
import { Suspense } from "react";

const Page = ({ params }: { params: { category: string } }) => {
  const { category } = params;
  return (
    <>
      <div className="my-6">
        {/* <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/categories">Categories</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{category}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb> */}
        <BreadCrumbComponent previous="categories" category={category} />
      </div>
      <h1>Category page {category}</h1>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-16 my-10">
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList category={category} url_base="categories" url_path={`${category}`} />
        </Suspense>
      </section>
    </>
  );
};

export default Page;
