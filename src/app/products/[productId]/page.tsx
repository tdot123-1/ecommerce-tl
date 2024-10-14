import BreadCrumbComponent from "@/app/ui/customer/breadcrumbs";
import ProductDetails from "@/app/ui/customer/products/product-details";

import DetailsSkeleton from "@/app/ui/skeletons/product-details-skeleton";
import { Suspense } from "react";

const Page = async ({ params }: { params: { productId: string } }) => {
  console.log(params);
  const { productId } = params;

  return (
    <div>
      <div className="mt-6 mb-4 md:mb-0">
        <BreadCrumbComponent previous="products" />
      </div>
      <section className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="flex flex-col gap-8 items-center md:flex-row">
          <Suspense fallback={<DetailsSkeleton />}>
            <ProductDetails productId={productId} />
            {/* <div className="w-72 sm:w-80">
              <Image
                src={product.image_url}
                alt={product.name}
                width={2400}
                height={2400}
                className="rounded-lg"
              />
            </div>
            <article className="w-48 flex flex-col gap-5 mb-8">
              <h2 className={`text-2xl ${montserrat.className} font-semibold`}>
                {product.name}
              </h2>
              <p>{product.description}</p>
              <p>{product.category}</p>
              <p>€ {product.price / 100}</p>
              <AddToBasket
                id={productId}
                name={product.name}
                price={product.price}
                currency={product.currency}
                description={product.description}
                image={product.image_url}
                stripe_price_id={product.stripe_price_id}
                sizes={product.sizes}
              />
            </article> */}
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default Page;
