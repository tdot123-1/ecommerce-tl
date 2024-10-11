import { fetchAllProducts } from "@/lib/data";
import ProductCard from "./product-card";

const ProductList = async () => {
  const allProducts = await fetchAllProducts();
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
          />
        </div>
      ))}
    </>
  );
};

export default ProductList;
