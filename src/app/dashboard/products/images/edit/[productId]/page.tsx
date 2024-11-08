import EditImagesSection from "@/app/ui/dashboard/images/edit-images-section";
import { montserrat } from "@/app/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Images",
};

const Page = ({ params }: { params: { productId: string } }) => {
  const { productId } = params;
  return (
    <>
      <h1 className={`${montserrat.className} text-xl font-semibold mt-4`}>Edit images</h1>
      <EditImagesSection productId={productId} />
    </>
  );
};

export default Page;
