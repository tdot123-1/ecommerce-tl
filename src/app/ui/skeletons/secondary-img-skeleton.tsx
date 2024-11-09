import { Skeleton } from "@/components/ui/skeleton";

const skeletons = Array.from({ length: 4 });

const SecondaryImgSkeleton = () => {
  return (
    <>
      <div className="h-fit md:h-80 w-screen md:w-fit">
        <div className="flex md:flex-col mx-3 md:mx-0">
          {skeletons.map((_, i) => (
            <Skeleton
              key={i}
              className="w-32 h-48 md:my-1 mx-1 md:mx-0"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SecondaryImgSkeleton;
