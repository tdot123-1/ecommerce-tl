import EditFormSection from "@/app/ui/dashboard/forms/components/edit-form-section";
import { montserrat } from "@/app/ui/fonts";
import FormSkeleton from "@/app/ui/skeletons/product-form-skeleton";
import { Suspense } from "react";

const Page = ({ params }: { params: { productId: string } }) => {
  const { productId } = params;

  return (
    <>
      <h1 className={`${montserrat.className} text-xl font-semibold mt-4`}>
        Edit Product
      </h1>
      <section className="my-10 sm:w-1/2 sm:mx-auto">
        <Suspense fallback={<FormSkeleton />}>
          <EditFormSection productId={productId} />
        </Suspense>
      </section>
    </>
  );
};

export default Page;
