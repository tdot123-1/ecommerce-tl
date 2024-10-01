const Page = ({ params }: { params: { category: string } }) => {
  const { category } = params
  return <h1>Category page {category} </h1>;
};

export default Page;
