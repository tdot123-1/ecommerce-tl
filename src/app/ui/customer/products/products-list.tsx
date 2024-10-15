import { fetchAllProducts, fetchProductsByCategory } from "@/lib/data";
import ProductCard from "./product-card";
import { notFound } from "next/navigation";

interface ProductListProps {
  category?: string | undefined;
  url_base?: string | undefined;
  url_path?: string | undefined;
}

const ProductList = async ({ category, url_base, url_path }: ProductListProps) => {
  const allProducts = category
    ? await fetchProductsByCategory(category)
    : await fetchAllProducts();

  if (!allProducts) {
    notFound();
  }

  //const allProducts = await fetchAllProducts();
  return (
    <>
      {allProducts.map((product) => (
        <div key={product.id} className="flex justify-center">
          <ProductCard
            id={product.id}
            name={product.name}
            price={product.price}
            sizes={product.sizes}
            category={product.category}
            image_url={product.image_url}
            url_base={url_base}
            url_path={url_path}
          />
        </div>
      ))}
    </>
  );
};

export default ProductList;
