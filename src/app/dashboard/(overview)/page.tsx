import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowBigRight, PlusSquareIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-5 mt-10 md:mt-20">
        <Card className="min-w-full md:min-w-fit">
          <CardHeader>
            <CardTitle>Products Overview</CardTitle>
            <CardDescription>
              Get a quick overview of all added products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/products">
              <div className="flex justify-center items-center gap-1">
                <span className="italic underline">To products overview</span>{" "}
                <ArrowBigRight size={24} />
              </div>
            </Link>
          </CardContent>
        </Card>
        <Card className="min-w-full md:min-w-fit">
          <CardHeader>
            <CardTitle>Create Product</CardTitle>
            <CardDescription>
              Add a new product to the catalogue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/products/create">
              <div className="flex justify-center items-center gap-1">
                <span className="italic underline">Add new product</span>{" "}
                <PlusSquareIcon size={24} />
              </div>
            </Link>
          </CardContent>
        </Card>
        <Card className="min-w-full md:min-w-fit">
          <CardHeader>
            <CardTitle>Featured Products</CardTitle>
            <CardDescription>
              Review and update your list of featured products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/products/featured">
              <div className="flex justify-center items-center gap-1">
                <span className="italic underline">To featured products</span>{" "}
                <ArrowBigRight size={24} />
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
