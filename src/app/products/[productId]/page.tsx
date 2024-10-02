import { montserrat } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
import { fetchOneProduct } from "@/lib/data";
import Image from "next/image";
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
      <h1>Product page</h1>
      <section className="flex flex-col justify-center items-center h-[calc(100vh-80px)]">
        <div className="flex flex-col md:flex-row">
          <div className="w-80">
            <Image
              src={product.image_url}
              alt={product.name}
              width={2400}
              height={2400}
              className="rounded-lg"
            />
          </div>
          <article className="w-48">
            <h2 className={`text-2xl ${montserrat.className} font-semibold`}>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.sizes}</p>
            <p>{product.category}</p>
            <p> $ {product.price / 100}</p>
          </article>
        </div>
        <div className="flex justify-center gap-8">
          <Button>Buy Now!</Button>
          <Button>Add to Cart</Button>
        </div>
      </section>
    </div>
  );
};

export default Page;
