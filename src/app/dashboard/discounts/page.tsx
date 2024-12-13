import CouponsOverview from "@/app/ui/dashboard/discounts/coupons/coupons-overview";
import { montserrat } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <h1 className={`${montserrat.className} text-xl font-semibold mt-4`}>
        Discounts Overview
      </h1>
      <div className="mx-auto w-fit">
        <Link href="/dashboard/discounts/coupons/create">
          <Button variant="outline" className="p-2">
            <div className="flex justify-center items-center gap-1 font-semibold">
              <PlusCircleIcon size={24} />
              Create Coupon
            </div>
          </Button>
        </Link>
      </div>
      <CouponsOverview />
      
    </>
  );
};

export default Page;
