import { Suspense } from "react";
import ProductList from "../ui/customer/products-list";
import ProductListSkeleton from "../ui/skeletons/products-list-skeleton";

const Page = () => {
  return (
    <>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-16 my-10">
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList />
        </Suspense>
      </section>
    </>
  );
};

export default Page;
