import ProductCard from "../ui/customer/product-card";

const Page = () => {

  const products = Array.from({length: 10})
  return (
    <>
      <h1>All Products</h1>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-16 mt-5">
        {
          products.map((_, index) => (
            <div key={index} className="flex justify-center">
              <ProductCard productId={index} />
            </div>
            
          ))
        }
      </section>
    </>
  );
};

export default Page;
