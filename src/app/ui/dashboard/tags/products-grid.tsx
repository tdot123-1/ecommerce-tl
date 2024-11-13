import { fetchAllProductsAndTagsDashboard } from "@/lib/data/tags/dashboard/data";
import ProductCardTags from "./product-card";

interface ProductsGridTagsProps {
  currentPage: number;
}

const ProductsGridTags = async ({ currentPage }: ProductsGridTagsProps) => {
  const allProducts = await fetchAllProductsAndTagsDashboard(currentPage);

  return (
    <>
      {allProducts &&
        allProducts.map((product) => (
          <ProductCardTags
            key={product.id}
            productId={product.id}
            name={product.name}
            imageUrl={product.image_url}
            tags={product.tags}
          />
        ))}
    </>
  );
};

export default ProductsGridTags;
