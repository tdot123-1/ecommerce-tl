import EditImagesSection from "@/app/ui/dashboard/images/edit-images-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Images",
};

const Page = ({ params }: { params: { productId: string } }) => {
  const { productId } = params;
  return (
    <div>
      <h1>Edit images for {productId}</h1>
      <EditImagesSection productId={productId} />
    </div>
  );
};

export default Page;
