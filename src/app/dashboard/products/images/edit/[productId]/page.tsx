import EditImagesSection from "@/app/ui/dashboard/images/edit-images-section";
import { montserrat } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Edit Images",
};

const Page = ({ params }: { params: { productId: string } }) => {
  const { productId } = params;
  return (
    <>
      <h1 className={`${montserrat.className} text-xl font-semibold mt-4`}>
        Edit images
      </h1>
      <Link href={`/dashboard/products/images`}>
        <Button variant={`ghost`} className="p-2 mt-4">
          <p className="hidden">Return to product images</p>
          <ArrowLeftCircle size={24} />
        </Button>
      </Link>

      <EditImagesSection productId={productId} />
    </>
  );
};

export default Page;
