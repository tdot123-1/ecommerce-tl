import { Skeleton } from "@/components/ui/skeleton";

const DetailsSkeleton = () => {
  return (
    <>
      <div>
        <Skeleton className="w-72 sm:w-80 h-80 rounded-lg" />
      </div>
      <div className="w-32"></div>
      <div className="w-48 flex flex-col gap-5 mb-8">
        <Skeleton className="w-48 h-8" />
        <Skeleton className="w-48 h-5" />
        <Skeleton className="w-48 h-5" />
        <Skeleton className="w-24 h-5" />
        <Skeleton className="w-48 h-8" />
        <div className="flex justify-center items-center gap-4">
          <Skeleton className="w-20 h-8" />
          <Skeleton className="w-20 h-8" />
        </div>
      </div>
    </>
  );
};

export default DetailsSkeleton;
