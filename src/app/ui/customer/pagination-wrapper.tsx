import { fetchActiveProductsPages } from "@/lib/data/pages/store/data";
import PaginationComponent from "./pagination";
import { fetchAllProductsPages } from "@/lib/data/pages/dashboard/data";

interface PaginationWrapperProps {
  category?: string | undefined;
  dashboard?: boolean | undefined;
  tags?: string[];
}

const PaginationWrapper = async ({
  category,
  dashboard,
  tags,
}: PaginationWrapperProps) => {
  let totalPages;

  // fetch the number of pages either for a category, all active products, or all products
  // if (category) {
  //   totalPages = await fetchActiveProductsPages(category);
  // } else if (dashboard) {
  //   totalPages = await fetchAllProductsPages();
  // } else {
  //   totalPages = await fetchActiveProductsPages();
  // }

  if (dashboard) {
    totalPages = await fetchAllProductsPages();
  } else if (category && tags && tags.length > 0) {
    totalPages = await fetchActiveProductsPages(category, tags);
  } else if (tags && tags.length > 0) {
    totalPages = await fetchActiveProductsPages(undefined, tags);
  } else if (category) {
    totalPages = await fetchActiveProductsPages(category);
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
