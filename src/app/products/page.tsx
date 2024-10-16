import { Suspense } from "react";
import ProductList from "../ui/customer/products/products-list";
import ProductListSkeleton from "../ui/skeletons/products-list-skeleton";
import { montserrat } from "../ui/fonts";

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
