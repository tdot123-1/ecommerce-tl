import { Skeleton } from "@/components/ui/skeleton";

const FormSkeleton = () => {
  const firstArr = Array.from({ length: 2 });
  const secondArr = Array.from({ length: 3 });
  return (
    <>
      {firstArr.map((_, i) => (
        <Skeleton key={i} className="w-full h-16 mb-6" />
      ))}
      <div className="mb-6">
        {secondArr.map((_, i) => (
          <Skeleton key={`${i}-2`} className="w-full h-8 mb-2" />
        ))}
      </div>
      {secondArr.map((_, i) => (
        <Skeleton key={`${i}-3`} className="w-full h-16 mb-6" />
      ))}
      <div className="w-full flex justify-center items-center gap-5">
        {firstArr.map((_, i) => (
          <Skeleton key={`${i}-4`} className="w-20 h-8" />
        ))}
      </div>
    </>
  );
};

export default FormSkeleton;
