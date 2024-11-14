import EditTagsSection from "@/app/ui/dashboard/tags/edit-tags-section";
import { montserrat } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Edit Tags",
};

const Page = ({ params }: { params: { productId: string } }) => {
  const { productId } = params;

  return (
    <>
      <h1 className={`${montserrat.className} text-xl font-semibold mt-4`}>
        Edit Tags
      </h1>
      <Link href={`/dashboard/products/tags`}>
        <Button variant={`ghost`} className="p-2 mt-4">
          <p className="hidden">Return to tags overview</p>
          <ArrowLeftCircle size={24} />
        </Button>
      </Link>
      <EditTagsSection productId={productId} />
    </>
  );
};

export default Page;
