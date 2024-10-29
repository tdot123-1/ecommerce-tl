import PaginationComponent from "./pagination";
import { fetchActiveProductsPages, fetchAllProductsPages } from "@/lib/data";

interface PaginationWrapperProps {
  category?: string | undefined;
  dashboard?: boolean | undefined;
}

const PaginationWrapper = async ({
  category,
  dashboard,
}: PaginationWrapperProps) => {
  let totalPages;

  if (category) {
    totalPages = await fetchActiveProductsPages(category);
  } else if (dashboard) {
    totalPages = await fetchAllProductsPages();
  } else {
    totalPages = await fetchActiveProductsPages();
  }

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
