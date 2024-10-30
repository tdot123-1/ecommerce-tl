import CategoryCard from "@/app/ui/customer/categories/category-card";
import { montserrat } from "@/app/ui/fonts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { categories } from "@/lib/categories";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Categories",
};

const Page = () => {
  return (
    <>
      <h1 className={`${montserrat.className} font-bold text-2xl mt-6`}>
        Browse Categories
      </h1>
      <div className="h-[calc(100vh-150px)] flex items-center justify-center">
        <Carousel className="w-4/5 md:w-3/5 lg:w-2/5 mx-auto">
          <CarouselContent>
            {categories.map((category) => (
              <CarouselItem key={category.title}>
                {/* include category name to search params to dynamically create breadcrumbs */}
                <Link
                  href={`categories/${
                    category.title
                  }?base=categories&path=${encodeURIComponent(category.title)}`}
                >
                  <CategoryCard
                    title={category.title}
                    description={category.description}
                    image_url={category.image_url}
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default Page;
