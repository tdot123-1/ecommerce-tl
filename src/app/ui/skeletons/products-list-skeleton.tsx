import ProductCardSkeleton from "./product-card-skeleton";

const ProductListSkeleton = () => {
  const cards = Array.from({ length: 8 });
  return (
    <>
      {cards.map((card, index) => (
        <div key={index} className="flex justify-center">
          <ProductCardSkeleton />
        </div>
      ))}
    </>
  );
};

export default ProductListSkeleton;
