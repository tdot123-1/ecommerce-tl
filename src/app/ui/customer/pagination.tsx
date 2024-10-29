"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { generatePagination } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationComponentProps {
    totalPages: number;
    mobile: boolean
}

const PaginationComponent = ({ totalPages, mobile }: PaginationComponentProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pageNumbers = generatePagination(totalPages, currentPage, mobile);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(Math.max(currentPage - 1, 1))}
          />
        </PaginationItem>
        {pageNumbers?.map((page, i) => (
          <PaginationItem key={i}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={createPageURL(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={createPageURL(Math.min(currentPage + 1, totalPages))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
