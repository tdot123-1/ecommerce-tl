import BreadCrumbComponent from "@/app/ui/customer/breadcrumbs";
import ProductDetails from "@/app/ui/customer/products/product-details";

import DetailsSkeleton from "@/app/ui/skeletons/product-details-skeleton";
import { Suspense } from "react";

const Page = ({ params }: { params: { productId: string } }) => {
  console.log(params);
  const { productId } = params;

  return (
    <div>
      <div className="mt-6 mb-4 md:mb-0">
        <BreadCrumbComponent />
      </div>
      <section className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="flex flex-col gap-8 items-center md:flex-row">
          <Suspense fallback={<DetailsSkeleton />}>
            <ProductDetails productId={productId} />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default Page;
