import { Suspense } from "react";
import PaginationComponent from "./pagination";
import { fetchActiveProductsPages } from "@/lib/data";



const PaginationWrapper = async () => {
  const totalPages = await fetchActiveProductsPages();

  return (
    <>
      <div className="mx-auto my-5 hidden md:block">
        <PaginationComponent totalPages={totalPages} mobile={false} />
      </div>
      <div className="mx-auto my-5 md:hidden">
        <PaginationComponent totalPages={totalPages} mobile={true} />
      </div>
    </>
  );
};

export default PaginationWrapper;
