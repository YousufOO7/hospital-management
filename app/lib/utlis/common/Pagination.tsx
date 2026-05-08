"use client";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  lastPage,
  onPageChange,
}) => {
  if (lastPage <= 1) return null;

  const getPages = () => {
    const pages: (number | string)[] = [];

    // Always show first page
    pages.push(1);

    // Left dots
    if (currentPage > 3) {
      pages.push("...");
    }

    // Middle pages (current ±1)
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(lastPage - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    // Right dots
    if (currentPage < lastPage - 2) {
      pages.push("...");
    }

    // Always show last page
    if (lastPage > 1) {
      pages.push(lastPage);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center gap-2 my-4 min-w-max">
        {/* Prev */}
        <Button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          size="sm"
        >
          Prev
        </Button>

        {/* Page Numbers */}
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-2 text-zinc-400">
              ...
            </span>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(Number(page))}
            >
              {page}
            </Button>
          )
        )}

        {/* Next */}
        <Button
          disabled={currentPage === lastPage}
          onClick={() => onPageChange(currentPage + 1)}
          size="sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;