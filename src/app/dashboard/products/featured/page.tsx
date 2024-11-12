import FeaturedTable from "@/app/ui/dashboard/featured/featured-table";
import { montserrat } from "@/app/ui/fonts";
import ProductTableSkeleton from "@/app/ui/skeletons/product-table-skeleton";
import { Button } from "@/components/ui/button";
import { LucideStar } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Featured",
};

const Page = () => {
  return (
    <div>
      <h1 className={`${montserrat.className} text-xl font-semibold mt-4`}>
        Featured Products
      </h1>
      <div className="w-full">
        <p className="text-sm my-4 ml-4">
          Your top 6 featured products will be displayed on the homepage
        </p>
        <div className="mx-auto w-fit">
          <Link href="/dashboard/products">
            <Button variant="outline" className="p-2">
              <div className="flex justify-center items-center gap-1 font-semibold">
                Add Items
                <LucideStar size={24} />
              </div>
            </Button>
          </Link>
        </div>
      </div>
      <div className="my-5">
        <Suspense fallback={<ProductTableSkeleton />}>
          <FeaturedTable />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
