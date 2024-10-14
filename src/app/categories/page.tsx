import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { categories } from "@/lib/categories";
import CategoryCard from "../ui/customer/categories/category-card";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <div className="h-[calc(100vh-150px)] flex items-center justify-center">
        <Carousel className="w-4/5 md:w-3/5 lg:w-2/5 mx-auto">
          <CarouselContent>
            {categories.map((category) => (
              <CarouselItem key={category.title}>
                <Link href={`categories/${category.title}`}>
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
