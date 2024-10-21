import EditFormSection from "@/app/ui/dashboard/edit-form-section";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

const Page = ({ params }: { params: { productId: string } }) => {
  const { productId } = params;

  return (
    <>
      <h1>Edit Product</h1>
      <div>
        <Suspense fallback={<Skeleton className="w-60 h-80" />}>
            <EditFormSection productId={productId} />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
