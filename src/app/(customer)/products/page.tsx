import ProductList from "@/app/ui/customer/products/products-list";
import { montserrat } from "@/app/ui/fonts";
import ProductListSkeleton from "@/app/ui/skeletons/products-list-skeleton";
import { Suspense } from "react";


const Page = () => {
  return (
    <>
    <h1 className={`${montserrat.className} font-bold text-2xl mt-6`}>Full Catalogue</h1>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-16 my-10">
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList url_base="products" />
        </Suspense>
      </section>
    </>
  );
};

export default Page;
