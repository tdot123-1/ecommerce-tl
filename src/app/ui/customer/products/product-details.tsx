import { fetchOneProduct } from "@/lib/data";
import Image from "next/image";
import { montserrat } from "../../fonts";
import AddToBasket from "../basket/add-to-basket";
import { notFound } from "next/navigation";

interface ProductDetailsProps {
  productId: string;
}

const ProductDetails = async ({ productId }: ProductDetailsProps) => {

  const product = await fetchOneProduct(productId);

  if (!product) {
    notFound();
  }

  return (
    <>
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
    </>
  );
};

export default ProductDetails;
