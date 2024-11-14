import {
  fetchActiveProducts,
  fetchProductsByCategory,
} from "@/lib/data/products/store/data";
import ProductCard from "./product-card";
import { notFound } from "next/navigation";
import { fetchProductsByCategoryAndTags, fetchProductsByTags } from "@/lib/data/tags/store/data";

// optionally include category -> to either fetch all products or products by category
// url base / path -> to dynamically generate breadcrumbs depending on where the user
// navigated from

interface ProductListProps {
  currentPage: number;
  category?: string | undefined;
  tags?: string[];
  url_base?: string | undefined;
  url_path?: string | undefined;
}

const ProductList = async ({
  category,
  tags,
  url_base,
  url_path,
  currentPage,
}: ProductListProps) => {
  // const allProducts = category
  //   ? await fetchProductsByCategory(category, currentPage)
  //   : await fetchActiveProducts(currentPage);

  let allProducts;

  // determine the data-fetching function based on the provided filters
  if (category && tags && tags.length > 0) {
    // fetch products by both category and tags
    allProducts = await fetchProductsByCategoryAndTags(category, tags, currentPage);
  } else if (tags && tags.length > 0) {
    // fetch products by tags only
    allProducts = await fetchProductsByTags(tags, currentPage);
  } else if (category) {
    // fetch products by category only
    allProducts = await fetchProductsByCategory(category, currentPage);
  } else {
    // fetch all active products
    allProducts = await fetchActiveProducts(currentPage);
  }

  if (!allProducts || allProducts.length === 0) {
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
