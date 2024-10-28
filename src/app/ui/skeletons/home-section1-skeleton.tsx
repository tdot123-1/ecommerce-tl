import { Skeleton } from "@/components/ui/skeleton";

const HomeSection1Skeleton = () => {
  return (
    <>
      <div className="w-60">
        <Skeleton className="w-full h-96" />
      </div>
      <div className="hidden md:block w-1/2">
        <Skeleton className="w-full h-96" />
      </div>
    </>
  );
};

export default HomeSection1Skeleton;
