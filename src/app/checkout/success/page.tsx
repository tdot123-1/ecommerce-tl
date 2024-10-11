import ClearCart from "@/app/ui/customer/checkout/clear-cart";
import { montserrat } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircleIcon } from "lucide-react";
import Link from "next/link";


const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10 mt-8">
      <h1 className={`${montserrat.className} text-2xl font-semibold`}>
        Payment Success
      </h1>
      <div className="p-8 border bg-zinc-100 dark:bg-zinc-800 border-zinc-400 shadow-md rounded-md w-11/12 md:w-96 flex flex-col gap-6 justify-center items-center">
        <ClearCart />
        <p>
          A receipt has been sent to your email address, your delivery will
          arrive in 1-2 weeks
        </p>
        <Link href="/products">
          <Button>
            <div className="flex justify-center gap-2 items-center">
              <span>Continue Shopping</span>
              <ArrowLeftCircleIcon />
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
