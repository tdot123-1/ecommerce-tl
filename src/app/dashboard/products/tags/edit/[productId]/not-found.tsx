import { montserrat } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
import { FrownIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found",
};

const NotFound = () => {
  return (
    <div className="h-[calc(100vh-150px)] flex flex-col justify-center items-center gap-3">
      <FrownIcon size={32} />
      <h2 className={`${montserrat.className} text-2xl font-semibold`}>
        404 Not Found
      </h2>
      <p>Could not find this product.</p>
      <Link href="/dashboard/products/tags">
        <Button>Go Back</Button>
      </Link>
    </div>
  );
};

export default NotFound;