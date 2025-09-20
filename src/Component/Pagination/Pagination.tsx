import AppText from "@/Component/AppText/AppText";
import { Button } from "@/Component/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  page,
  perPage = 1,
  total,
  setPage,
}: {
  page: number;
  perPage?: number;
  total: number;
  setPage: (page: number) => void;
}) => {
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex justify-between items-center py-[12px] px-[24px] w-full border-t border-gray-200 rounded-b-md bg-white">
      <AppText className="font-medium text-sm text-text-secondary">
        {`Showing ${start} to ${end} of ${total}`}
      </AppText>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {getPageNumbers().map((p, idx) =>
          typeof p === "number" ? (
            <Button
              key={p}
              variant={p === page ? "default" : "outline"}
              size="icon"
              onClick={() => setPage(p)}
            >
              {p}
            </Button>
          ) : (
            <Button key={`dots-${idx}`} variant="outline" size="icon" disabled>
              {p}
            </Button>
          )
        )}

        <Button
          variant="outline"
          size="icon"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
