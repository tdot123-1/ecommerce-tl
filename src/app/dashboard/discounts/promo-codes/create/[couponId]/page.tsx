import Form from "@/app/ui/dashboard/discounts/forms/create-promo-code";
import { montserrat } from "@/app/ui/fonts";

const Page = () => {
  return (
    <>
      <h1 className={`${montserrat.className} text-xl font-semibold mt-4`}>
        Create Coupon
      </h1>
      <section className="my-10 sm:w-1/2 sm:mx-auto">
        <Form />
      </section>
    </>
  );
};

export default Page;
