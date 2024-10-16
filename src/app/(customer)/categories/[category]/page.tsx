import BreadCrumbComponent from "@/app/ui/customer/breadcrumbs";
import ProductList from "@/app/ui/customer/products/products-list";
import { montserrat } from "@/app/ui/fonts";
import ProductListSkeleton from "@/app/ui/skeletons/products-list-skeleton";
import { Suspense } from "react";

const Page = ({ params }: { params: { category: string } }) => {
  const { category } = params;
  return (
    <>
      <div className="my-6">
        <BreadCrumbComponent />
      </div>
      <h1 className={`${montserrat.className} font-bold text-2xl`}>{category[0].toUpperCase() + category.slice(1)} Catalogue</h1>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-16 my-10">
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList category={category} url_base="categories" url_path={`${category}`} />
        </Suspense>
      </section>
    </>
  );
};

export default Page;
