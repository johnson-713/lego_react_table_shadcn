import { Table } from "@/components/ui/table";
import AppTableHeaders from "./AppTableHeader";
import AppTableBody from "./AppTableBody";
import type { IAppTable } from "./types";

const AppTable = ({
  headers,
  body,
  selectedRows,
  actions,
  page,
  perPage,
  total,
  setPage,
  isLoading,
  customValueRender,
  selectable,
  onRowClick,
}: IAppTable) => {
  if (isLoading) {
    return <SkeletonTable columns={5} rows={10} />;
  }

  const finalHeaders = headers || {};
  const headersToMap = Object.values(finalHeaders);
  const keysToAccessObjects = Object.keys(finalHeaders);

  // Calculate colSpan: selection + data columns + actions
  let colSpan = headersToMap.length;
  if (selectedRows) colSpan += 1;
  if (actions) colSpan += 1;

  return (
    <div className="">
      <Table className="border">
        <AppTableHeaders
          actions={actions}
          headersToMap={headersToMap}
          selectable={selectable}
          body={body}
        />
        <AppTableBody
          keysToAccessObjects={keysToAccessObjects}
          body={body}
          actions={actions}
          colSpan={colSpan}
          customValueRender={customValueRender}
          selectable={selectable}
          onRowClick={onRowClick}
        />
      </Table>

      {/* {total > 0 ? (
        <div className=" w-full">
          <ChatLogsPagination
            page={page}
            perPage={perPage}
            total={total}
            setPage={setPage}
          />
        </div>
      ) : null} */}
    </div>
  );
};

export default AppTable;
