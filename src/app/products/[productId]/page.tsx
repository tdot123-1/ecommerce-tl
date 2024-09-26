const Page = ({ params }: { params: { productId: string } }) => {
  console.log(params);
  return (
    <div>
      <h1>Product page</h1>
    </div>
  );
};

export default Page;
