
import { fetchActiveProducts, fetchProductsByCategory } from "@/lib/data/products/store/data";
import ProductCard from "./product-card";
import { notFound } from "next/navigation";

// optionally include category -> to either fetch all products or products by category
// url base / path -> to dynamically generate breadcrumbs depending on where the user
// navigated from

interface ProductListProps {
  currentPage: number;
  category?: string | undefined;
  url_base?: string | undefined;
  url_path?: string | undefined;
}

const ProductList = async ({
  category,
  url_base,
  url_path,
  currentPage,
}: ProductListProps) => {
  const allProducts = category
    ? await fetchProductsByCategory(category, currentPage)
    : await fetchActiveProducts(currentPage);

  if (!allProducts) {
    notFound();
  }

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
