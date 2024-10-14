import AddToBasket from "@/app/ui/customer/basket/add-to-basket";
import { montserrat } from "@/app/ui/fonts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { fetchOneProduct } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: { productId: string } }) => {
  console.log(params);
  const { productId } = params;

  const product = await fetchOneProduct(productId);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <div className="mt-6 mb-4 md:mb-0">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/products">Catalogue</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <section className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="flex flex-col gap-8 items-center md:flex-row">
          <div className="w-72 sm:w-80">
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
          </article>
        </div>
      </section>
    </div>
  );
};

export default Page;
