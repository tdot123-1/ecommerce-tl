import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Page = () => {
  return (
    <>
      <h1>All Categories</h1>
      <Carousel className="w-full max-w-xs mx-auto">
        <CarouselContent>
          <CarouselItem>
            <div className="p-4 border-2 border-zinc-500 h-48">Category 1</div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-4 border-2 border-zinc-500 h-48">Category 2</div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-4 border-2 border-zinc-500 h-48">Category 3</div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default Page;
