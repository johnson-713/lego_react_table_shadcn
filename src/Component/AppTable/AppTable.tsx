import { Table } from "@/Component/ui/table";
import AppTableHeaders from "./AppTableHeader";
import AppTableBody from "./AppTableBody";
import type { IAppTable } from "./types";
import SkeletonTable from "@/Component/Skeleton/SkeletonTable";
import Pagination from "@/Component/Pagination/Pagination";
import AppSearchInput from "@/Component/AppSearchInput/AppSearchInput";
import AppListFilter from "../ListFilter/AppListFilter";

const AppTable = ({
  headers,
  body,
  actions,
  page,
  perPage,
  total,
  setPage,
  isLoading,
  customValueRender,
  selectable,
  onRowClick,
  handleSearch,
  searchPlaceholder = "Search",
  searchInputClassName = "",
  tableHeaderClassName = "",
  checkboxClassName = "",
  enableFilter = false,
  formUtils,
  inputArr,
}: IAppTable) => {
  if (isLoading) {
    return <SkeletonTable columns={5} rows={10} />;
  }

  const finalHeaders = headers || {};
  const headersToMap = Object.values(finalHeaders);
  const keysToAccessObjects = Object.keys(finalHeaders);

  // Calculate colSpan: selection + data columns + actions
  let colSpan = headersToMap.length;
  if (selectable) colSpan += 1;
  if (actions) colSpan += 1;

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-shrink-0">
          <AppSearchInput
            handleSearch={handleSearch}
            placeholder={searchPlaceholder}
            searchInputClassName={searchInputClassName}
          />
        </div>
        {enableFilter ? (
          <div className="flex-grow min-w-[200px]">
            <AppListFilter formUtils={formUtils} inputArr={inputArr} />
          </div>
        ) : null}
      </div>
      <div>
        <Table className="border">
          <AppTableHeaders
            actions={actions}
            headersToMap={headersToMap}
            selectable={selectable}
            body={body}
            tableHeaderClassName={tableHeaderClassName}
            checkboxClassName={checkboxClassName}
          />
          <AppTableBody
            keysToAccessObjects={keysToAccessObjects}
            body={body}
            actions={actions}
            colSpan={colSpan}
            customValueRender={customValueRender}
            selectable={selectable}
            onRowClick={onRowClick}
            checkboxClassName={checkboxClassName}
          />
        </Table>
        {total > 0 ? (
          <div className="w-full">
            <Pagination
              page={page}
              perPage={perPage}
              total={total}
              setPage={setPage}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AppTable;
