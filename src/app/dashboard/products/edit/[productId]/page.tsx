import EditFormSection from "@/app/ui/dashboard/edit-form-section";
import FormSkeleton from "@/app/ui/skeletons/product-form-skeleton";
import { Suspense } from "react";

const Page = ({ params }: { params: { productId: string } }) => {
  const { productId } = params;

  return (
    <>
      <h1>Edit Product</h1>
      <div>
        <Suspense fallback={<FormSkeleton />}>
            <EditFormSection productId={productId} />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
