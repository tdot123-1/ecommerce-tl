import Form from "@/app/ui/dashboard/forms/create-product";
import { montserrat } from "@/app/ui/fonts";

const Page = () => {
  return (
    <>
      <h1 className={`${montserrat.className} text-xl font-semibold mt-4`}>
        Create Product
      </h1>
      <section className="my-10 sm:w-1/2 sm:mx-auto">
        <Form />
      </section>
    </>
  );
};

export default Page;
