import { fetchAllProductsImages } from "@/lib/data";
import ProductImagesCard from "./product-card";

interface ProductsGridProps {
  currentPage: number;
}

const ProductsGrid = async ({ currentPage }: ProductsGridProps) => {
  const allProducts = await fetchAllProductsImages(currentPage);

  return (
    <>
      {allProducts.map((product) => (
        <ProductImagesCard
          key={product.product_id}
          productId={product.product_id}
          name={product.product_name}
          image_url={product.product_image_url}
          images={product.additional_image_urls}
        />
      ))}
    </>
  );
};

export default ProductsGrid;
